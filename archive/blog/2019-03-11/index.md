---
date: "2019-03-11"
title: "Web Scraping"
category: "Hacking"
---

Below is the shortest summary about web scraping
> Web scraping is the process of using bots to extract content and data from a website. (https://www.incapsula.com)

Basically, there are two kind of resources on the site we can scrap from:
1. Static HTML page
2. Internal API calls

To be proficient at web scraping, you need to be very familiar with hacking these resources. 
At <a href="https://chartmetric.io" target="__blank">Chartmetric</a>, I've written couple web scrapers to crawl data from social media platforms and streaming services. Let's discuss the implementation behind it.

### Static HTML page
The main reason to render the site using server is because of general performance and consistent SEO. In this case, server will send viewable source file to the client.

#### Level I: Traditional Server Rendering
>Each HTML page is rendered by server given URL. The structure is HTML (skeleton) + CSS (stylings) + JS (behaviors)

For example, if you make a GET request to Stanford official site "https://www.stanford.edu/academics/"
by using <a href="https://www.getpostman.com/" target="__blank">Postman</a>, you would get a whole page HTML source code. You can see JavaScript and CSS codes would be included in \<link> and \<scripts> tags separately. Like something below.
```html
<!DOCTYPE html>
<html lang="en-US" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#" class="no-js">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!--
        _____ _               __              _
        / ____| |             / _|            | |
        | (___ | |_ __ _ _ __ | |_ ___  _ __ __| |
        \___ \| __/ _` | '_ \|  _/ _ \| '__/ _` |
        ____) | || (_| | | | | || (_) | | | (_| |
        |_____/ \__\__,_|_| |_|_| \___/|_|  \__,_|

        -->
        <title>Academics &#8211; Stanford University</title>
        ...
        <link rel='stylesheet' id='homesite17-master-style-css'  href='https://www.stanford.edu/wp-content/themes/homesite17/css/master.min.css?ver=2019.01.24.06.06' type='text/css' media='all' />
        ...
        
    </head>
    <body class="page-template page-template-landing-page page-template-landing-page-php page page-id-95 page-parent">
        ...
        <script type='text/javascript' src='https://www.stanford.edu/wp-includes/js/wp-embed.min.js?ver=4.9.9'></script>
    </body>
</html>
```
Its obvious that Stanford server sends JavaScript or CSS contents based on endpoints ('https://www.stanford.edu/wp-content/xxxx').
<br />
By copying and pasting the entire code to a xxx.html file and then opening it on a browser, you can see the same page.
For this type of site, we can scrap it by using requests and BeautifulSoup modules.

Below is the simple implementation
```python
    import requests
    from bs4 import BeautifulSoup
    STATUS_OK = 200

    def main():
    # user-agent header can tell the server which browser client is using
    result = requests.get("https://www.stanford.edu/academics", headers={
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    })
    if result.status_code == STATUS_OK:
        soup = BeautifulSoup(result.text, 'html.parser')
        #To scrap specific section
        doms = soup.findAll('section', {"class": "panel theme--white"})
        print(doms)
        .....
```


#### Level II: Modern Server Rendering
>Each HTML view components is rendered by modern JS framework (React, Vue, Angular) on the server side and all data will be injected into JS script files. The structure is HTML (skeleton), JS (data + behaviors + stylings)

For example, if you make a GET request to any public Instagram profile page "https://www.instagram.com/stanford/?hl=en", you would receive a HTML file.
Notice that, there are couple \<script> tags, including JS codes (React framework) and data.
```html
    <!DOCTYPE html>
    <html lang="en" class="no-js not-logged-in client-root">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>
                Stanford University (@stanford) • Instagram photos and videos
            </title>
            <link .....>

        </head>
        <body class="">
            <span id="react-root">
                ...
                <script type="text/javascript">
                    window._sharedData = {"config":{"csrf_token":"56nwMlrLlun5S9RNadhXmy7lpjG7nsyO","viewer":null,"viewerId":null},"supports_es6":false,"country_code":"US","language_code":"en","locale":"en_US","entry_data":{"ProfilePage":[{"logging_page_id":"profilePage_466003","show_suggested_profiles":false,"graphql":{"user":{"biography":"Stanford is one of the world's leading research and teaching institutions. Official Instagram feed by University Communications.","blocked_by_viewer":false,"country_block":false,"external_url":"https://linkin.bio/stanford","external_url_linkshimmed":"https://l.instagram.com/?u=https%3A%2F%2Flinkin.bio%2Fstanford\u0026e=ATPKvPmehJbv6-ow-P1wToBWUHHveyRKiE9Z9GZw0f-jkFHR12Il2ZTNFA09r6f-cVtk0hdy","edge_followed_by":{"count":502694},"followed_by_viewer":false,"edge_follow":{"count":252},"follows_viewer":false,"full_name":"Stanford University","has_channel":false,"has_blocked_viewer":false,"highlight_reel_count":21,"has_requested_viewer":false,"id":"466003","is_business_account":true,"is_joined_recently":false,"business_category_name":"Professional Services","is_private":false,"is_verified":true,"edge_mutual_followed_by":{"count":0,"edges":[]},"profile_pic_url":"https://instagram.fftw1-1.fna.fbcdn.net/v...}}
                </script>
            </span>
        </body>
    </html>
```

You can see the data was injected in one of script by using window._sharedData=...
<br />
In this case, we can still crawl HTML page and extract information inside DOMs. 
But the challenge is, since the page is rendered by JavaScript, we need to use webdriver and module like Selenium to open URL by lunching a browser in order to get rendered HTML source file. This approach is time-wasting and inefficient. 
<br />
Its easier to scrap the data inside script tag directly by using BeautifulSoup. Below is the simple implementation.
```python
    from bs4 import BeautifulSoup
    from utils import scraper
    import json
    import time
    import sys
    import os

    VAR_PREFIX = 'window._sharedData ='
    STATUS_OK = 200
    BASED_URL = 'https://www.instagram.com/'

    def generateUserPageURL(user_id):
        return BASED_URL + user_id

    def organizeParsedData(data):
        output = {
            'id': None,
            'bio': None,
            'image_url' : None,
            'external_url': None,
            'username': None,
            'num_posts': None,
            'num_followers': None,
            'num_following': None,
            'posts': [],
        }
        if 'entry_data' in data and 'ProfilePage' in data['entry_data']:
            profile = data['entry_data']['ProfilePage'][0] if len(data['entry_data']['ProfilePage']) else None
            if profile:
                if 'graphql' in profile and 'user' in profile['graphql']:
                    user = profile['graphql']['user']
                    if user:
                        output['id'] = user['id'] if 'id' in user else None
                        output['bio'] = user['biography'] if 'biography' in user else None
                        output['image_url'] = user['profile_pic_url'] if 'profile_pic_url' in user else None
                        output['external_url'] = user['external_url'] if 'external_url' in user else None
                        output['username'] = user['username'] if 'username' in user else None
                        output['num_followers'] = user['edge_followed_by']['count'] if 'edge_followed_by' in user else None
                        output['num_following'] = user['edge_follow']['count'] if 'edge_follow' in user else None
                        output['num_posts'] = user['edge_owner_to_timeline_media']['count'] if 'edge_owner_to_timeline_media' in user else None
                        output['posts'] = [x['node'] for x in user['edge_owner_to_timeline_media']['edges']] if 'edge_owner_to_timeline_media' in user else []
        else:
            print('Unable to parse raw data from Instagram.')
        return output
    
    def scrapInstagramUser(url):
        data = None
        response = scraper.start(url)
        if response:
            soup = BeautifulSoup(response, "html.parser")
            scriptDoms = soup.findAll('script', type='text/javascript')

            if len(scriptDoms) > 2:
                targetDom = None
                for scriptDom in scriptDoms:
                    if VAR_PREFIX in scriptDom.text:
                        targetDom = scriptDom
                        break
                if targetDom:                                      # response contains data DOM (first time)
                    splits = targetDom.text.split(VAR_PREFIX)
                    try:
                        rawData = json.loads(splits[1][:-1])
                        data = organizeParsedData(rawData)
                    except Exception as e:
                        print(e)
        return data

    if __name__ == '__main__':
        data = scrapInstagramUser('https://www.instagram.com/lilpump/')
        print(data)
```


### Dynamic HTML page (Single-Page Application)
The main benefit to render the site on the client side is front-end and back-end can be completely separate,
which improves user experience.
<br/>
Take <a href="https://open.spotify.com/artist/21SOnTj5ECwVXeBUTRcP3s" target="__blank">Spotify Artist Profile</a> as an example,
the app would make a bunch of HTTP requests to render the views.
<br />
<br />
Let's use Chrome developer tool to examine HTTP requests (under Network tab)
![alt text](https://storage.googleapis.com/warrenlee/myBlog/web%20scraping/httpRequests.jpg)
Click one of request on the left side (GET request to get artist info)
![alt text](https://storage.googleapis.com/warrenlee/myBlog/web%20scraping/requestDetail1.jpg)
Scroll down to "Request Headers" section
![alt text](https://storage.googleapis.com/warrenlee/myBlog/web%20scraping/requestDetail2.jpg)

As you can see, the server will authorize client by looking at JWT from request header. 
We can make a request on our own to verify it by using Postman
![alt text](https://storage.googleapis.com/warrenlee/myBlog/web%20scraping/postman.jpg)

Some website uses cookie to manage session and authorize requests. The idea is quite similar and straightforward.
1. Once user login, server will send cookie through 'Set-Cookie' response header
2. Browser will attach cookie to request header for following requests

Now we have a basic idea to hack internal API (using cookie or JWT).
<br />
The following is the example source code to hack Spotify API
```python
    import requests
    import json

    BASED_URLS = {
        'PLAYLIST_INFO': 'https://api.spotify.com/v1/playlists/{}?type=track%2Cepisode&market=US',
        'AUTH': 'https://open.spotify.com/browse/featured'
    }
    def request_helper(url, method='GET', params={}, headers={}, cookies={}, jsonData=None, auth=None):
        try:
            if method == 'GET':
                response = requests.get(
                    url, params=params, headers=headers, proxies=getRequestsProxies(), auth=auth)
            elif method == 'POST':
                response = requests.post(
                    url, params=params, headers=headers, cookies=cookies, proxies=getRequestsProxies(), json=jsonData)
            # Consider any status other than 2xx an error
            if not response.status_code // 100 == 2:
                errorMsg = "Error: Unexpected response {}".format(response.text)
                return None
            return response.text
        except requests.exceptions.RequestException as e:
            # A serious problem happened, like an SSLError or InvalidURL
            errorMsg = "Error: {}".format(e)
            print(errorMsg)
            return None
    def getCookies():
        session = requests.Session()
        session.get(BASED_URLS['AUTH'], headers=BROWSER_HEADER)
        return session.cookies.get_dict()
    def fetchPlaylistPageAPI(id):
        cookies = getCookies()
        if cookies and 'wp_access_token' in cookies:
            response = None
            token = cookies['wp_access_token']
            headers = {
                'Authorization': 'Bearer ' + token
            }
            '''
                Fetch Basic Info
            '''
            url = BASED_URLS['PLAYLIST_INFO'].format(id)
            try:
                return json.loads(request_helper(url, headers=headers))
            except:
                print('Something wrong while fetching playlist info.')
        return None
```


### Summary
With these basic understandings, we can scrap almost all sites in the world.
<br />
However, companies like Facebook, Instagram, Amazon have really good bot-detecting software in house.
<br />
The technique to scrap those sites would be using sleep time, random proxies and user-agents.
<br />
Besides,
by using threads, hackers can write a simple script for DNS attack.
<br />
We'll have more and more interesting topics coming about web scraping. 
<br />
Stay tuned :)
<iframe src="https://giphy.com/embed/o0vwzuFwCGAFO" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>