---
layout: post
title:  "Locking and unlocking system accounts"
date:   2024-10-29
excerpt: "locking quick commands"
img: "blog-headers/penguin-locks.jpg"
project: true
---

How do I lock an account (user login id) under Linux operating system? How can I disable a user’s login without disabling the account on a Linux based server?

You can use the passwd command to change user or group accounts password. A normal user may only change the password for his/her own account, the super user (root) may change the password for any account. You can use the passwd command for locking or unlocking an account on a Linux operating systesm.


Task: Linux locking an account

The syntax is as follows for locking down the account. It is performed by rendering the encrypted password into an invalid string by prefixing the encrypted string with an !. The -l option is available to root user only:

passwd -l {username}

The -l option disables an account by changing the password to a value which matches no possible encrypted value. In this example, lock user account named vivek. First, login as a root user and type the following command:

passwd -l vivek

OR use the sudo command:

sudo passwd -l vivek

Sample outputs:

Locking password for user vivek.
passwd: Success

Task: Linux Unlocking an Account

The syntax is as follows and the -u option is available to root user only:

passwd -u {username}

The -u option re-enables an account by changing the password back to its previous value i.e. to value before using -l option. To unlock user account named vivek. Login as a root user and type following command:

passwd -u vivek

Sample outputs:

Unlocking password for user vivek.
passwd: Success

Task: Root can access any account

The syntax is:
su - {username}
su - vivek