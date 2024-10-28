
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
```
LABEL version="1.0"

LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"

LABEL description="This text illustrates \
that label-values can span multiple lines."
```

---
[Other Docker references](https://docs.docker.com/engine/reference/builder/)

