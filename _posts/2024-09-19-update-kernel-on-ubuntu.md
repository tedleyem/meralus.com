---
layout: post
title:  "Ubuntu Kernel updates"
date:   2024-09-19
excerpt: "Ubuntu CVE and kernel updates"
img: "blog-headers/ubuntu-cve-spotlight.png"
project: true
---

Some OS related issues could be fixed by installing a different Linux Kernel. Recently there has been a new linux kernel vulnerability [USN-7003-1: Linux kernel vulnerabilities](https://ubuntu.com/security/notices/USN-7003-1). The the JFS file system contained an out-of-bounds read vulnerability when printing xattr debug information. What does that mean for you? Probably nothing, but its still good to update package on your ubuntu systems. However, running an 'apt update' may only install the linux-generic or linux-headers packages but not set them. Automatically setting the kernel does happen so in this blog I will review how to install a new kernel and make it bootable by default.


## Installing a new kernel
Display version of currently running Kernel: uname -r
List available for installation kernels: sudo apt list linux-*image-* | grep generic  
Update current packages sudo apt update
List available for installation kernels: sudo apt list linux-*image-* | grep generic  
 

From the output we can see different types of kernels but our fix is contained in linux-image-5.4.0-195-generic kernel.

Install selected kernel with sudo apt install linux-image-5.4.0-195-generic
Check installed kernels with dpkg --list | grep linux-image     

Example output:  

root@mercury:~# dpkg --list | grep linux-image
```
rc  linux-image-5.4.0-174-generic         5.4.0-174.193                     amd64        Signed kernel image generic
rc  linux-image-5.4.0-176-generic         5.4.0-176.196                     amd64        Signed kernel image generic
rc  linux-image-5.4.0-177-generic         5.4.0-177.197                     amd64        Signed kernel image generic
rc  linux-image-5.4.0-181-generic         5.4.0-181.201                     amd64        Signed kernel image generic
rc  linux-image-5.4.0-182-generic         5.4.0-182.202                     amd64        Signed kernel image generic
rc  linux-image-5.4.0-187-generic         5.4.0-187.207                     amd64        Signed kernel image generic
rc  linux-image-5.4.0-189-generic         5.4.0-189.209                     amd64        Signed kernel image generic
ii  linux-image-5.4.0-190-generic         5.4.0-190.210                     amd64        Signed kernel image generic
rc  linux-image-5.4.0-192-generic         5.4.0-192.212                     amd64        Signed kernel image generic
ii  linux-image-5.4.0-193-generic         5.4.0-193.213                     amd64        Signed kernel image generic
ii  linux-image-5.4.0-195-generic         5.4.0-195.215                     amd64        Signed kernel image generic
ii  linux-image-5.4.0-196-generic         5.4.0-196.216                     amd64        Signed kernel image generic
ii  linux-image-generic  
```


We can see our new kernel in the list now. 

## Updating the default kernel
To install the new kernel we can easily reboot the machine and select a newly installed kernel, however, we want to make sure it boots by default. 

Because this is a virtual box and we dont have physicall acess to the machine you should  manually “hardcode” the new kernel in GRUB.

Check the entries from /boot/grub/grub.cfg
Get the $menuentry_id_option with grep submenu /boot/grub/grub.cfg 

Example output: 

```
root@mercury:~# grep 'menuentry \|submenu ' /boot/grub/grub.cfg | cut -f2 -d "'"
Ubuntu
Advanced options for Ubuntu
Ubuntu, with Linux 5.4.0-196-generic
Ubuntu, with Linux 5.4.0-196-generic (recovery mode)
Ubuntu, with Linux 5.4.0-195-generic
Ubuntu, with Linux 5.4.0-195-generic (recovery mode)
Ubuntu, with Linux 5.4.0-193-generic
Ubuntu, with Linux 5.4.0-193-generic (recovery mode)
Ubuntu, with Linux 5.4.0-190-generic
Ubuntu, with Linux 5.4.0-190-generic (recovery mode)
```

**Get the specific kernel option with grep gnulinux-5.4.0 /boot/grub/grub.cfg**

Example output: 
```
root@mercury:~# grep gnulinux-5.4.0 /boot/grub/grub.cfg 
   set default="gnulinux-5.4.0-195-generic-advanced-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9"
        menuentry 'Ubuntu, with Linux 5.4.0-196-generic' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.4.0-196-generic-advanced-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9' {
        menuentry 'Ubuntu, with Linux 5.4.0-196-generic (recovery mode)' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.4.0-196-generic-recovery-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9' {
        menuentry 'Ubuntu, with Linux 5.4.0-195-generic' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.4.0-195-generic-advanced-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9' {
        menuentry 'Ubuntu, with Linux 5.4.0-195-generic (recovery mode)' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.4.0-195-generic-recovery-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9' {
        menuentry 'Ubuntu, with Linux 5.4.0-193-generic' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.4.0-193-generic-advanced-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9' {
        menuentry 'Ubuntu, with Linux 5.4.0-193-generic (recovery mode)' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.4.0-193-generic-recovery-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9' {
        menuentry 'Ubuntu, with Linux 5.4.0-190-generic' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.4.0-190-generic-advanced-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9' {
        menuentry 'Ubuntu, with Linux 5.4.0-190-generic (recovery mode)' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.4.0-190-generic-recovery-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9' {
```

Here we want to find 'gnulinux-5.4.0-195-generic-advanced-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9' and choose that as our default grub option. 


**Set GRUB_DEFAULT in /etc/default/grub**
if you cat the output of the /etc/default/grub file you can you vi or your favorite text editor to change the GRUB_DEFAULT line in the file. 


Example output: 
```
# If you change this file, run 'update-grub' afterwards to update
# /boot/grub/grub.cfg.
# For full documentation of the options in this file, see:
#   info -f grub -n 'Simple configuration'

#GRUB_DEFAULT=0
GRUB_DEFAULT=gnulinux-5.4.0-195-generic-advanced-b4c7cdf7-69c1-47be-8c08-19dbeeac3ae9
GRUB_TIMEOUT_STYLE=hidden
GRUB_TIMEOUT=0
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="maybe-ubiquity"
GRUB_CMDLINE_LINUX=" audit=1"

# Uncomment to enable BadRAM filtering, modify to suit your needs
# This works with Linux (no patch required) and with any kernel that obtains
# the memory map information from GRUB (GNU Mach, kernel of FreeBSD ...)
#GRUB_BADRAM="0x01234567,0xfefefefe,0x89abcdef,0xefefefef"

# Uncomment to disable graphical terminal (grub-pc only)
#GRUB_TERMINAL=console

# The resolution used on graphical terminal
# note that you can use only modes which your graphic card supports via VBE
# you can see them in real GRUB with the command `vbeinfo'
#GRUB_GFXMODE=640x480

# Uncomment if you don't want GRUB to pass "root=UUID=xxx" parameter to Linux
#GRUB_DISABLE_LINUX_UUID=true

# Uncomment to disable generation of recovery mode menu entries
#GRUB_DISABLE_RECOVERY="true"

# Uncomment to get a beep at grub start
#GRUB_INIT_TUNE="480 440 1"
```


* Update GRUB with 'sudo update-grub'
* Reboot the machine with 'sudo reboot'


The system should boot up with a new kernel. Check default kernel version after rebooting. Log back into the system and run 'uname -r'  to confirm the used kernel version

Example output:
```
root@mercury:~# uname -r
5.4.0-195-generic
```