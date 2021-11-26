---
layout: post
title: Bash-Scripting and Backups
date: 2018-08-13
excerpt: "Creating Bash Script Backups"
tags: [code, linux, github]
comments: true
---

This blog is inspired by **[Ninite](https://ninite.com/)** and the **[OMGUBUNTU's](https://www.omgubuntu.co.uk/2018/04/things-to-do-after-installing-ubuntu-18-04)** Things to do after installing Ubuntu.

During your lifetime you'll have to eventually upgrade your pc's from your college day laptop with all your cool hipster stickers on it to a new pc for paying bills, binge watching a good show, and scrolling through social media. As a tech savvy individual there are tons of factor involved in getting a new pc or building a new pc from **[PC Part Picker](https://pcpartpicker.com/)** but there are many commonalities involved in getting a new pc. One of those is how am I going to reinstall all my apps and programs back onto my computer. This blog will explain how I went from bashing my head to bashing scripting an install script. Lets start with Ninite....

# Ninite and New PC's
Ninite is a website that installs and updates a batch of selected software on
a windows machine. The list of applications range from media applications, steam for gaming, google chrome, dropbox, vlc video player, Itunes, Spotify, Evernote, free antivirus software, and utilities like teamviewer and messaging apps like Skype. With just a few clicks you can install all your necessities without having to click "I accept" or "Next" several times for each application (which can take hours). This tool has helped me in time crunches when setting up new computers for clients, co workers, or friends and family. A few years ago Ninite had options to run batch installs on mac and Linux as well but those days and, what I think was a cost in time and maintenance, have met their demise.

Since the fall of 2009 Ive been a Linux user and have tried installing numerous amounts of packages on Ubuntu using the Software Center but in 2012 when I gave up on Windows and did a deep dive into using Ubuntu Linux as my daily driver thats where I ran into some trouble. I noticed that every six months Ubuntu releases a new version loaded with cool features and a cooler code name, but my "in place upgrades" (by running sudo apt-get upgrade) never seemed to upgrade properly. After switching laptops, rebuilding pc's and manually backing up my hard drive, wiping it, and reinstalling a fresh copy of Ubuntu I started to realize that Linux users and sysadmins don't work that way. I decided to take a syadmin quote "Anything you have to do more than twice has to be automated" and apply it to this time consuming problem i'm having.

# Fresh Install for all
The Fresh Install script Utility is a menu driven script to backup and restore files from an Ubuntu desktop. Its built to be added to your github account for personal use.
Inspired by OMG Ubuntu's infamous Top Things to do after Installing Ubuntu xx.xx articles that you can read **[here](http://www.omgubuntu.co.uk/2017/04/things-to-do-after-installing-ubuntu-17-04)**

# Features
* Backup Currently installed packages
* Backup Snap Packages
* Backup Alias Shortcuts for user running the script
* Install Snapd
* Install [Neofetch](https://github.com/dylanaraps/neofetch) - A command-line system information tool
* Restore Backed up snaps and packages from broken machine or new pc

## Screenshots ##

Main Menu
![screenshot](https://github.com/tmeralus/fresh-install-linux/raw/master/img/main-menu.png)

Backup Utility
![screenshot](https://github.com/tmeralus/fresh-install-linux/raw/master/img/backup-utility.png)

The fresh install script doesn't provide a list of essential tools that are needed for linux systems or daily drivers because what one person claims as "necessary" are few and far between. IT is more of a backup script that backs up a list of packages installed on your computer, alias shortcuts, and snap packages that are installed on your computer and backs them up to your github account. Many features have been changed and get updated when I think of new ways to add features to help backup important user files in linux. There is also quote that **[Gerald Weinberg](https://en.wikiquote.org/wiki/Gerald_Weinberg)** once said that applies to this script. "A system is never finished being developed until it ceases to be used." I personally think that applies to scripts, applications, and programming languages (or anything that is create for that matter).

This script will forever be "in development" and if there are any comments, questions, or features you would like to add feel free comment or tweet me.

**Here is a big of the script for those who want to a few looks**

```
## Check backup list with current pc package list
BK5(){
	dpkg -l | grep ^ii | awk '{print $2}' > $BKDIR/currentlist
	sort $BKDIR/currentlist $BKDIR/backups/backuplist | uniq -u > diff.txt
	if [ -s diff.txt ]; then
	echo "Certain pacakges from backup havent been installed" && sleep 2
	echo "Run the insatller again until this file is empty" && sleep 2
	echo "Current packages not installed from backup" && sleep 4
	cat diff.txt
  else
	echo "Backup matches currenly installed Packages" && sleep 2
	fi
	pause
}
```

In writing this quick blog I hope to encourage others to find useful ways to resolve issues on their computer so they get insipried to learn something new or use this to motivate them to come up with new ideas to automate or fix other things in their homes and become more productive. Share the wealth, share the knowledge, share the freedom. 


# Resource Links
**[Ninite https://ninite.com/](https://ninite.com/)**
**[OMGUBUNTU's https://www.omgubuntu.co.uk/2018/04/things-to-do-after-installing-ubuntu-18-04](https://www.omgubuntu.co.uk/2018/04/things-to-do-after-installing-ubuntu-18-04)**
**[PC Part Picker https://pcpartpicker.com/](https://pcpartpicker.com/)**
