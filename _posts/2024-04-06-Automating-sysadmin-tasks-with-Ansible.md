---
layout: post
title:  "Sysadmin tasks with Ansible"
date:   2022-04-06
excerpt: "Automating the boring stuff"
img: "blog-headers/sysadmin-tasks.png" 
project: true  
---

Since I learned about [Ansible](https://www.ansible.com/) in 2018 from [a weekend reading by](https://www.linuxjournal.com/content/weekend-reading-ansible) by [Shawn Powers](https://www.linkedin.com/in/shawnpowers/) I knew this was going to be the hammer to my IT based toolkit of daily tools. Since then I have added tools like Docker, minikube (for testing), Terraform, Packer, and a list of other technologies to my belt but Ansible holds a special place in my heart. In my career I have gone from customer support specialist, sysadmin, Linux admin, devops engineer, Linux engineer, application engineer, to Linux Software Engineer and one quote that repeats itself time and time again is this. 

``` 
"If you are doing something more than twice, automate it!"
```

If you wondering if learning about automation is important while trying to break into the IT industry I'll leave you with this. 
```
“You’re either the one that creates the automation or you’re getting automated.”
```

If you hate performing repetitive tasks, like the rest of us, then I suggest you Learn Ansible, and learn it now! This blog wont break down what ansible is or teach you about how to use it. 
I would suggest going to the Linux Journal article above lol. This blog is about sysadmin tasks you can use to automate some daily tasks. These are some quick and simple tasks to throw into your automation based jobs/pipelines/projects. It's a great tool for sysadmins because it helps you standardize daily activities like checking and reporting disk space, viewing logs, installing packages and more. A few of these tasks are:

* Installing, configuring, and provisioning servers and applications
* Updating and upgrading Linux hosts
* Monitoring logs and mitigate troubleshooting issues
* Checking system uptime, memory, disk space, and more. 


Most times these tasks require manual steps that may require multiple manual steps like connecting to different hosts or clicking a few buttons, or even more steps if you need to view logs. This might be okay in small environments but what if you had 10,12, or 1,200 servers you have to check? This is where ansible can come into play and help solve that issue. ansible may seem like something that only works for sysadmins and local machines but trust and believe, through my experience, I have used ansible and have implemented into the cloud with creating AWS AMI's with packer, server and application provisioning in the cloud, and more. 

# CyberSecurity and Ansible
Recently (as in like the last 5 years) there have been a list of different vulnerabilities and exploits that may require you to check what version of a package is installed on your system and if your system is affected. These scripts can help you check and answer that kind of question in minutes. A few of the tasks will check for the most recent [XZ outbreak (CVE-2024-3094) vulnerability](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/) and the [Log4J vulnerabilities of 2021](https://www.ibm.com/topics/log4j). In writing this blog I found a great [Log4j-CVE-2021-44228 detector scanner playbook](https://github.com/lucab85/log4j-cve-2021-44228) and a new [job reporting playbook](https://github.com/jwkenney/Ansible-job-report) that I plan on adding to my mix of daily/weekly scans and checks. 

# Daily Dosage 
Lets get back to sysadmin tasks. So, typically with manual tasks, making changes to to 2-3 servers, even when following documentation, could result in different changes on each machine due to human error. Those errors may impact future upgrades and changes to these systems and trigger errors in security and compliance based checks on systems. ansible helps make sure that the changes made on one system, are the same changes on multiple systems. This remove human error and allows you to remove a file, upgrade a system packages, or reconfigure a conf file for a cluster of services in a load balanced web pool, or a list of databases that need logs rotated. 

I'm only going to go over a few of the tasks, in hope that they will be enough for whoever is reading this to pick and choose the tasks and use them at will. 
My goal with most of these playbooks is to run them on both Debian based distros like Ubuntu and Rhel distos. 
I put the playbooks and a few roles all into [this repository](https://github.com/tedleyem/Ansible-sysadmin-tasks) to make it easy to download and dig in. So enjoy. 


#### Collect logs
In the trenches of troubleshooting and diagnosing server performance or application issues, you may need to gather system crash logs or general system logs. A useful idea would be to look at the days logs and check any errors, bugs, failures, or miscellaneous connections. In most scenarios, or in the cloud, monitoring tools and appliances are in place, but if you don't have access to those tools or have them setup immediately, you may need a quick and dirty solution to solve that problem. 

[Playbook](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/check_logs.yml) 
```shell
$ ansible-playbook -i inventory/hosts playbooks/check_logs.yml 
```

#### Check running services (systemd) 
[Playbook](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/check_services.yml) 
```shell
$ ansible-playbook -i inventory/hosts playbooks/check_services.yml 
``` 

#### Install or remove packages and software
Installing packages, updating packages, or removing a specific package on multiple hosts can be 
a bit of a daunting task. Sometimes you need to do that rapidly to confirm that security checks pass or 
rollback changes made to multiple systems. These playbooks/roles reduced time to install or changes and can be used for weekly system checks if needed. 
This playbook allows an repeatable and consistency way to modify packages on remote hosts 
and maintain consistency among machines. 

These roles listed below may include variables in the var/main.yml file or have them set with the [set facts module](https://docs.ansible.com/Ansible/latest/collections/Ansible/builtin/set_fact_module.html). Those can be modified based on your needs.

##### Checking connectivity to remote hosts with Ping
[Playbook](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/ping.yml) 
```shell
$ ansible-playbook -i inventory/hosts playbooks/ping.yml 
```
##### Checking checking system packages and creating a check file.  
This example installs two specific packages and versions defined in a vars file. Using ansible automation, you can install multiple packages or software faster than doing it manually. You can also use the vars file to define the version of the packages that you want to install:

[Playbook]() 
```shell
$ ansible-playbook -i inventory/hosts playbooks/check_system_packages.yml 
```

##### Checking security only package updates
[Playbook]() 
```shell
$ ansible-playbook -i inventory/hosts playbooks/system_security_check.yml 
```

##### Installing multiple packages  
[Playbook](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/system_package_install.yml) 
```shell
$ ansible-playbook -i inventory/hosts playbooks/system_package_install.yml 
```

##### For removing multiple packages  
[Playbook](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/system_package_removal.yml) 
```shell
$ ansible-playbook -i inventory/hosts playbooks/system_package_removal.yml 
```

##### For updating system packages 
[Playbook](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/system_package_updates.yml) 
```shell
$ ansible-playbook -i inventory/hosts playbooks/system_package_updates.yml 
```

#####  Security playbooks with ansible  
For checking log4j finding on a system
```shell
[Playbook]() 
$ ansible-playbook -i inventory/hosts playbooks/security/exploit_check_log4j.yml
```

##### For checking XZ finding on a system
[Playbook](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/security/exploit_check_xz_cve_2024_3094.yml) 
```shell
$ ansible-playbook -i inventory/hosts playbooks/security/exploit_check_xz_cve_2024_3094.yml
```

#### Embrace automation
Staying ready so you dont have to get ready and be effective as a sysadmin, engineer, cybersecurity analyst, and more requires you to embrace automation and encourage the use of Ansible. 
Ansible allows you to do more with less, automate the boring stuff, help teams gather data, provision servers, and more. For those who are thinking about automating tasks, finding solutions for sysadmin or cybersecurity related tasks, consider Ansible. More random ansible blogs coming soon. 

# New Repos
Writing this blog has triggered me to update my [Ansible-template repo](https://github.com/tedleyem/Ansible-template) along with the creation of this [vagrant-docker-provider-images repo](https://github.com/tedleyem/vagrant-docker-provider-images). Having a place to store the dockerfiles is helpful for when
companies decide to make changes and old server configs disappear from dockerhub or their online source repository. 

The Ansible-template repo is essentially a useful way to create a quick role that has the same [structure of a role from ansible docs](https://docs.ansible.com/Ansible/latest/playbook_guide/playbooks_reuse_roles.html#role-directory-structure). 

Running this command can acheive the same goal
```shell
$ Ansible-galaxy role init <role-name>
```
But the Ansible-template repo has a Vagrantfile in it configured to run Docker as the provisioner [(because Virtualbox and other Hypervisors don't run on M1 macbooks)](https://discussions.apple.com/thread/252982189?sortBy=best). It also has a Readme file that i prefer over the standard ansible one(all just preferences at this point). 

I also come across some useful tests in ansible because [Ansible molecule sucks](https://www.reddit.com/r/Ansible/comments/hc3cl6/any_alternatives_to_molecule_for_Ansible_testing/) and trying to stay up to date with setting up drivers has become more of a bug than a feature. 

Having to use an M1 macbook for developing scripts and testing for work and the struggles with virtualization platforms like Virtualbox not working or other things that are compatible with osX ventura has also triggered the creation of creating Vagrant tests. If you know me you know that I don't like apple products (mainly because of their price and restrictions), but sometimes my work machines are macbooks and I learn the hard way about these things. This time im writing it down and blogging about it to timestamp my frustrations for future reflection. 


# Conclusion 
These are quick and dirty playbooks for day-to-day system administration. ansible can be used for more advanced things like configuring database servers or changing config files based on changes or permissions of the files. There is definitely a larger list of things ansible can be used for that I will be blogging about. A few of them involve multi-chain deployments of packer builds and running ansible playbooks through CI/CD platforms, or provisioning [sandboxed](https://www.proofpoint.com/us/threat-reference/sandbox) VM's with ansible playbooks to provide as a product for customers in need of it, and more.  This is just a quick blog for me to throw down some tasks I have written over time that I recently had to resurrect from out of the tombs. Thanks for reading.
