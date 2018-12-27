---
date: "2018-12-30"
title: "Security"
category: "Hacking"
---

Yesterday I received an interesting phishing email.
I did the research about it and found out it's a good learning example.

Below is the email content

<b>TITLE:</b> RE: Wrn ,protect your sensitive data from unauthorized access
<br />
<b>FROM:</b> goer.vassaux05@ingame.de


```js
(function() {

var cache = {};
var form = $('form');
var minified = true;

var dependencies = {};

var treeURL = 'https://api.github.com/repos/PrismJS/prism/git/trees/gh-pages?recursive=1';
var treePromise = new Promise(function(resolve) {
	$u.xhr({
		url: treeURL,
		callback: function(xhr) {
			if (xhr.status < 400) {
				resolve(JSON.parse(xhr.responseText).tree);
			}
		}
	});
});
```

Zwei flinke Boxer jagen die quir

```md
# asdfasdfads
- auesufuaus
```

```css
code[class*="language-"],
pre[class*="language-"] {
	color: black;
	background: none;
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}
```