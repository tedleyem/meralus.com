---
layout: post
title:  "NEW TITLE"
date:   2024-02-01
excerpt: "lorem ipsum"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

My theory on

We’ve all inherited systems we didn’t have any part of building. If you are a systems administrator, the day will come when you need to work on a system and don’t have the root password for any number of reasons—and statistically speaking, that day will come at the worst possible moment: you need access to that box *right now*.

Recovering the root password might seem frightening, but it doesn’t have to be difficult or complicated. On a RHEL/CentOS version 7 or later system, thanks to the Grub bootloader it’s actually pretty simple.

Begin by starting a kettle of water to boil (Optional, but recommended).

First, you need console access: Either at a keyboard and monitor locally, or via Virtual Machine remote console, you will need to see and interact with the bootloader.

Reboot the machine: As soon as the bootloader comes up with the selection screen, quickly tap the up and down arrows up and down to pause the countdown.

Select the kernel you want to boot into, and hit 'e': This will take you into a screen where you can edit the grub bootloader script.

Find the line that refers to the kernel: There will be a series of 'boot parameters' here: these are instructions passed during the loading of the kernel.

For RHEL/CentOS 7, the line starts with 'linux16'.

For RHEL/Centos 8x, and Fedora the line starts with 'linux'.

Add 'rd.break' at the end of that line (There are other things you can do here, but for now, this is all you need) [ Note: This change is temporary ].

Now hit Ctrl-x to run the edited bootloader script.

You’ll boot to a 'rescue' prompt that looks like this: switch_root:/#.

Remount the root partition in read-write mode so that you can run commands. Enter the following: mount -o remount rw /sysroot and then hit ENTER.

Now type chroot /sysroot and hit enter. This will change you into the sysroot (/) directory, and make that your path for executing commands.

Now you can simply change the password for root using the passwd command.

Next, before you reboot, you will need to make sure that SELinux allows the file changes. At the prompt ,enter: touch /.autorelabel. This will signal SELinux on the next reboot that the filesystem has changed (the changed password) and allow the change to be loaded. This will cause the whole filesystem to be 'relabeled' which might take a while, depending on the size of the filesystem and the speed of the machine, so be aware of this possibility.

Type exit to leave the chroot environment and enter reboot.

Go and make a cup of tea to reward yourself for your cleverness: The water should be boiling now. (Again, optional but recommended and highly dependent on your participation with Step #1.)

And that’s it. You should now have root password access to this system.