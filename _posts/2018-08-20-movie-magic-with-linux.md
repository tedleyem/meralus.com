---
layout: post
title: Movie Magic with Linux
date: 2018-08-20
excerpt: "The Open Source MS Outlook Alternative"
tags: [new app, code, linux, github]
comments: true
---

Hollywood has finally gone open source
https://www.omgubuntu.co.uk/2018/08/hollywood-turns-to-open-source


# Movie Magic Linux Apps
mr robot does it right
tools for movie magic
indie developers
hollywood
WPSEKU
wttrn weather
Stress test
Terminator Terminal App
pulling from github
running and setting up terminator

In the midst of listening to weekly [Linux Unplugged podcas] and searching the catacombs of Github I overheard discussion of a new app to try out.
[S-TUI](https://github.com/amanusk/s-tui) is a terminal UI for monitoring your computer.As a linux admin im always looking for ways to find or gather system information. This app allows you to not only gather that information in a cool and visual way, it also allows you to run a stress test on your pc to further test its performance.

![](https://github.com/amanusk/s-tui/blob/master/ScreenShots/s-tui2.gif?raw=true)




### Installation on Ubuntu
The latest stable version of s-tui is available via pip. To install pip on Ubuntu run:
 sudo apt-get install gcc python-dev python-pip
Once pip is installed, install s-tui from pip:
(sudo) pip install s-tui

A ppa is available (xenial,bionic)

 sudo add-apt-repository ppa:amanusk/python-s-tui
 sudo apt-get update
 sudo apt-get install python3-s-tui

### Other Stress test tools
stress - tool to impose load on and stress test a computer system
stress-ng - tool to load and stress a computer
