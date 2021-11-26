---
layout: post
title: Terminal Magic with Linux
date: 2018-08-20
excerpt: "Terminal apps to make Linux living more fun"
tags: [linux, educate,]
comments: true
---
# Movie Magic Linux Apps

movie magic
wpseku
hollywood
wttrn weather
wttr.in Moon Phases
Terminator Terminal App
pulling from github
running and setting up terminator

Making the switch from Windows to Linux is getting easier every year. With more companies like Microsoft and Hollywood ["Making the switch to
linux"](https://cloudblogs.microsoft.com/windowsserver/2015/05/06/microsoft-loves-linux/) or [Casting open source as their lead role](https://www.omgubuntu.co.uk/2018/08/hollywood-turns-to-open-source) it becomes more and more of a buzz word and something of interest to the IT community...not that it never was. For all those people doing their research and learning more about Linux containers and Linux alternatives to Windows apps I have written a small list of some fun apps in Linux that you can enjoy while making the switch to Linux. None of these are better than the other but they can be relaxing to play or look at when your busy banging your head on making the switch. Movie makers or indie directors. There are also some fun terminal games and tricks to play that I want to show off. All of these have been tested on Ubuntu 16.04 and 18.04 for those who want to test and run these linux magic tools.

## Hollywood
[Hollywood](https://github.com/dustinkirkland/hollywood) is a fun way to throw some random images on your terminal and read random data quickly. I think this would be perfect for indie films that are in need of creating a hacker scene as bad as the entire CSI cyber show. I have yet to see this used in a film or show but have spent a few times running this in a terminal while friends walk in the room so they get scared and not bother me because they think im hacking into the matrix.

Speaking of the Matrix, those of you command-line kids who want to run random numbers down your screen like they did in the matrix can now do that in a Linux terminal. For those of you who are using ubuntu can type in the following and get started.
 $ sudo apt-get install -y cmatrix

Once installed you can just type 'cmatrix' and have your way.
You can find the source code for cmatrix on [GitHub](https://github.com/abishekvashok/cmatrix) under a GPL license.

When I need a little break I have found ways to play games in terminal as well.
The best part of playing games in a terminal is that they are quick, simple, and easy to setup and start playing. No need for Playstation Plus or Xbox live subscriptions, just some simple and fun nostalgic games.

## TETRIS
To install tetris in your terminal
 1. sudo apt-get install -y libaa1 libaa1-dev bb python-aalib python3-aalib libaa-bin
 2. curl -L https://github.com/samtay/tetris/releases/download/0.1.2/tetris-`uname -s`-`uname -m` -o tetris
 3. sudo ln -s /lib/x86_64-linux-gnu/libncursesw.so.5  /lib/x86_64-linux-gnu/libncursesw.so.6
 4. chmod u+x tetris
 5. mv tetris /usr/local/bin/
 6. now you can just type "tetris" to start playing.
For more info on playing tetris or to install from source you can checkout the [Github Repo here](https://github.com/samtay/tetris).

## WTTRN Weather in Terminal
http://wttr.in/
One of the first things I do when I walk into my office in the mornings is check the weather. What sites do most people go to.... it doesn't matter anymore because you can do it in terminal!. With the wttr.in site created by [Chubin](https://github.com/chubin) you can run a quick curl request by typing in the following command and get the weather forecast for the next three days.
 $ curl wttr.in/muc      # Weather for IATA: muc, Munich International Airport, Germany
 $ curl wttr.in/ham      # Weather for IATA: ham, Hamburg Airport, Germany

In these examples if yo change the location after the '/' you can find out the weather forecast in different cities as well. If you leave the following slash empty it will find your general location and give you the forecast as well. I love this app so much that I created an alias for it so I can run a quick command to check the weather in my area every day. To do so you can edit your .bashrc profile and add the following line
 $ alias check-weather='curl wttr.in'
To learn how to create an alias or understanding alias in Linux you can read my blog about that [here](https://tedley.me/create-aliases/)

## Moon
Another nod to the developer [Chubin](https://github.com/chubin) is a tool that allows you to
check the phases of the moon. I created a alias for this as well and like to check this every once in a while
for full moon nights so relax on the beach.
 $ alias check-moon='curl wttr.in/Moon'


Check them out on his github channel and throw a star up there to show some love and respect.

## Rates.sx
[Chubin](http://rate.sx/) has also created a list of other fun web apps like Rates.sx which allows you
to curl and view currenty crypto currency rates.
![Crypto-Rates](/assets/img/blog/crypto-rates.png){:class="img-responsive"}

## Campfire and Matrix
If your looking for cool visuals and just want to impress your friends you can always start up a virtual Campfire
or run "the matrix" and have them think your doing things beyond the scope of what computers can currently do.
![Campfire](/assets/img/blog/campfire-terminal.png){:class="img-responsive"}
![Cmatrix](/assets/img/blog/cmatrix.png){:class="img-responsive"}


## Star Wars Movie
https://itsfoss.com/star-wars-linux/
One of of my favorite things to do in a linux terminal (other than running ansible playbooks and cloning github repos) is to keep up on this star wars project. Click the link and enjoy.


If these apps have found you excited for a breif moment in time try running them all in multiple terminals with
[Terminator](https://gnometerminator.blogspot.com/p/introduction.html). Terminator allows you to arrange multiple
terminal windows in a grid like fashion and expand or shrink them to your liking. You can group them, preset the layouts so that multiple windows open up at the same time. I find it useful for managing multiple application servers (before i started using ansible).

The best parts of using Linux is learning and having fun while doing so. I hope these apps listed find you and allow you to get creative and make your own fun terminal apps. Ill have some fun ones coming soon. Enjoy.


## Resource Links
**[Star Wars Terminal](https://itsfoss.com/star-wars-linux/)**
**[hollywood](https://github.com/Techgameteddy/hollywood)**
**[CSI Cyber](https://en.wikipedia.org/wiki/CSI:_Cyber)**
**[WTTRN SITE](http://wttr.in/)**
**[WTTRN CODE](https://github.com/chubin/wttr.in)**
**[Terminator App](https://gnometerminator.blogspot.com/p/introduction.html)**
**[Campfire](https://www.tecmint.com/20-funny-commands-of-linux-or-linux-is-fun-in-terminal/)**
**[Crypto-currency Rates](http://rate.sx/)**
**[CMatrix](https://github.com/abishekvashok/cmatrix)**
