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

Basically, we can launch a piece of packaged software hosted by docker engine.
<br />
One real world example is developers use container to package their development environment setups
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



### What about VM ?
Let's take a look at the differences of resources allocations between containers and VMs.
<br />
<br />
![alt text](https://storage.googleapis.com/warrenlee/myBlog/docker/docker-containerized-and-vm-transparent-bg.png)

#### Containers
Containers are an abstraction at the app layer that packages code and dependencies together. Multiple containers can run on the same machine and share the OS kernel with other containers, each running as isolated processes in user space. Containers take up less space than VMs (container images are typically tens of MBs in size), can handle more applications and require fewer VMs and Operating systems.
#### VMs
Virtual machines (VMs) are an abstraction of physical hardware turning one server into many servers. The hypervisor allows multiple VMs to run on a single machine. Each VM includes a full copy of an operating system, the application, necessary binaries and libraries - taking up tens of GBs. VMs can also be slow to boot.
