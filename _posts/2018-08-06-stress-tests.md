---
layout: post
title: New App Alert Stress Test Tool
date: 2018-08-06
excerpt: "Stress-Terminal UI monitoring tool"
tags: [new app, code, linux, github]
---
# NEW APP ALERT
In the midst of listening to weekly [Linux Unplugged podcast](https://fireside.fm/s/RUkczH-V+uGpzjfPp) and searching the catacombs of Github I overheard discussion of a new app to try out.
[S-TUI](https://github.com/amanusk/s-tui) is a terminal UI for monitoring your computer.As a linux admin im always looking for ways to find or gather system information. This app allows you to not only gather that information in a cool and visual way, it also allows you to run a stress test on your pc to further test its performance.

![](https://github.com/amanusk/s-tui/blob/master/ScreenShots/s-tui2.gif?raw=true)


##S-TUI
![](https://github.com/amanusk/s-tui/blob/master/ScreenShots/stui_logo.png?raw=true) is a python terminal app that has some of the coolest looking visuals I have found in a tight night interactive User Interface. It doesn't slap you in the face with tons of scary and confusing numbers or logs. It requires very minimal dependencies from python which makes it a perfect fit for linux boxes to use without the hassle of installing other python packages.
Linux junkies looking to test out the cores of their processors or monitor the power and temperature of their cpu should definitely try it out.

## Finding the Fun
The best parts of Linux are finding fun tools but using them to get things done. Here is a list of some some good reasons for using this app.

* Indie film directors can add this as background noise in a computer hacking scene
* Linux users who want to impress your friends
* Linux users who want to find a clean way to check CPU performance through terminal
* Linux users
* Linux Admins looking to stress test linux servers for monitoring and testing  
* Developers using Raspberry Pi's or old PC's who want to monitor CPU performance

## Installation on Ubuntu
The latest stable version of s-tui is available via pip. To install pip on Ubuntu run:
 sudo apt-get install gcc python-dev python-pip
Once pip is installed, install s-tui from pip:
(sudo) pip install s-tui

A ppa is available as well (xenial,bionic)

 sudo add-apt-repository ppa:amanusk/python-s-tui
 sudo apt-get update
 sudo apt-get install python3-s-tui stress

## Other Stress test tools
 stress-ng - tool to load and stress a computer

# How to use S-tui


For more information on the new app you can start and fork it on Github
[S-TUI Github Page](https://github.com/amanusk/s-tui)

To listen in on the LInux Unplugged Podcast you can either search
on your favorite podcast platform or click the link below and press play.  
[Linux Unplugged podcast](https://fireside.fm/s/RUkczH-V+uGpzjfPp)

Follow me on Twitter to learn more about the tool and chat about troubleshooting
if your having trouble using it.
[@TechGameTeddy](https://twitter.com/techgameteddy)

## More coming soon
Until Next time...
