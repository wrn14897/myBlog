---
date: "2020-03-30"
title: "Build a Subdomain Guesser Using Go"
category: "Security"
---

### Let's Talk About DNS Resolver First
From the wiki page of <b>DNS Server</b>
> A DNS server is a computer server that contains a database of public IP addresses 
and their associated hostnames, and in most cases serves to resolve, or translate, 
those names to IP addresses as requested.

Which means there should be a server for our browser to query IP. For example, 
Google DNS server address is `8.8.8.8`.

Below is a simple Go program to query IP from Google DNS server
```go
package main

import (
  "fmt"

  "github.com/miekg/dns"
)

func main() {
  var msg dns.Msg
  fqdn := dns.Fqdn("pttbrain.com")
  msg.SetQuestion(fqdn, dns.TypeA)
  in, err := dns.Exchange(&msg, "8.8.8.8:53")
  if err != nil {
    panic(err)
  }
  if len(in.Answer) < 1 {
    fmt.Println("No records")
    return
  }
  for _, answer := range in.Answer {
    if a, ok := answer.(*dns.A); ok {
      fmt.Println(a.A)
    }
  }
}
```

`fqdn` here refers to <b>fully qualified domain name</b>, which specifies its exact location 
in the tree hierachy of the DNS. As you can see, we are doing Type A record look up for the domain.

Then the next thing we can do is to build a subdomain guesser, which will query DNS server based on a
list of possible subdomain words. For example, there might be `en.pttbrain.com` or `smtp.pttbrain.com`.

### Build a Subdomain Guesser
Ok, now things get more exciting. Let's break this program into three parts.

#### CNAME and A Record Lookup
Based on the code above, we need two methods to lookup A record and CNAME type separately 
The idea is, the guesser will trace the CNAME tree from the top to the bottom and then lookup 
A record to get IP.

```go
func lookupA(fqdn, serverAddr string) ([]string, error) {
	var m dns.Msg
	var ips []string
	m.SetQuestion(dns.Fqdn(fqdn), dns.TypeA)
	in, err := dns.Exchange(&m, serverAddr)
	if err != nil {
		return ips, err
	}
	if len(in.Answer) < 1 {
		return ips, errors.New("no answer")
	}
	for _, answer := range in.Answer {
		if a, ok := answer.(*dns.A); ok {
			ips = append(ips, a.A.String())
		}
	}
	return ips, nil
}

func lookupCNAME(fqdn, serverAddr string) ([]string, error) {
	var m dns.Msg
	var fqdns []string
	m.SetQuestion(dns.Fqdn(fqdn), dns.TypeCNAME)
	in, err := dns.Exchange(&m, serverAddr)
	if err != nil {
		return fqdns, err
	}
	if len(in.Answer) < 1 {
		return fqdns, errors.New("no answer")
	}
	for _, answer := range in.Answer {
		if c, ok := answer.(*dns.CNAME); ok {
			fqdns = append(fqdns, c.Target)
		}
	}
	return fqdns, nil
}
```

Then combine these two to build the final lookup method
```go
type result struct {
	IPAddress string
	Hostname  string
}

func lookup(fqdn, serverAddr string) []result {
	var results []result
	var cfqdn = fqdn // Don't modily the original
	for {
		cnames, err := lookupCNAME(cfqdn, serverAddr)
		if err == nil && len(cnames) > 0 {
			cfqdn = cnames[0]
			continue // we have to process the next CNAME
		}
		ips, err := lookupA(cfqdn, serverAddr)
		if err != nil {
			break // There are no A records for this hostname
		}
		for _, ip := range ips {
			results = append(results, result{
				IPAddress: ip,
				Hostname:  cfqdn,
			})
		}
		break // We have processed all the results
	}
	return results
}
```
Using `for` in golang is basically like `while` in other language to construct a loop. 
And you can see we use `continue` to trace down the CNAME records tree heirarchy

#### Simple Command Line Tool
Imagine the CLT is going to let the client specify the file path and execute. 
So main function will be something like below
```go
func main() {
	var (
		flDomain      = flag.String("domain", "", "The domain to perform guessing against.")
		flWordlist    = flag.String("wordlist", "", "The worldlist to use for guessing.")
		flWorkerCount = flag.Int("c", 100, "The amount of workers to use")
		flServerAddr  = flag.String("server", "8.8.8.8:53", "The DNS server to use.")
	)
	flag.Parse()

	if *flDomain == "" || *flWordlist == "" {
		fmt.Println("-domain and -worlist are required")
		os.Exit(1)
	}
	fmt.Println(*flWorkerCount, *flServerAddr)

  ...
}
```
By using go built in "flag" module, we can built a simple CLT interface.

#### File Reader
To read file, we can use go built in bufio module.
```go
fh, err := os.Open(*flWordlist)
if err != nil {
  panic(err)
}
defer fh.Close()
scanner := bufio.NewScanner(fh)

for scanner.Scan() {
  scanner.Text() // here we can access text line by line
}

...
```
This chunk of code need to be inside main function.

#### Use Goroutine to Speed Up Lookup Process
Although Go makes concurrency super easy to achieve, <b>channels</b> is something we must use and takes time to learn, 
which is basically a communication channel between goroutines.
<br />
Here we will declare three channels (`fqdns`, `gather`, `tracker`):
`fqdns` is like task queue, `gather` is to collect results, and `tracker` is going to tell main thread 
when workers finish all tasks
```go
type empty struct {}

fqdns := make(chan string, *flWorkerCount)
gather := make(chan []result)
tracker := make(chan empty)
```
And worker function will be like
```go
func worker(tracker chan empty, fqdns chan string, gather chan []result, serverAddr string) {
	for fqdn := range fqdns {
		results := lookup(fqdn, serverAddr)
		if len(results) > 0 {
			gather <- results
		}
	}
	var e empty
	tracker <- e
}
```
To translate this chunk of code into sentences:
1. Taking out task from task queue `fqdns`
2. Using `lookup` method to get target IP addresses
3. If there is results, then send it to `gather` channel
4. Taking the next task out (back to step 1)
5. Once there is no available task, then send the finish signal (empty struct) to `tracker` channel

Alright, then we are ready to run worker function concurrently.
```go
var results []result

for i := 0; i < *flWorkerCount; i++ {
  go worker(tracker, fqdns, gather, *flServerAddr)
}

for scanner.Scan() {
  fqdns <- fmt.Sprintf("%s.%s", scanner.Text(), *flDomain)
}

go func() {
  for r := range gather {
    results = append(results, r...)
  }
  var e empty
  tracker <- e
}()

//Close the channels and present the results
close(fqdns)
for i := 0; i < *flWorkerCount; i++ {
  <-tracker
}
close(gather)
<-tracker

... // Read data from results
```
Awesome, so we are about to test the program.
> go run main.go -domain=microsoft.com -wordlist=wordlist.txt

And you will get something like
```
smtp.microsoft.com     131.107.115.215
smtp.microsoft.com     131.107.115.214
smtp.microsoft.com     205.248.106.64
smtp.microsoft.com     205.248.106.30
smtp.microsoft.com     205.248.106.32
smtp.microsoft.com     131.107.115.212

...
```

