---
date: "2019-02-17"
title: "Introduce PttBrain"
category: "PttBrain"
---
Before going into the PttBrain product,
I would like to talk about 
what <a href="https://www.ptt.cc/bbs/hotboards.html" target="__blank">PTT</a> is a little bit.

### About PTT
> PTT Bulletin Board System, is the largest terminal-based bulletin board system (BBS) based in Taiwan.
PTT has more than 1.5 million registered users, with over 150,000 users online during peak hours. The BBS has over 20,000 boards covering a multitude of topics, and more than 20,000 articles and 500,000 comments are posted every day.
(Wikipedia)

Basically, PTT is Taiwanese "Reddit".
The main user interface can be roughly divided into two parts (<b>boards</b> & <b>articles</b>).
#### Boards
In each board, users can browse specific "category" of articles sorted by upload date. We will explain the number on the left side later.
<br />
<br />
The following is one example, 
<br />
in <a href="https://www.ptt.cc/bbs/Soft_Job/index.html" target="__blank">Soft_Job</a> board, people are talking about software jobs and sharing interview experiences.

<iframe src="https://www.ptt.cc/bbs/Soft_Job/index.html" style="width: 100%; height: 30em" ></iframe>




#### Articles
Article can be published by those users who have privilege (rules vary based on board).
<br />
Let's take a look at one example first.

<iframe src="https://www.ptt.cc/bbs/Soft_Job/M.1550137685.A.E1A.html" style="width: 100%; height: 30em" ></iframe>

On the top nav bar, we can see "author"[作者], "title"[標題], "datetime"[時間].
<br />
Scrolling down, just below main content, "green text" tells where the ip was when author posted this article.
<br />
At the end, we can see a full list of comments.
<br />
For each comment, the sign at the front means if this user liked [推] / hated [噓] or replied [→] to the article,
followed by user id, content and posted datetime.

### Introduce PttBrain
Even though PTT is a fantastic social media platform full of rich information,
<br />
I couldn't get the answers of questions like
* <b>Can we categorized users in each board ?</b>
* <b>Where was the article posted ? (not just IP)</b>
* <b>What is the average number of articles posted daily per board ?</b>
* <b>Can we see users historical activities ?</b>
* <b>There should be a better search engine to search article content not just title</b>

At the moment I came out with an idea
> How about building a data analytic tool which scraps PTT every day 
and then do grouping / visualization using modern technology ?

Then PttBrain was born on 2018/01/01.

#### Tech Stacks
Since this is a personal fund project, my expectation spending would be less than $100 USD/month.
The stacks look like
* Front End: React / Redux / Semantic UI
* Back End: NodeJS / Firebase
* Database: PostgreSQL (AWS m5.large)
* Website / Server Hoisting: Heroku
* CI/CD: CircleCI

#### Product Features
##### Powerful Search Bar
We use <a href="https://github.com/zombodb/zombodb" target="__blank">zombodb</a> as our search engine plugin, which indexes PostgreSQL and documents data using Elasticsearch.
<br />
Below are the sample screenshots (searching articles / user ID by order)

![alt text](https://storage.googleapis.com/warrenlee/myBlog/pttbrain/search_articles.jpg)
![alt text](https://storage.googleapis.com/warrenlee/myBlog/pttbrain/search_users.jpg)

##### Main Page

