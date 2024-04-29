---
layout: post
title:  "Pyfetch"
date:   2024-04-29
excerpt: "python from scratch"
img: "blog-headers/python.png" 
project: true  
---

For those who dont know, Neofetch is command-line system information tool written in bash. Its been one of my most used cli tools when working on new systems. Could I just cat out the /etc/os-release file, sure, but do I want a cool and colorful way of doing that, YES!
Since the pandemic I have been exposed to a lot more python code being in Lamda functions, used for terraform deployments into AWS EC2 instances, or used for AMI provisioning. I have an understanding of python and its features/functionality and have been able to make some updates to existing python scripts, but I don't have any python projects that I have ever really written from scratch, or for my own personal use. Back in the day, circa 2011 or so I would test and learn about different hacking tools [from Kitploit](https://www.kitploit.com/) but again, never had written my own script and had to follow [PEP-8](https://peps.python.org/pep-0008/) standards against my own code. So with this project, I decided I should start writing out tools of my own in python that I can manage and take some ownership of. I chose to rewrite Neofetch in Python. 

I figured it would be simple and an easy thing to write in a weeks time and who else would want to do that since its already written so well in Bash... I WAS WRONG. If you click this link there is a pretty large list of other people thinking "Hey, I want to rewrite Neofetch in Python and call it [Pyfetch](https://github.com/search?q=pyfetch&type=repositories)"

Seeing this did not deter me though. This is intended to show my understanding of writing a python script and sharing it. If I have the time my goal is to publish it to pypi and allow a pip install to be possible, but as of writing this, Im not sure what is to come. 

My intentions are to come up with a way of getting the same system information in a simple fashion like bash does but from what I can see after reading a few other Pyfetch repo's is that gathering cpu and gpu information may require choosing a python module of choice. I should be able to gather most of the information using the builtin ['os' module](https://docs.python.org/3/library/os.html) and keep the project as simple as Bash. 



Most of the projects I found on github do their own little magic and have an interesting way of showing the logo on the left. 
I may go with a different approach like this example below.

![pyfetch-example](/assets/img/blog/pyfetch/pyfetch-by-hectopat.png)

I haven't found a great way to print different emoji's in cli with python other than [the unicode way](https://www.geeksforgeeks.org/python-program-to-print-emojis/) but I plan on finding a different solution for displaying a logo for the OS being used. Neofetch currently has 11k lines of code to it, which I think has to do with the get_distro_ascii() function starting on line 5524 and ending at line 11540. Updates coming later this week. I may change the name to something else, but I like the idea of adding a new pyfetch repo to github lol. Stay tuned. 