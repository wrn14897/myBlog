---
date: "2019-12-25"
title: "Scrape & Build Category Relation Tree"
category: "PttBrain"
---

This page shows how PTT categorizes boards (you can click and play with that !!).
<iframe 
  src="https://www.ptt.cc/cls/1"
  style="width: 100%; height: 30em"
></iframe>
For example, by navigating from 'J_Group' (Life, Entertainment, Mood) -> 'TalkandChat',
you can find the biggest board 'Gossiping' (八卦) there.
<br />
<br />

![alt text](https://storage.googleapis.com/warrenlee/myBlog/pttbrain/boards_user_count.png)

Also you can see the number of live use count after the board name.
This page contains fascinating information (boards multi-layer categories) which I want it to be integrated with PttBrain.
Scraping this tree structure pages would be a interesting challenge.
Let's get to it step by step.
1. Its very likely we need to implement sort of tree traversal algorithm to traverse different category pages.
2. Since we don't know the height of tree, its better to stop the scrapper at certain layer.
3. After fetching the page, we should store the relation into linking table.

See, this could even be a great interview quesiton ! 😎

Obviously, the traversal algorithm is going to be <a href="https://en.wikipedia.org/wiki/Breadth-first_search" target="_blank"><b>BFS</b></a>
Below is the implementation.
```py

def build_category_tree(depth):
    class Node:
        def __init__(self, layer, page_id, data=None):
            self.layer = layer
            self.page_id = page_id
            self.data = data
            self.children = []

    def scrape_category_page(current_page_id):
        logger.debug('Scrape category page id = %s' % current_page_id)
        resp = scraper.get(url=PTT_URL + '/cls/%s' % current_page_id)
        data = []
        soup = BeautifulSoup(resp.text, 'html.parser')
        divs = soup.find_all("div", "b-ent")
        for div in divs:
            href = div.find('a')['href']
            # reach the last page
            if 'bbs' in href:
                board_id = div.find('div', 'board-name').getText()
                board_tag = div.find('div', 'board-class').getText()
                board_headline = div.find('div', 'board-title').getText()
                board_user_count = int(div.find("span", "hl").getText()) if div.find("span", "hl") else 0
                data.append({
                    'board_id': board_id,
                    'board_tag': board_tag,
                    'board_headline': board_headline,
                    'board_user_count': board_user_count,
                })
            elif 'cls' in href:
                page_id = href.split('/')[-1]
                category_id = div.find('div', 'board-name').getText()
                category_title = div.find('div', 'board-class').getText()
                category_desc = div.find('div', 'board-title').getText()
                data.append({
                    'page_id': page_id,
                    'category_id': category_id,
                    'category_title': category_title,
                    'category_desc': category_desc,
                })
        return data

    '''
        Using BFS to traverse category tree
    '''
    root = Node(0, 1, None)
    queue = [root]
    while queue:
        parent_node = queue.pop(0)
        if parent_node.layer > depth:
            break
        children = scrape_category_page(parent_node.page_id)
        for child in children:
            page_id = child['page_id'] if 'page_id' in child else None
            child_node = Node(parent_node.layer+1, page_id, child)
            parent_node.children.append(child_node)
            if page_id:
                queue.append(child_node)
    return root

```

One gotcha here is the 'data' property of node could be either 'board' or 'category'.
At the last step, we just need to write another script to traverse tree 
from the root and insert parent/child relations to DB.

Let's skip the bullshit and get to the result.

1. Due to this user count per board information, we found 
only approximate 300 boards are interesting (with average user count > 5 per hour) and worth scraping.
2. There are about 10k boards in total (traverse to depth = 4).

Now since the system will run the script hourly, we can show average user count per board per hour.
Below is the screenshot of new metric introduced at board main page.

![alt text](https://storage.googleapis.com/warrenlee/myBlog/pttbrain/pttbrain_board_user_count.png)

Next thing will be using a recursive query to find board's parent categories 
and use that to find user's interests and behavior patterns.

CHEEERS !!!

<div>
  <img 
    src='https://media.giphy.com/media/3oKIPu1AxMWB2xlwl2/giphy.gif' 
    style="height:50%; width:100%"
  >
</div>

