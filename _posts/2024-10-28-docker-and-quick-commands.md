---
layout: post
title:  "Docker understanding"
date:   2024-10-28
excerpt: "cheat sheet for docker"
img: "blog-headers/docker-introduction-01.jpg"
project: true
---

# Docker Understanding & Quick Commands

**Whats Docker?**
Docker provides the ability to package and run an application in a loosely isolated environment called a container.
The isolation and security allows you to run many containers simultaneously on a given host. Docker has some terminology to get familiar with.

We have a few terms to recognize.
* Containers
* Images
* DockerHub
* Dockerfile

**What are Docker containers?**
Containers are lightweight and contain everything needed to run the application, so you do not need to rely on what is currently installed on the host. You can easily share containers while you work, and be sure that everyone you share with gets the same container that works in the same way.

**What are Docker images?**
Docker images are a lightweight, standalone, executable package
of software that includes everything needed to run an application:
code, runtime, system tools, system libraries and settings.

A container is a runtime instance of a docker image. A container
will always run the same, regardless of the infrastructure.
Containers isolate software from its environment and ensure
that it works uniformly despite differences for instance between
development and staging.

**Laymans Terms?**
Lets say you have a wordpress application with plugins and directories full of images and config
files in different locations. Using Docker allows you to consolidate all parts of your application into
a consolidated environment. This allows you to easily manage the app and its dependancies and move or upgrade
the app with ease to get rid of the "it worked on my machine" or "it worked fine on the previous machine" hiccups of yesteryear.

# DOCKER HUB
Docker Hub is a service provided by Docker for finding and sharing container images. You can consider it the github of docker. You can find other public docker images and versions through Dockerhub like [TeamPasswordManager](https://hub.docker.com/u/teampasswordmanager). Learn more at [hub.docker.com](https://hub.docker.com)

# DOCKERFILE
A Dockerfile a text file that contains instructions for building a Docker image. You can consider them config files that follow steps in building a docker image. Read more below on the parameters and setting up a Dockerfile with available commands.


# INSTALLATION
Docker Desktop is available for Mac, Linux and Windows
https://docs.docker.com/desktop

View example projects that use Docker
https://github.com/docker/awesome-compose

Check out our docs for information on using Docker
https://docs.docker.com

# GENERAL COMMANDS
| Command   | description |
| -------- | ------- |
| docker -d  | Start the docker daemon |
| docker --help | Get help with Docker. Can also use -help on all subcommands |
| docker info | Display system-wide information|


# IMAGES
| Command   | description |
| -------- | ------- |
| docker build -t <image_name> | Build an Image from a Dockerfile |
| docker build -t <image_name> . –no-cache | Build an Image from a Dockerfile without the cache |
| docker images | List local images |
| docker rmi <image_name> | Delete an image |
| docker image prune| Remove all unused images |

# DOCKER HUB
| Command   | description |
| -------- | ------- |
| docker login -u <username> | Login to Docker |
| docekr push <username>/<image_name> | Publish an image to Docker Hub |
| docker search <image_name>| Search Hub for an image |
| docker pull <image_name>| Pull an image from Docker Hub |

# CONTAINERS
| Command   | description |
| -------- | ------- |
| docker build -t <image_name> . –no-cachedocker run --name <container_name> <image_name> | Create and run a container from an image, with a custom name|
| docker run -p <host_port>:<container_port> <image_name> | Run a container with and publish a container’s port(s) to the host|
| docker run -d <image_name> | Run a container in the background|
| docker start|stop <container_name> (or <container-id>)| Start or stop an existing container|
| docker rm <container_name> | Remove a stopped container |
| docker exec -it <container_name> sh | Open a shell inside a running container |
| docker logs -f <container_name> | Fetch and follow the logs of a container |
| docker inspect <container_name> (or <container_id>) | To inspect a running container |
| docker ps | To list currently running containers |
| docker ps --all | List all docker containers (running and stopped) |
| docker container stats | View resource usage stats |

---
# Setting up a Dockerfile
The Dockerfile supports the following instructions

| Command   | usage |
| -------- | ------- |
ADD | Add local or remote files and directories. |
ARG | Use build-time variables. |
CMD | Specify default commands. |
COPY | Copy files and directories. |
ENTRYPOINT | Specify default executable. |
ENV | Set environment variables. |
EXPOSE | Describe which ports your application is listening on. |
FROM | Create a new build stage from a base image. |
HEALTHCHECK | Check a container's health on startup. |
LABEL | Add metadata to an image. |
MAINTAINER | Specify the author of an image. |
ONBUILD | Specify instructions for when the image is used in a build. |
RUN | Execute build commands. |
SHELL | Set the default shell of an image. |
STOPSIGNAL | Specify the system call signal for exiting a container. |
USER | Set user and group ID. |
VOLUME | Create volume mounts. |
WORKDIR | Change working directory. |


### Here is an example of a dockerfile
```
FROM ruby:2.2.2

# Variables
ENV APP_HOME /myapp
RUN mkdir $APP_HOME

# Initialization
RUN bundle install

WORKDIR /myapp

VOLUME ["/data"]

# Specification for mount point

ADD file.xyz /file.xyz
COPY --chown=user:group host_file.xyz /path/container_file.xyz

Onbuild

ONBUILD RUN bundle install
# when used with another file

Commands

EXPOSE 5900
CMD    ["bundle", "exec", "rails", "server"]

Entrypoint

ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2

Configures a container that will run as an executable.

ENTRYPOINT exec top -b
```

This will use shell processing to substitute shell variables, and will ignore any CMD or docker run command line arguments.
Metadata

LABEL version="1.0"

LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"

LABEL description="This text illustrates \
that label-values can span multiple lines."

See also

    https://docs.docker.com/engine/reference/builder/

docker-compose
Basic example

