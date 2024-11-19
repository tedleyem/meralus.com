---
layout: post
title:  "NEW TITLE"
date:   2024-02-01
excerpt: "lorem ipsum"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

My theory on

# Docker Quick Commands 
Docker provides the ability to package and run an application in a loosely isolated environment called a container.
The isolation and security allows you to run many containers simultaneously on a given host. Containers are
lightweight and contain everything needed to run the application, so you do not need to rely on what is currently
installed on the host. You can easily share containers while you work, and be sure that everyone you share with gets
the same container that works in the same way.

# INSTALLATION
Docker Desktop is available for Mac, Linux and Windows
https://docs.docker.com/desktop 

View example projects that use Docker
https://github.com/docker/awesome-compose 

Check out our docs for information on using Docker
https://docs.docker.com

# GENERAL COMMANDS
Start the docker daemon
docker -d 

Get help with Docker. Can also use -help on all subcommands
docker --help

Display system-wide information
docker info 

# IMAGES
Docker images are a lightweight, standalone, executable package
of software that includes everything needed to run an application:
code, runtime, system tools, system libraries and settings.

Build an Image from a Dockerfile
docker build -t <image_name>

Build an Image from a Dockerfile without the cache
docker build -t <image_name> . –no-cache

List local images
docker images 

Delete an image 
docker rmi <image_name>

Remove all unused images 
docker image prune 

# DOCKER HUB
Docker Hub is a service provided by Docker for finding and sharing
container images with your team. Learn more and find images
at https://hub.docker.com

Login to Docker 
docker login -u <username>

Publish an image to DOcker HUb 
docekr push <username>/<image_name>

Search Hub for an image 
docker search <image_name>

Pull an image from Docker Hub
docker pull <image_name>

# CONTAINERS
A container is a runtime instance of a docker image. A container
will always run the same, regardless of the infrastructure.
Containers isolate software from its environment and ensure
that it works uniformly despite differences for instance between
development and staging.

Create and run a container from an image, with a custom name:
docker build -t <image_name> . –no-cachedocker run --name <container_name> <image_name> 

Run a container with and publish a container’s port(s) to the host
docker run -p <host_port>:<container_port> <image_name>

Run a container in the background
docker run -d <image_name>

Start or stop an existing container:
docker start|stop <container_name> (or <container-id>)

Remove a stopped container:
docker rm <container_name>

Open a shell inside a running container:
docker exec -it <container_name> sh

Fetch and follow the logs of a container:
docker logs -f <container_name>

To inspect a running container:
docker inspect <container_name> (or <container_id>)

To list currently running containers:
docker ps

List all docker containers (running and stopped):
docker ps --all

View resource usage stats
docker container stats

---
Dockerfile
Inheritance

FROM ruby:2.2.2

Variables

ENV APP_HOME /myapp
RUN mkdir $APP_HOME

Initialization

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

# docker-compose.yml
version: '2'

services:
  web:
    build: .
    # build from Dockerfile
    context: ./Path
    dockerfile: Dockerfile
    ports:
     - "5000:5000"
    volumes:
     - .:/code
  redis:
    image: redis

Commands

docker-compose start
docker-compose stop

docker-compose pause
docker-compose unpause

docker-compose ps
docker-compose up
docker-compose down

Reference
Building

web:
  # build from Dockerfile
  build: .

  # build from custom Dockerfile
  build:
    context: ./dir
    dockerfile: Dockerfile.dev

  # build from image
  image: ubuntu
  image: ubuntu:14.04
  image: tutum/influxdb
  image: example-registry:4000/postgresql
  image: a4bc65fd

Ports

  ports:
    - "3000"
    - "8000:80"  # guest:host

  # expose ports to linked services (not to host)
  expose: ["3000"]

Commands

  # command to execute
  command: bundle exec thin -p 3000
  command: [bundle, exec, thin, -p, 3000]

  # override the entrypoint
  entrypoint: /app/start.sh
  entrypoint: [php, -d, vendor/bin/phpunit]

Environment variables

  # environment vars
  environment:
    RACK_ENV: development
  environment:
    - RACK_ENV=development

  # environment vars from file
  env_file: .env
  env_file: [.env, .development.env]

Dependencies

  # makes the `db` service available as the hostname `database`
  # (implies depends_on)
  links:
    - db:database
    - redis

  # make sure `db` is alive before starting
  depends_on:
    - db

Other options

  # make this service extend another
  extends:
    file: common.yml  # optional
    service: webapp

  volumes:
    - /var/lib/mysql
    - ./_data:/var/lib/mysql

Advanced features
Labels

services:
  web:
    labels:
      com.example.description: "Accounting web app"

DNS servers

services:
  web:
    dns: 8.8.8.8
    dns:
      - 8.8.8.8
      - 8.8.4.4

Devices

services:
  web:
    devices:
    - "/dev/ttyUSB0:/dev/ttyUSB0"

External links

services:
  web:
    external_links:
      - redis_1
      - project_db_1:mysql

Hosts

services:
  web:
    extra_hosts:
      - "somehost:192.168.1.100"

services

To view list of all the services running in swarm

docker service ls 

To see all running services

docker stack services stack_name

to see all services logs

docker service logs stack_name service_name 

To scale services quickly across qualified node

docker service scale stack_name_service_name=replicas

clean up

To clean or prune unused (dangling) images

docker image prune 

To remove all images which are not in use containers , add - a

docker image prune -a 

To prune your entire system

docker system prune 

To leave swarm

docker swarm leave  

To remove swarm ( deletes all volume data and database info)

docker stack rm stack_name  

To kill all running containers

docker kill $(docker ps -q ) 

Docker Security
Docker Scout

Command line tool for Docker Scout:

docker scout

Analyzes a software artifact for vulnerabilities

docker scout cves [OPTIONS] IMAGE|DIRECTORY|ARCHIVE

Display vulnerabilities from a docker save tarball

 docker save redis > redis.tar

Display vulnerabilities from an OCI directory

skopeo copy --override-os linux docker://alpine oci:redis

Export vulnerabilities to a SARIF JSON file

docker scout cves --format sarif --output redis.sarif.json redis

Comparing two images

docker scout compare --to redis:6.0 redis:6-bullseye

Displaying the Quick Overview of an Image

docker scout quickview redis:6.0
