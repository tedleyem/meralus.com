---
layout: post
title:  "Hard Drive Hassles and a broken WAP"
date:   2020-09-11
excerpt: "First time Linux failed me"
tags: [ ]
comments: true
---
 
## The wild wild west with western digital 
## Warning: possible ranting involved 

Linux is the swiss army knife for hacking, building, and repairing a majority of issues 
found on the internet. When it comes to fixing hard drives, whether it be formating, partitioning, 
resizing, or recovering data, Linux and open source software like GParted will normally do the trick. 
I have been using these tools for over a decade for things hard drive recovery, fixing damaged sectors on a hard drive, and they have never failed me... UNTIL NOW! 

This year, last week, as of the time im writing this, I had my Western Digital 3TB give up on me. The drive is in a Western Digital case that requires a power adapter and a usb cable for data connection. If you have ever used a flash drive or external hard drive this is nothing new to you. I had first noticed that when I turn on the drive it would take anywhere between 14-30 seconds for it to turn on and start spinning up. When plugging in your usb drive into any computer there is normally a pop or click sound you hear to know that the drive was connected and recognized by the OS. This WD would make that sound as soon as you connected it but wouldn't be mounted or active until that 15-30 second mark. 
Im not sure if it was always like that or if I just recently started noticing it but I think its somewhat important to this story.


I connect my external to a docking station when I need to do backups and dont keep it running all the time in fear of it falling off the desk when im gone or my dog bumping the computer desk. Anywho, while backing up my brothers music using a backup script I wrote, the script would bomb. Errors $PATH could not be found or accessed. Okay, no worries, lets just plug it in...wait, it is plugged in. 

My first though was to run [ls blk](https://man7.org/linux/man-pages/man8/lsblk.8.html) to list the drives and mountpoints on my computer. 
My Dell G15 gaming laptop has a 128gb ssd and a 1tb so finding the 3TB should be easy. WRONG 
Nothing is listed. 

*doh* 

Confused I look back to my gui and see that the external shows its connected, disconnected and reconnect and come up with nothing. Testing with ["fdisk -l"](https://man7.org/linux/man-pages/man8/fdisk.8.html) I find my external drive. The gui pops up again but cannt be accessed, and the physical drive isnt making any noise or showing any signs of damamge. 

Now even more confused than when I started I figured [Gparted](https://gparted.org/) never steers me wrong. I fire open one of the most known and most popular and free applications for hard disks and partitioning in the world thinking this may save me. Gparted is a free partition editor for managing 
disks so why not use that. 

### scratches head
Gparted showed a flag on the external drive (which apparently shows up to the party when it wants to).
The flag states I should check the device and and run a "checkdisk -f" to repair the drive. 


Checkdisk -f could potentially damage or format the drive right? Is'nt checkdisk a command in command prompt? Something't not right. 

### Here comes the meat and potatoes. 
Realizing that the drive isnt operating in the most efficient manner I assumed that a block of some sort is damaged and the drive could be going back. I know there is a small windows application called [HD TUNE](https://www.hdtune.com/) that I can use and check the full health of the drive. Right not its fighting with me to read the partition on the disk like a dog and a chew toy. 

I power down and unplug the drive and plug it into the only windows machine in my house and run hd tune's full test to check for errors and benchmark results. 

The drive shows up on windows and can be ran and checked by HD Tune but cant be accessed. I tried the simple "Turn it off and then back on again" to see if the drive will pop up but get the same results. 
Could the partition of the drive have been changed. A changed partition type could wipe/destroy all the data on the drive. My brothers music and pictures are on the drive so I can't afford for this to happen. 
I quickly run back to Ubuntu 18.04 and run more fdisk commands to find the partionin table and do some damage. 
Back on my machine the drive does not show up on the GUI anymore but is listed in fdisk.  

By typing fdisk /dev/sdc im able to access the drive and leverage the fdisk utility to find out whats going on. 
running the p command prints the partition table and tells me that the drive is an NTFS volume! 
My eyes begin to scream with rage as I think i have lost my data and the drive decided to act bougie and change partition types. Could this also be an issue with the boot record. If the boot record was messed up the drive wouldn't be showing up or would be reading the wrong information. I havent done a backup in a week and the drive hasnt moved nor has there been any power outtages.  

When running fdisk, changes are only applied to memory until you save or write your changes. 
so I looked into a few fdisk feautres (which all failed me): 

* List free unpartitioned space: failed to read
* list known partition types: NTFS 
* add a new partition: no free block sectors 
* create a new GPT partition table: failed to 
  
With the failures that appear I start wondering if the hard drives in my laptop are starting to fail or an update 
that I had recently done broke something I wasnt aware of. I power down and unplug my drive. Plug it back into the windows 
machine and run [DISKPART](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/diskpart) which in my mind is the windows based fdisk utility. Note, Fdisk can be used on both Windows and Linux. I decided to isolate possible hard drive issues and allow ubuntu to do a checkdisk scan pre boot while working on the windows machine. 

While running DISKPART I simply typed the following: 
* list disk 
+ select disk 2
* detail disk 

and boom! this disk shows up and is an NTFS disk with 2.7TB listed. 
I check the disk to see if it could be accessed, and BOOM! its working! 

Nothing I did specifically got it working per say. It just worked. After checking my bash script to make sure 
no specific function is triggering changes to the hard drive other than adding data I start laughing. 

### Always understand the problem
I spent about an hour trying to figure out what software could help or could solve this issue, but as I start looking around the Western Digital Hard drive and look up failure rates I realized this isnt software related. Software is just a tool used to connect other software or hardware together. The problem with the hard drive not connecting properly is most likely hardware related. I should have done some more hardware troubleshooting hardware steps to rule out all hard drive related issues. Firstly, has the usb cable been burnt or warn out? Is the hard drive controller burn or damaged. can I smell any signs of damage? 


Well, two things can be true, your hard drive controller can be messed up, and, your hard drive controller doesnt have to been burnt out or smell burnt.

I got my CompTIA A+ over 5 years ago now but one lesson I learned when I committed to getting into the industry was to always take a step back and understand the problem. Switching between the two different OS's and noticing differences in the connectivity of both showed me that there is something wrong with how the external hard drive is connecting to the computers. 

I decided to take apart the hard drive controller from the case and reveal the WET ADAPTER PIECE. 
After finding methods to dry the pice I was able to plug and play the external hard drive with ease, backup all the data off that and onto my new 5TB external hard drive. 

![Western Digital 5TB HDD](/assets/blog/hdd-repair-1-500.jpg)

## The lessons learned today and listening to [Cardi B's WAP](https://www.youtube.com/watch?v=hsm4poTWjMs) song will remind me of that one time LInux failed me....but didn't. Linux never fails. Thanks for reading. 

 



