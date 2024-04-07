---
layout: post
title:  "Automating sysadmin tasks with Ansible"
date:   2022-04-06
excerpt: "Automating the boring stuff"
img: "blog-headers/vr-movie.jpg" 
project: true  
---


Since I learned about Ansible in 2018 from [a weekend reading by Shawn Powers](https://www.linuxjournal.com/content/weekend-reading-ansible) I knew this was going to be the hammer to my IT based toolkit. Since then I have added tools like Docker, minikube (for testing), Terraform, Packer, and a list of other technologies to my belt but Ansible holds a special place in my heart. 

The need and the growth in autmation can be summed up by this popular quote: 
``` 
"If you are doing something more than twice, automate it!"
```

If you wondering if learning about automation is important while trying to break into the IT industry I'll leave you with this. 
```
“You’re either the one that creates the automation or you’re getting automated.”
```

If you hate performing repetitive tasks, like the rest of us, then I suggest you Learn Ansible, and learn it now! This blog wont 
break down what ansible is or teach you about how to use it. I would suggest going to the Linux Journal article above lol. This blog is about sysadmin tasks you can use to automate some daily tasks. These are some quick and simple tasks to throw into your automation based jobs/pipelines/projects. It's a great tool for sysadmins because it helps you standardize daily activities like checking and reporting disk space, viewing logs, installing packages and more. A few of these tasks are:

* Installing, configuring, and provisioning servers and applications
* Updating and upgrading linux hosts
* Monitoring logs and mitigate troubleshooting issues
* Checking system uptime, memory, disk space, and more. 


Most times these tasks require manual steps that may require multiple manual steps like connecting to different hosts or clicking a few buttons, or even more steps if you need to view logs. This might be okay in small environments but what if you had 10,12, or 1,200 servers you have to check? This is where Ansible can come into play and help solve that issue. Ansible may seem like something that only works for sysadmins and local machines but trust and beleive, through my experience, I have used ansible and have implemented into the cloud with creating AWS AMI's with packer, server and application provisioning in the cloud, and more. 

# CyberSecurity and Ansible
Recently (as in like the last 5 years) there have been a list of different vulnerabilities and exploits that may require you to check what version of a package is installed on your system and if your system is affected. These scripts can help you check and answer that kind of question in minutes. A few of the tasks will check for the most recent [XZ outbreak (CVE-2024-3094) vulnerability](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/) and the [Log4J vulnerabilities of 2021](https://www.ibm.com/topics/log4j). In writing this blog I found a great [Log4j-CVE-2021-44228 detector scanner playbook](https://github.com/lucab85/log4j-cve-2021-44228) and a new [job reporting playbook](https://github.com/jwkenney/ansible-job-report) that I plan on adding to my mix of daily/weekly scans and checks. 


# Daily Dosage 
Lets get back to sysadmin tasks. So, typically with manual tasks, making changes to to 2-3 servers, even when following documentation, could result in different changes on each machine due to human error. Those errors may impact future upgrades and changes to these systems and trigger errors in security and compliance based checks on systems. Anssible helps make sure that the changes made on one system, are the same changes on multiple systems. This remove human error and allows you to remove a file, upgrade a system packages, or reconfigure a conf file for a cluster of services in a load balanced web pool, or a list of databases that need logs rotated. 

I'm only going to go over a few of the tasks, in hope that they will be enough for whoever is reading this to pick and choose the tasks and use them at will. 
My goal with most of these playbooks is to run them on both Debian based distros like Ubuntu and Rhel distos. 
I put the playbooks and a few roles all into [this repository](https://github.com/tedleyem/ansible-sysadmin-tasks) to make it easy to download and dig in. So enjoy. 



#### 1. Gather Server stats and Sars

In the trenches of troubleshooting and diagnosing server performance or application issues, you may need to gather system activity reports [(sars)](https://en.wikipedia.org/wiki/Sar_(Unix)) and a timestamp of server information. In most scenarios, or in the cloud, monitoring tools and appliances are in place, but if you dont have access to those tools or have them setup, you may need to grab some important data to send to your team or help solve problems. 

Security teams may find this helpful  when conducting checks and investigating outtages. 
Most times, they want to gather all this information on multiple servers, so a playbook like this one 
can be an easy way to collect that data and share with your team. 

For checking logs and dumping to the /tmp dir
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/check_stats.yml 



The output for both should look like this: 

$ cat /tmp/sar-workernode1-20210221214056.txt 
-----------------------------------------------------
 sar output for workernode1
-----------------------------------------------------
Linux 4.18.0-193.el8.x86_64 (node1) 	21/02/21 	_x86_64_	(2 CPU)
21:39:30     LINUX RESTART	(2 CPU)
-----------------------------------------------------

#### 2. Collect logs

In addiition to needing server stats, security teams and other teams may need logs. Data is king in the IT and security feild. 
This can be a game changer when unexpected incidents occur. 
Here is a playbook and role for collecting logs. 


For collecting system logs saved with the servername. 
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/check_logs.yml 



#### 3. Install or remove packages and software
Installing packages, updating packages, or removing a specific package on multiple hosts can be 
a bit of a daunting task. Sometimes you need to do that rapidly to confirm that security checks pass or 
rollback changes made to multiple systems. These playbooks/roles reduced time to install or changes and can be used for weekly system checks if needed. 
This playbook allows an repeatable and consisteny way to modify packages on remote hosts 
and maintain consistency amoung machines. 

These roles listed below check variables in the var/main.yml file. Those can be modified there 
or changed in each individual playbook 

This example installs two specific packages and versions defined in a vars file. Using Ansible automation, you can install multiple packages or software faster than doing it manually. You can also use the vars file to define the version of the packages that you want to install:

For checking connectivity to remote hosts with Ping
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/ping.yml 

For checking checking system packages and creating a check file.  
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/check_system_packages.yml 

For checking security only package updates
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/system_security_check.yml 

For installing multiple packages  
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/system_package_install.yml 

For removing multiple packages  
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/system_package_removal.yml 

For updating system packages 
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/system_package_updates.yml 


An ansible role to CRUD system packages 
[Role]() 
$ ansible-playbook -i inventory/hosts roles/system_packages


Feel free to check all the other tasks in the playbooks dir to find a task you might find userful. 

# Security playbooks with Ansible  
#### 4. Report Log4j findings with [ansible-job-report](https://github.com/tedleyem/ansible-job-report)

For checking log4j finding on a system
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/security/exploit_check_log4j.yml

The full ansible role to check and report log4j findings
[Role]()
$ ansible-playbook -i inventory/hosts roles/security/log4j_findings

#### 5. Report XZ Vulnerability findings with [ansible-job-report](https://github.com/tedleyem/ansible-job-report)

For checking XZ finding on a system
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/security/exploit_check_xz_cve_2024_3094.yml

The full ansible role to check and report XZ findings
[Role]()
$ ansible-playbook -i inventory/hosts roles/security/xz_vuln_findings


#### Embrace automation
Staying ready so you dont have to get ready and be effective as a sysadmin, engineer, cybersecurity analyst, and more requires you to embrace automation and encourage the use of Ansible. 
Ansible allows you to do more with less, automate the boring stuff, help teams gather data, provision servers, and more. For those who are thinking about automating tasks, finding solutions for sysadmin or cybersecurity related tasks, consider Ansible. More random ansible blogs coming soon. 



## LOVE 
Thanks [jwkenney](https://github.com/jwkenney) for the nice reporting playbook. Much Appreciated. 


