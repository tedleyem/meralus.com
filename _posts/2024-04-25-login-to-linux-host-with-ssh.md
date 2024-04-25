---
layout: post
title:  "SSH and Handshakes"
date:   2024-04-25
excerpt: "Login to linux machine or cloud instances with ssh"
img: "blog-headers/ssh-handshakes.png" 
project: true  
---

Logging into Linux hosts without a password can help increase speed of troubleshooting, enhance security, and make it easier to login to different linux systems. This helps in the cloud as well. The best way to get this done is to generate an ssh key and copy it to a linux machine. This is how you do it lol. 

#### Generate authentication keys
First, on your computer generate a pair of authentication keys as a user "ted" (ted@thinkpad). Do not enter a passphrase:

$ ssh-keygen -t rsa

```
Generating public/private rsa key pair.
Enter file in which to save the key (/home/ted/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/ted/.ssh/id_rsa.
Your public key has been saved in /home/ted/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:d+JYoN97GVktiKHAYLycgTnYxQJOg8RlyOg3/xtlk24 ted@thinkpad
The key's randomart image is:
+---[RSA 3072]----+
|BBoO+o           |
|*+O.+ o   .      |
|.. + + ... o . . |
| . o+  ...o . o .|
|  . o . S=+ .o . |
|     . .+*.oo    |
|      ..oEo  o   |
|       .o  .o    |
|       .. ..     |
+----[SHA256]-----+

```

#### Fun hack 

Add public key to .ssh/authorized_keys
We need to add the public key generated in the previous section (.ssh/id_rsa.pub) 
to /home/ubuntu/.ssh/authorized_keys of the remote machine.
The ubuntu user is the default user for AWS ec2 instances. To find out the default username for other AMI's in AWS specfically [you can go here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/managing-users.html#ami-default-user-names)


#### Passwordless ssh login to AWS instance

From now on we can log into ubuntu@169.254.169.254 a without password:

```
ted@thinkpad:~$ ssh ubuntu@169.254.169.254

Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-177-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

  System information as of Thu 25 Apr 2024 09:12:43 PM UTC

  System load:  0.0                Processes:             182
  Usage of /:   15.8% of 47.93GB   Users logged in:       0
  Memory usage: 6%                 IPv4 address for ens3: 169.254.169.254
  Swap usage:   0%

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

3 updates can be applied immediately.
To see these additional updates run: apt list --upgradable

2 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm




Last login: Thu Apr 25 16:30:50 2024 from 127.0.0.1
```

Smooth sailing