---
layout: post
title: Linux File Structure Explained
date: 2019-02-22
excerpt: "Linux File Structure Explained"
tags: [linux,]
---

If you’re coming from Windows, the Linux file system structure can be a bit intimidating and confusing. The C:\ drive and other hard drives replaced by a / and weird directories that dont seem to make any sense.

[The Filesystem Hierarchy Standard (FHS)](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard) defines the structure of file systems on Linux and other UNIX-like operating systems. Linux file systems also contain some directories that aren’t fully defined by the standard. Lets go over those

### / – The Root Directory
Everything on your Linux system is located under the / directory, known as the root directory. You can think of the / directory as being similar to the C:\ drive on Windows – however Linux doesn’t have drive letters. In the same way another partition would be located at D:\ on a Windows machine, A new partion on would appear in another folder under / on Linux.

### /bin – Essential Command Binaries
The /bin directory contains the essential user binaries (or programs) that must be present when the system is mounted in single-user mode (or recovery mode for Windows users). Applications like Firefox or Thunderbird are stored in /usr/bin, while important system programs and utilities such as the bash shell are located in /bin. Adding files in the /bin directory confirms the system will have these important utilities or scripts needed even if no other file systems are mounted. The /sbin directory is similar – it contains essential system administration binaries (used for running, starting, or stopping programs).

### /boot – Static Boot Files
The /boot directory contains the files needed to boot the system – for example, the [GRUB boot loader’s]((https://www.gnu.org/software/grub/)) files and your Linux kernels are stored here. The boot loader’s configuration files aren’t here

### /etc - System-wide configuration
Host-specific system-wide configuration files can be found in the /etc directory with the other configuration files.
You can find configuration files for most applications
in this folder if not installed in somewhere specific by the package installer.

### /cdrom – Historical Mount Point for CD-ROMs
The /cdrom drive is pretty easy to explain. Instead of finding a mountable drive in the My Computer folder of a Windows machine you can find the contents or mount points of a cd or dvd in this directory.

The /cdrom directory isn’t part of the FHS standard, but you’ll still find it on Ubuntu and other operating systems. It’s a temporary location for CD-ROMs inserted in the system. This is where your internal cd/dvd drive content can be found.

Note: the default location for most temporary media is inside the /media directory. This is where you may find usb mounts or other storage device mounts.

### /dev – Device Files
Linux exposes devices as files, and the /dev directory contains a number of devices represented as special files. They are not actual files but they show up as such. For example, the /dev/sda represents the first SATA drive in the system. If you wanted to partition it, you could start a partition editor and tell it to edit /dev/sda.
Additional drives may be listed as /dev/sdb or /dev/sdc

Note: This /dev/ dir also contains pseudo-devices, which are virtual devices that don’t actually correspond to hardware. For example, /dev/random produces random numbers. /dev/null is a special device that produces no output and automatically discards all input – when you pipe the output of a command to /dev/null, you discard it.

### /home - Where the heart is
The /home directory contains a home folder for each user. This would be similar to the Users folder in the C:\ drive of a Windows machine. The /home/ted folder contains the user’s data files and user-specific configuration files. This would be where you would find a users Documents, Pictures, or Downloads files. When Users are created a new folder with the users name gets created in the home dir.

### /lib – Essential Shared Libraries
The /lib directory contains libraries needed by the essential binaries in the /bin and /sbin folder. Libraries needed by the binaries in the /usr/bin folder are located in /usr/lib as well. For example, you can find python packages installed on your machine.

# /media – Removable Media
The /media directory contains subdirectories where removable media devices inserted into the computer are mounted. For example, when you insert an external drive drive, CD or USB into your Linux system, a directory will automatically be created inside the /media directory. You can access the contents of the CD inside this directory.

### /mnt – Temporary Mount Points
The /mnt directory is where system administrators mounted temporary file systems while using them. For example, if you’re mounting a Windows partition to perform some file recovery operations, you might mount it at /mnt/windows. However, you can mount other file systems anywhere on the system. You can also mount different disk partitions or shortcuts to specific folders here.

### /opt – Optional Packages
The /opt directory holds subdirectories for optional software packages. It’s commonly used by proprietary software that doesn’t obey the standard file system hierarchy – for example, a proprietary program might dump its files in /opt/application when you install it.

### /proc – Kernel & Process Files
The /proc directory similar to the /dev directory because it doesn’t contain standard files. It contains special files that represent system and process information.
System specs and parameters are gathered in this dir.

### /root – Root Home Directory
The /root directory is the home directory of the root user. Instead of being located at /home/root, it’s located at /root. This is different from /, which is the system root directory.

### /run – Application State Files
The /run directory is one of the newerer additions to the FHS, and gives applications a standard place to store transient files they require like sockets and process IDs. These files can’t be stored in /tmp because files in /tmp may be deleted. Applications may leave pid files on a computer to secure a connection to an open port on a system. The /run dir is typically a place where those pid files would be found.

### /sbin – System Administration Binaries
The /sbin directory is similar to the /bin directory. It contains essential binaries that are generally intended to be run by the root user for system administration.


### /selinux – SELinux Virtual File System
If your Linux distribution uses SELinux for security (Fedora, CentOS and Red Hat, for example), the /selinux directory contains special files used by SELinux. It’s similar to /proc. Ubuntu doesn’t use SELinux, so the creating a /selinux may show up in bug reports.

### /srv – Service Data
The /srv directory contains “data for services provided by the system.” If you were using the Apache HTTP server to serve a website, you’d likely store your website’s files in a directory inside the /srv directory.

### /tmp – Temporary Files
Applications store temporary files in the /tmp directory. These files are generally deleted whenever your system is restarted and can be deleted an any given time if needed.
If your copying files from one machine to another the /tmp dir is a safe place to those files if they are temporary

### /usr – User Binaries & Read-Only Data
The /usr directory holds applications and files used by users, as opposed to applications and files used by the system. For example, new applications are located inside the /usr/bin directory like Thunderbird or Geary instead of the /bin directory and non-essential system administration binaries are located in the /usr/sbin directory instead of the /sbin directory. Libraries for each are located inside the /usr/lib directory. The /usr directory also contains other directories – for example, architecture-independent files like graphics are located in /usr/share.

### /usr
The /usr/local directory is where locally compiled applications install to by default – this prevents them from mucking up the rest of the system.

### /var – Variable Data Files
files or application folders that are expected to continually change during normal operation of the system—such as logs, spool files, and temporary e-mail files. You’ll find system specific log files in /var/log/syslog/messages. These types of files, if not rotated automatically by your system with a cron job can grow very large in size.

## In Conclusion
There are a list of other files in the Filesystem Hierarchy Standard but I think i've gone over the basics. If you want to look around your filesystem without repeatedly typing the 'cd' command you can try the [Ranger](https://github.com/ranger/ranger) app which will allow you to navigate and view your system files and folders in an easier like fashion.

![Ranger Terminal App](/assets/img/blog/ranger-terminal.png)
