---
layout: post
title:  "Creating Github repos with CLI"
date:   2023-12-14
excerpt: "gh cli commands"
img: "blog-headers/xxx"
project: true  
---

While sharpening my skills I wanted to throw up some ansible playbooks to provision applications that I plan on using over and over in test environments. Caching and Databases need to be created over and over and bash scripts are cool and all, but ansible and yaml files are like riding a bike to me now so I created an (ansible template)[https://github.com/tedleyem/ansible-role-template]. The template is a great way to create a quick project in my dev environment but it comes with sets of questions.
Why not use ansible-galaxy init role <role-name> to create an ansible playbook? Why not just use one yaml file like redis.yaml and add that to whatever project your working on? Well, its cuz its not clean and shareable. Having one yaml file like redis.yaml to install redis is a solution, but it doesnt allow you to separate reused variables in a vars.yaml file. It also doesnt allow you to easily split OS based vars for mixed development without creating a large yaml file of 100+ lines of scrolling doom modules *insert evil boss laughter here*

Using this template allows me to connect it to rocky/redhat boxes or ubuntu boxes and create different OS level vars. These playbooks are also playbooks that may have unique tasks for connecting to vagrant, spinning up docker containers with specific names, or limiting resources variables (like redis memory) that work for your dev environment and may not work in a more ubiquitous fashion like the ones shared in ansible galaxy.
There is a million ways to crack an egg, but this isn't about ansible use-cases, this is about creating repo's using CLI.


(Github CLI)[https://cli.github.com/manual/] has been my go-to tool
for creating repo's and staying within the domain of my terminal without opening my web browser and accidentally on a youtube rabbit hole of "2 hours of Pokemon facts".

The best way to use the ansible-role template can be found in the gh-cli
docs.

```
From gh repo create --help:

    -p, --template <repository>
    Make the new repository based on a template repository

So, the invocation would be:

gh repo create my-new-project --template OWNER/REPO --private --clone

```
This will take the template repository OWNER/REPO and use it to create a new repository under your account called my-new-project. Finally, it will clone the new repository locally.



You can copy and paste the code below to spin up your own dev specific ansible-role

```
gh repo create new-ansible-role --template tedleyem/ansible-role-template --private --clone
```

