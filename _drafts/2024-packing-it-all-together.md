---
layout: post
title:  "Packing it all together with Hashicopr"
date:   2024-02-01
excerpt: "a solution to multi-chain builds with packer and github actions"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

While working as a devops/application engineer I came across a problem with building AMI's. 
I wanted to find a way to build AMI's based on other ami's that were just built. The idea was to take an Ubuntu image and make a custom ami with build tools and specific packages, and then use that AMI and apply some security and hardening to it. Developers who need a dev box to start working can use the first AMI. Developers who are testing their apps and making sure security principles are in place and battle test their apps on a secure box can use the second AMI. Essentially a dev ami and a staging ami, and in the future a production ready ami. 


[Packer explains this in their docs](https://developer.hashicorp.com/packer/guides/packer-on-cicd/pipelineing-builds#chaining-together-several-of-the-same-builders-to-make-save-points) 

```
Packer templates don't come with a custom "glue" to bind them together. We recommend using your CI system or wrapping scripts to connect the templates into a chain.
```
So here we are. Having to find a solution to "pack it all together"!.... if my daughter didnt hear it, was it really a dad joke? 

Anyway, to automate packer to pick up each custom ami base image we can use Github Actions because I never want to have to use Jenkins in my life ever again. 

For those of you who are reading this and don't know. 