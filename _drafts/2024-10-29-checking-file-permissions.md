---
layout: post
title:  "File Permissions and Stat"
date:   2024-10-29
excerpt: "checking file permissions on a linux system"
img: "blog-headers/docker-introduction-01.jpg"
project: true
---

-Permissions quick commands
  stat c %a%n file



-File structure tree
```
tmeralus@mercury:~/notes(main)$ ll
total 748
drwxr-xr-x 12 tmeralus tmeralus   4096 Oct 26 21:41 ./
drwx------ 38 tmeralus tmeralus   4096 Oct 26 22:29 ../
drwxr-xr-x  2 tmeralus tmeralus   4096 Oct 26 11:37 archived-weeks/
-rw-r--r--  1 tmeralus tmeralus  14770 Oct 19 09:01 dojo.md
-rw-r--r--  1 tmeralus tmeralus    960 Oct 19 08:57 drow
drwxr-xr-x  2 tmeralus tmeralus   4096 Oct 26 11:37 embedded/
```


To check file permissions in Linux, you can use the ls -l command to display a long list of file and directory information, including permissions:

    First character: Indicates whether the item is a file or a directory. A d means it's a directory, and a - means it's a file.

rwx: The first rwx indicates the file permissions for the creator of the file or directory. r stands for read, w stands for write, and x stands for execute. A - means a particular permission has not been granted.
Next three entries: The permissions for the group.
Last three entries: The permissions for everyone else.
Remaining information: The name of the creator, the name of the group, the size of the file, the date it was created, and finally the name of the file.

You can also use the stat -c command to get the numeric representation of file permissions.
Understanding file permissions is important for maintaining the security of your Linux system and ensuring proper access control.


