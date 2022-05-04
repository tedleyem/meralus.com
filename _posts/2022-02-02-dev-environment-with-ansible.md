---
layout: post
title:  "2022 Dev Environment with Ansible"
date:   2022-02-02
excerpt: "The sailor that kept sailing "
project: true
img: "blog-headers/monitors.jpg"
---

I have previously spoken about my dev environment and using a bash script to setup a new "home lab" or working dev environment [here](https://meralus.com/my-dev-env/)
but I dont think I ever broke down how I go there. So i'm writing this as a Ted Talk to share soem of my past experiences and tech related stories. 

Automating has become a key tool in todays tech society. There are many tools and platforms that can be used to 
help with automation like Ansible. Ansible is a configuration management tool that is popularly used in the DevOps
world and can definitely give you a leg up when trying to get things set up quickly. I not only use it at work for 
configuring web applications on different servers but I use it at home when setting up a new dev environment or computer. 
My dev environment has definitely dwindled down from multiple laptops and computers in my room to a more software based 
approach, which in turn, makes managing it a lot easier. Lets break down so ideas about dev environemnts, home labs, and 
how to use ansible to automate the software part of all of that. 

Many hobbyists that I talk to today still have their home labs setup with half built computers on the floor or servers in closets that are generating heatand confusing their spouses with questions of importance. For those of you out there, I would like 
to give you a digital toast. I try to update my dev environment on a yearly basis to keep it clean and help remove the clutter 
of things that I know I wont be using. It starte with trying the minimalistic approach back in 2012 when it became all the news 
and media blogs were talking about. There are still some youtube vlogs about being a minimalist that I sometimes envy. My technical knowledge
in building PC's and testing hardware seem to have reached a plateau. Most manufavturers weren't designing anything new or groundbreaking 
other than new processor chips and graphics cards. This was great news but the process of putting a pc together was still the same 
and I knew that if I wanted to stay sharp in the tech field I would have to adapt like businesses and society does. So I went for a digital approach. 

As I was learning about bash scripting back then I started to notice that a lot of the software I wanted to learn about like wordpress
and apache and MySQL didnt require all the small pc's I had in my house collecting dust at the time. I knew then I no longer wanted to 
live a dream of building my own pc repair store to compete with the Circuit City's and Best Buys of the world. I wanted to shrink my dev environment to something that was more focused on software because thats what peaked my interest at the time. Making that decision to go from 
building and hoarding custom pc builds like the last one I had done in 2013 to convert to something with a smaller footprint and same speed felt like I was leaving a chip full of tech junkies who wanted to start water cooling their builds and [benchmark Crysis 2](https://www.nvidia.com/en-us/geforce/news/crysis-2-benchmarks/#1), to abandoning ship and sailing off in a life of Pi sized boat into the world of the uknown... one of the best decision I've ever made.

Taking the software approach meant learning about the new kids on the block and finding out how that worked for my situation. At the time I wasnt working professionally in the tech industry but I had already been sacrificing good quality gaming time with friends to learn how to spin up web servers, what load balancing tools were free and available, and how I could take the tools I was learning and the custom builds (first picture below) that had 4 8gb sticks of ram and 4 250 HDD drives to something more modern and smaller (second picture below) with the same specs. 

* LAST CUSTOMER BUILD BEFORE 2022 
* * <img src="/assets/img/blog/dev-env-ansible/2012-build.jpg" width="40%" height="40%">
* SMALLER BUILD  
* * <img src="/assets/img/blog/dev-env-ansible/2012-build-2.jpg" width="30%" height="30%">

Following my minimalistic approach I went from 6 computers running different Linux or Windows based environments, to one 
small pc with 32gb of ram (expensive at the time) that could produce virtual machines or spin up Vagrant boxes to do my bidding. 
Soon enough all my new learning methods went from physically taking apart boxes to breaking down lines of code, shortcuts, scripts, and commands in Linux. 

I soon learned that shrinking the size and footprint of my pc setup also meant that the mini pc that I was now using, howerver strong it may have been, cant stand the heat when the ram starts to peak. My PC went from a Personal computer to a Peice of Crap now once it overheated 
and fried on me. I had to find a way to buy a new pc and rebuild all the things I was doing again. All my shortcuts and scripts had to be placed
back in my home directory, the downloaded vagrant boxes had to be redownloaded and setup again, and I had to build from nothing. It was a nightmare back then. That's when I learned about Ansible. It wasnt until later around 2017 when I learned that Ansible wasnt only for automating 
professional environment server and for huge server farms. 

Come 2017. My knowledge in github had grown and I had started putting small projects on my profile to keep as my "google drive for code" location. 

I soon realized that with Ansible, regardless of what computer I had and which OS i was using (which at the time I had been considering distro hopping again) I can write an ansible playbook that will download all the tools I need, the software I was working with, and setup my entire work environment in less than 10 minutes. It felt like using [ninite.com](https://ninite.com/) when I was setting up windows based pc's and automating the install process of alot of common applications.

My 5+ year solution for provisioning my dev environment was solved. during the years before I started using ansible I had written a bash script to download software, setup folder structures, and do everything I need in a Debian/Ubuntu based environment. Now that I was using ansible 
I could switch between CentOS or Ubuntu run my script to look for and install all the packages I needed. Ansible playbooks, which is a feature in ansible to run a list of tasks idempotently allowed me to determine the OS environment, install needed packages like steam, whichever IDE I was using that the time, copy wallpaper to my pictures folder, set my wallpaper, move my alias to my bash profile, and download different software from the internet. I have a public version of my [dev-environment](https://github.com/tmeralus/dev-environment-ansible-role) ansible playbook to share with others so hopefully they can not only use it as an example for how to write an ansible playbook and setup a software based dev environment. My approach may seem different to some, and helpful to others. I just hope that whoever read this enjoys the post and shares their thoughts with me via [Twitter](https://twitter.com/techgameteddy) :) 

==Quote to leave you with: ==
 *The means of learning are abundant, The desire to learn is scarce.*


Here is a changelog of the scripts I have been adding over the years 
* [Fresh Install Script](https://github.com/tmeralus/fresh-install-linux)
* [Dev Environment Script- 2018 ](https://github.com/tmeralus/dev-environment-script)
* [Latest Dev Environment Script + Ansible - 2020](https://github.com/tmeralus/dev-environment-ansible-role)

