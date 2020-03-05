---
date: "2020-02-29"
title: "Transfer Domain From GoDaddy to AWS Route53"
category: "DevOps"
---

#### A Sad Story
I wrote this article to record a lesson I've learned due to my stupidity.
<br />
The store was, two weeks ago I tried to transfer 
my domain (pttbrain.com) registrar from GoDaddy to AWS Route53. 
Things turned out to be straightforward. I went to GoDaddy admin console 
to unlock the domain first. Then on Route53 side I just simply initialized the transfer process.

At that moment, I felt this might require some sort of record settings after the process.
And everything should be fine.
<div style="width:100%;height:0;padding-bottom:50%;position:relative;">
  <iframe src="https://giphy.com/embed/NTur7XlVDUdqM" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</div>
<br />
Of course, I was so naive and just like this dog didn't realize he was in a fire house.
One week after, I checked the site and found the domain was completely unresolvable 
by using <a href="https://dnschecker.org/" target="__blank"><b>DNS checker</b></a>.
Because I was too nervous to think, I decided to 'DELETE' the domain and wished it would come back to the domain market again.
<br />
But this domain was just gone and never came back 🤯. Luckily, AWS team thought about 
<a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-restore-expired.html" target="__blank">
  <b>domain restore</b>
</a> already and knew there were stupid people like me. After paying 66 bucks, 
I got my domain restored and appeared again in Route53 dashboard.
<br />
After consulting AWS technical supports and many hours online research, finally I made it work (including SSL setup).
<br />
Below is the step by step walk through
<br />
<br />

1. Login to AWS and navigate to Route53 
2. Create a host zone profile (Be sure to config CNAME or A records)
3. Copy four name servers (NS)
4. Navigate to 'Registered domains' and choose your target domain
5. Paste three name servers to 'Name servers' section (you can delete the original NS)
6. Login to GoDaddy console and navigate to 'DNS Management'
7. Add four AWS name servers to Records (Name is '@', Value is name server address)
8. Using <a href="https://dnschecker.org/" target="__blank"><b>DNS checker</b></a> to monitor NS propagation process

One interesting thing is you would probably see GoDaddy NS and AWS NS appear at the same time.

#### Redirect Naked Domain to WWW / SSL Setup (Serving API/Site on non-AWS platform)

Since PttBrain Web App and API are hosted on <a href="https://heroku.com/" target="__blank"><b>Heroku</b></a>, 
I need CNAME www record points to my Heroku app custom endpoint, which is straightforward.
<br />
> How about naked domain HTTPS redirect ? (In other words, redirect 'pttbrain.com' to 'www.pttbrain.com')

Here is how I set it up

1. Create a S3 bucket and set up 'Redirect requests' to redirect to www under <b>'Static website hosting'</b>
2. Add certificate to AWS Certificate Manager
3. Create a Cloudfront distribution and set S3 bucket endpoint as original domain name
4. Navigate back to Route53 
5. Add a 'A' record with alias target equal to Cludfront distribution

And that's it.
