---
date: "2018-12-28"
title: "Phishing"
category: "Hacking"
---
![alt text](https://storage.googleapis.com/warrenlee/myBlog/phishing/phishing.jpg)

Today I received an interesting phishing email.
<br />
I did the research and found out it's actually a good learning opportunity,
since attacker's server demonstrates excellent practice in network security.
<br />
Today's goal is to attack phishing server by mimicking victims.
<br />
### Email content
<b>TITLE:</b> RE: Wrn ,protect your sensitive data from unauthorized access
<br />
<b>FROM:</b> goer.vassaux05@ingame.de
<br />
![alt text](https://storage.googleapis.com/warrenlee/myBlog/phishing/email.jpg)
<br />
As you can see, the attacker just attached a copy image to mimic Amazon site.
<br />

### Verification Process
#### Microservice
By clicking 'log in', the victim would be navigated to "http://karet1nagut4zinat2a.myvnc.com/Lzmvejr9/9VRl0.html?e=user@domain.com&A3zj864z4g4h=Yku8nhrrI24"
<br /> 
P.S. Before doing this, we need to set up proxies on Chrome and Postman since attacker's server will block client by IP address.
<br />
<br />
And the response is pure JavaScript code as following
```js
<script type="text/javascript">
function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
var email = getUrlVars()["e"];

document.write('
    <script type="text/javascript" src="ip-email.php?email='+ email +'"><\/script>');



    </script>
    <script type="text/javascript">

window.location = 'http://lertamer1iutyvab3kibratec2.hindusa7lozqebc4orbc.dynu.net/XIUKBYXj/c.php?click=yes&acc=yes&data=6bdP07fjlZU&e=' + email;

</script>
```
> <b>This process seems redundant. Why does the server need an extra redirect logic ?</b>
<br />
Once you look at the redirect URL, you would find out the server is a microservice with auto-generated host name.

Such a beautiful design !!
<br />
The attacker leveraged 'serverless' concept and used that to avoid direct attack.
I guess the domain name would switch time to time within a sub-net system.
<br />
#### Cookie
After making GET request to the redirect server, I received an empty response.
But, I got 'Set-Cookie' key in the response header.
![alt text](https://storage.googleapis.com/warrenlee/myBlog/phishing/cookie.jpg)
> OK, I guess this is a typical security practice. Good Job, attacker.
<br />
Then we need to use this cookie to personate the victim in later requests.

By using 'Link Redirect Trace' Chrome extension, I found there should be one more redirect.
One GET request to 
'http://lertamer1iutyvab3kibratec2.hindusa7lozqebc4orbc.dynu.net/XIUKBYXj/6bdP07fjlZU/de/smart.html'
<br />
And then the response was
```js
<meta HTTP-EQUIV='REFRESH' content='0; url=/XIUKBYXj/6bdP07fjlZU/slsE7oEhpngamqHFQpNhvh7HJSAASj/do.html?id=FVtbYxvrAkxwH8DUr4b5ml5gCTccpJkrP6NlJxDo'>
```
> Hmmm...using meta tag to redirect to target URL

After redirect, I got
```html
<title>Amazon</title>
<link rel="shortcut icon" href="files-aws/favicon.ico" type="image/x-icon">
<frameset>
    <frame src="/2VC1vaJC/6bdP07fjlZU/F7QCiIcGJe85mphq3T0hQb2gETrByt/iframe.php">

    </frameset>
```
Making one more GET request to 'http://lertamer1iutyvab3kibratec2.hindusa7lozqebc4orbc.dynu.net/2VC1vaJC/6bdP07fjlZU/F7QCiIcGJe85mphq3T0hQb2gETrByt/iframe.php'

and I got
```html
<script type="text/javascript">
	if (parent.frames.length > 0){
        top.location.replace(document.location);
	}</script>
<meta HTTP-EQUIV="REFRESH" content="0; url=do.html.">
```

> I was thrilled by this result. Its about to make login request

### Client Puzzle Protocol (CPP)
> CPP is one type of protocol which fights against DDoS / DoS attacks

I was really amazed by how sophisticated the defense is here.
After making the call to 'iframe.php', I got a puzzle in Javascript code and 
this is typical CPP which protects attacker's server from DoS attacks.

Then I stopped from this point since I didn't wanna spend more time on this puzzle script.
I saw a function called 'AES' and it could possibly a 
<a href="https://en.bitcoin.it/wiki/Proof_of_work"><b>[proof of work]</b></a> kind of puzzle,
in which clients need to guess the token by hashing the key again and again until it matches.

### Summary
From this research, I found I have more things to learn and somehow respect those hackers
who sent phishing mails and had set up these amazing security measurement to protect themselves from another hackers.