---
layout: post
title: create aliases
date: 2018-08-27
excerpt: "Terminal apps to make Linux living more fun"
tags: [linux, educate.]
comments: true
---
##  Using Linux aliases
    How to define a Linux alias
    Unix/Linux alias examples and syntax
    Have a favorite Linux alias?

# Using Linux aliases

Aliases in Unix and Linux operating systems are helpful. They let you define your own commands, or command shortcuts, so you can quickly execute commands or make your terminal work the way you want it to work. I'll share with you a few Linux aliases that I use on a daily basis.

I've found it very helpful to create aliases to make my life easier. For Example, When Im looking to install or search for specific things in Ubuntu i dislike typing in the apt-cache search" followed by a package name if im looking for something. So to eliminate that and make life easier I have created the following.

 alias search='apt-cache search'

Now you can just type search instead of apt-cache search at your Linux command line:

 search ansible

In another simple alias example, instead of waiting for the (y/n) prompt when installing packages you can set this:

 alias install='sudo apt-get install -y'

I've created an alias so I only have to type install like this:

 install ansible

Whenever I use this alias, it automatically installs whatever packages im requesting if they are found.
Some people may not like this or think its too aggressive but I am confident in the packages being added onto my system and this alias makes it easier.

One more simple alias example, instead of waiting for the (y/n) prompt when installing packages you can set this:

 alias update='sudo apt-get update'

I've created an alias so I only have to type install like this:

  update

Now I can update all packages on my system with ease.

Using aliases allow you to create anything from simple shortcuts like this to powerful custom commands.

### How to define a Linux alias

Creating a Linux alias is very easy. You can either enter them at the command line as you're working, or more likely, you'll put them in one of your startup files, like your .bashrc file, so they will be available every time you log in.

The Linux alias syntax is very easy:

    Start with the alias command
    Then type the name of the alias you want to create
    Then an = sign, with no spaces on either side of the =
    Then type the command (or commands) you want your alias to execute when it is run. This can be a simple command, or can be a powerful combination of commands.

Unix/Linux alias examples and syntax



To update these aliases and set them to  be saved and work immediately and everytime you log into your terminal
you would have to type in
 source ~/.bashrc

So to get things going you can create an update alias as well so any new alias shortcuts you create in the future
can be update with ease.

 alias update-bashrc='source ~/.bashrc'

You can get as creative as possible if you want and once you get to using linux as a daily driver you
can start adding more to your bashrc and thank yourself later. Enjoy
