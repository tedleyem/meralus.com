---
layout: post
title:  "Multi Build Phases Packer Builds"
date:   2023-11-27
excerpt: "How chaining ami builds with packer can optimize development"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

Hashicorp’s Packer tool for automating the creation of pre-baked machine images across multiple platforms, enabling server management via infrastructure-as-code in a way that is especially helpful for scenarios which intentionally require a high degree of consistency but need some degree of variation from one another.

In this post, I’ll discuss an approach to machine image building and management that I’ve occasionally heard referred to as an image baking factory or an image bakery, which essentially means chaining image builds such that immutable server images are built upon one another. This post specifically focuses on implementing this approach using Packer.

This has some big potential benefits to specific scenarios, but it also introduces additional steps and complexities, so I’ll also discuss when you would and wouldn’t benefit from the approach, compare the benefits to alternative solutions, and then finally dig into some Packer template examples for AWS and Azure.

If you are completely new to Packer, I’d recommend at least reviewing their overview on getting started building images and overview of Packer terminology, since most of these tips assume that general background.
Background

Packer templates have a few basic sections, but the ones most important to this discussion are Builders and Provisioners.

[PICTURE1]

One of the use cases that Packer specifically highlights and covers in depth in their documentation is supporting multi-platform builds from a single template. Some example use cases would be:

    dev servers hosted as on-premise VM’s with test and prod hosted in the cloud OR
    distributed server software which certifies support across multiple clouds and on-premise hosting.


[PICTURE2]

