---
layout: post
title:  "Resetting root passwords in RHEL"
date:   2024-10-28
excerpt: "break this glass in your vm in case of emergencies"
img: "blog-headers/break-fix-root-login.png"
project: true
---

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

And that’s it. You should now have root password access to this system.---
layout: post
title:  "Resetting root passwords in RHEL"
date:   2024-10-28
excerpt: "break this glass in your vm in case of emergencies"
img: "blog-headers/break-fix-root-login.png"
project: true
---
I think we've all been handed systems that we did not setup and ran into some crazy issues. One issue I have run into, whether being a sysadmin or Devops Engineer is breaking into a virtual machine and resetting the root password on the system to be able to do elevated commands. P.S. if you ever want to annoy a Linux admin add random strings to the /etc/sudoers or /etc/ssh/sshd_config files lol.

Most data centers or systems are remotely managed and within a hypervisor. So managing VM's can seem easy, but not having physical access to a VM makes things like rebooting and changing the boot order can feel cumbersome. Anyway, recovering the root password or changing it is pretty easy because of the [Grub Bootloader](https://www.gnu.org/software/grub/).


* So First, you'll need console access: Either at a keyboard and monitor locally, or via Virtual Machine remote console, you will need to see and interact with the bootloader.
* Reboot the machine: As soon as the bootloader comes up with the selection screen, quickly tap the up and down arrows up and down to pause the countdown.
* Select the kernel you want to boot into, and hit 'e': This will take you into a screen where you can edit the grub bootloader script.
* Find the line that refers to the kernel: There will be a series of 'boot parameters' here: these are instructions passed during the loading of the kernel.
```
For RHEL/CentOS 7, the line starts with 'linux16'.
```
```
For RHEL/Centos 8x, and Fedora the line starts with 'linux'.
```
* Add 'rd.break' at the end of that line (There are other things you can do here, but for now, this is all you need) [ Note: This change is temporary ].
* Now hit Ctrl-x to run the edited bootloader script.
* Next you’ll boot to a 'rescue' prompt that looks like this: switch_root:/#.
* Remount the root partition in read-write mode so that you can run commands. Enter the following:
```
mount -o remount rw /sysroot and then hit ENTER.
```
* Now type chroot /sysroot and hit enter. This will change you into the sysroot (/) directory, and make that your path for executing commands.
* Now you can simply change the password for root using the passwd command.
```
passwd root
```

Note: you may want to make changes to /etc/ssh/sshd_config and comment out any commands
that restrict root login. You can search for the line below and make sure
to remove the '#' in front of it to allow Root login into the system.
```
#PermitRootLogin yes
```

* Next, before you reboot, you will need to make sure that SELinux allows the file changes. At the prompt ,
enter:
```
touch /.autorelabel.
```

This will signal SELinux on the next reboot that the filesystem has changed (the changed password) and allow the change to be loaded.

This will cause the whole filesystem to be 'relabeled' which might take a while, depending on the size of the filesystem and the speed of the virtual machine, so it may take a few more seconds than normal to reboot.

* Type exit to leave the chroot environment and enter reboot.

Once rebooted you should be able to access the system.


```
For RHEL/Centos 8x, and Fedora the line starts with 'linux'.
* Add 'rd.break' at the end of that line
hit Ctrl-x to run the edited bootloader script.

- mount -o remount rw /sysroot
and then hit ENTER.

- passwd root

- make changes to /etc/ssh/sshd_config
#PermitRootLogin yes

touch /.autorelabel.

reboot -h now
```
