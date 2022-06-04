---
layout: post
title:  "Terminal Sharing and troubleshooting"
date:   2021-09-09
excerpt: "Terminal Sharing with tmate"   
--- 


 There are many times when im helping friends with a programming project and want to be able to look at logs or troubleshoot a few errors with ease. My first headache normally comes with choosing the right applicaiton for the job. There is a list of large screen sharing applicaitons like discord or microsoft teams that might help but the time it may take to convince someone to setup an account for any of the big named apps can  be cumbersome. A few years ago I found a terminal based app that I absolutely love and use to this date. No email address or use accounts needed, no distraction of wallpaper, video resolution bugs, or any of that. The app im talking about is tmate! 

 What is tmate exactly? Well, by definition, [tmate.io](https://tmate.io/) is a clone of tmux (terminal multiplexer) that provides a secure, instant and easy-to-use terminal sharing solution over an SSH connection. In layman's terms it's a terminal based application that allows ssh connection to remote machines. 

 This has been helpful in a list of different scenarios 


tmate is a clone of tmux (terminal multiplexer) that provides a secure, instant and easy-to-use terminal sharing solution over an SSH connection. It is built on top of tmux; you can run both terminal emulators on the same system. You can either use the official servers at tmate.io or host your own tmate server.


    Once installed, launch tmate with tmate. You should see something like ssh PMhmes4XeKQyBR2JtvnQt6BJw@nyc1.tmate.io appearing. This allows others to join your terminal session. All users see the same terminal content at all time. This is useful for pair programming where two people share the same screen, but have different keyboards.

    tmate is useful as it goes through NATs and tolerate host IP changes. Accessing a terminal session is transparent to clients as they go through the tmate.io servers, acting as a proxy. No authentication setup is required, like setting up ssh keys.

    Run tmate show-messages in your shell to see tmate's log messages, including the ssh connection string.

    tmate also allow you to share a read-only view of your terminal. The read-only connection string can be retrieved with tmate show-messages.

    tmate uses ~/.tmate.conf as configuration file. It uses the same tmux syntax. In order to load the ~/.tmux.conf configuration file, add source-file ~/.tmux.conf in the tmate configuration file.
