---
layout: post
title:  "Open the Pod Bay Doors"
date:   2024-09-23
excerpt: "using docker and github actions to publish images"
img: "blog-headers/pod-bay-doors.png" 
project: true  
---

I've spent some time in the DevOps and CI/CD realm. One of the many solutions I created was to build and push a new docker image for a github repo every day at the end of the work shift. This would allow devs of that team to work on the latest version of the project and ensure its the latest by running a docker pull commmand once they get their mornings started. 

Automating the process of building and publishing a docker image from the main branch of a githubr project seemed simple enough to me, but to the devs of that project, it was a tedious chore they couldn't be bothered with. I'm writing this blog to go over how to build and push a docker image to dockerhub. This way when your working on your own projects you can test or share the latest iteration of that project to others without the hassle of having them setup their work environment (to any javascript or npm developers out there don't thank me thank the team behind github actions lol). If you want to create your own workflow and automate some of the steps of your own project I would suggest reading the github docs on [Writing workflows](https://docs.github.com/en/actions/learn-github-actions). 

For this blog and project I built a quick flask application to provide a demo for these concepts. You can download the [python-quote-generator project here](https://github.com/tedleyem/python-quote-generator) or simply run 
```bash
docker pull tedleyem/python-quote-generator:latest
```

Here is the  Github Action below. 


```
name: Build and Push Docker Image to Docker Hub
on:
  push:
    branches:
      - main
      - master
jobs:
  push_to_registry:
    name: push docker image to hub
    runs-on: ubuntu-latest
    steps:
      - name: check repository
        uses: actions/checkout@v4

      - name: login to docker registry
        uses: docker/login-action@v3
        with:
          username: ${{secrets.DOCKERHUB_USERNAME}}
          password: ${{secrets.DOCKERHUB_TOKEN}}

      - name: build and push docker image to registry
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{github.repository}}:latest
```

This workflow first does a checkout of your repo, then logs into dockerhub, builds and pushes your repo based on the Dockerfile in the root of the project, and pushes it to dockerhub as the name of the repo with the latest tag. 


This will update https://hub.docker.com/layers/tedleyem/python-quote-generator docker registry.


# Things to note 
* This action requires you to setup the DOCKERHUB_USERNAME and DOCKERHUB_TOKEN inside your repos secrets. This is specific to this repository. 

* You can set up actions to only push on the main branch of this repo. This allows less clutter of images and ensures that only the main branch is being pushed to docker and not a development or feature branch. 


You can view these actions as they get pushed in the actions tab of your repository. Check out this repos actions and get into the automation of things here. [actions tab](https://github.com/tedleyem/python-quote-generator/actions)

Many times I feel like these things im learning and doing are trivial or insignificant because I learned it and used it to solve a problem many moons ago, but writing it down allows me to cement it into long term memory and give myself a digital pat on the back. Many times during the journey we forget to "smell the roses", this is a time to do so in your own right. If this blog helped you, pay it forward somehow and remember to sit back and touch grass.