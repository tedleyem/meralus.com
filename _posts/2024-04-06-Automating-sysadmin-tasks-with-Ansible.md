---
layout: post
title:  "Sysadmin tasks with Ansible"
date:   2024-04-06
excerpt: "Automating the boring stuff"
img: "blog-headers/sysadmin-tasks.png" 
project: true  
---

Since I learned about [Ansible](https://www.ansible.com/) in 2018 from [a weekend reading by](https://www.linuxjournal.com/content/weekend-reading-ansible) by [Shawn Powers](https://www.linkedin.com/in/shawnpowers/) I knew this was going to be the hammer to my IT based toolkit of daily tools. Since then I have added tools like Docker, minikube (for testing), Terraform, Packer, and a list of other technologies to my belt but Ansible holds a special place in my heart. In my career I have gone from customer support specialist, sysadmin, Linux admin, devops engineer, Linux engineer, application engineer, to Linux Software Engineer and one quote that repeats itself time and time again is this. 

``` 
"If you are doing something more than twice, automate it!"
```

If you hate performing repetitive tasks, like the rest of us, then I suggest you Learn Ansible, and learn it now! This blog wont break down what ansible is or teach you about how to use it. There are better articles out there like the one I mentioned above. This blog is about sysadmin tasks you can use to automate some daily tasks in a quick and dirty way. These are tasks to throw into your automation based jobs/pipelines/projects. It's a great tool for sysadmins because it helps you standardize daily activities like checking and reporting disk space, viewing logs, installing packages and more.

Most times these tasks require manual steps that may require multiple manual steps like connecting to different hosts or clicking a few buttons, or more. For some admins this might be okay in small environments but what if you had 10,12, or 1,200 servers you have to check? This is where ansible can come into play and help solve issues with a cluster of machines, or just a few. Ansible may seem like something that only works for sysadmins and local machines but trust and believe, through my experience, I have used ansible and have implemented into the cloud with creating AWS AMI's with packer, server and application provisioning in the cloud, and even monitoring. 


#### Everyday Struggles
Typically with manual tasks taken to resolve issues, making changes to to 2-3 servers, even when following documentation, could result in different changes on each machine due to human error. Those errors may impact future upgrades and changes to these systems and trigger errors in security and compliance based checks on systems. Ansible helps make sure that the changes made on one system, are the same changes on multiple systems. It remove the human error and allows you to remove a file, upgrade a system packages, or reconfigure a config file for a cluster of services in a load balanced web pool, or a list of databases that need logs rotated. 

I'm only going to go over a few of the tasks, in hope that they will be enough for whoever is reading this to pick and choose the tasks and use them at will, or encourage a reader to start using Ansible.
My goal with most of these playbooks is to run them on Ubuntu and Rhel distro's so these have conditional formatting to run on those machines. You can learn about [conditional formatting](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_conditionals.html) here. 


In the trenches of troubleshooting and diagnosing server performance or application issues, you may need to gather system crash logs or general system logs. A useful idea would be to look at the days logs and check any errors, bugs, failures, or miscellaneous connections. In most scenarios, or in the cloud, monitoring tools and appliances are in place, but if you don't have access to those tools or have them setup immediately, you may need a quick and dirty solution to solve that problem. Using ansible can be helpful for examples where a pool of 10 web servers need to be checked to find out which ones are throwing errors or which ones reported reboot or crash changes in their logs. 

###### quick note
A quick note aboue these roles hand how they are bundled. These roles listed below may include variables in the var/main.yml file or have them set with the [set facts module](https://docs.ansible.com/Ansible/latest/collections/Ansible/builtin/set_fact_module.html). Those can be modified based on your needs.

I put the playbooks and a few roles all into [this repository](https://github.com/tedleyem/ansible-sysadmin-tasks) to make it easy to download and dig in. So enjoy. 



##### System check playbooks
* Checking connectivity to remote hosts with Ping [Playbook Link](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/ping.yml) 


* Checking daily logs logs [Playbook Link](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/check_logs.yml) 

* Check running services (systemd) [Playbook Link](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/check_services.yml) 

* Check disk space [Playbook Link](https://github.com/tedleyem/ansible-sysadmin-tasks/blob/main/playbooks/check_disk_space.yml) 

* Check current memory usage [Playbook Link](https://github.com/tedleyem/ansible-sysadmin-tasks/blob/main/playbooks/check_memory.yml)

* Check running services [Playbook Link](https://github.com/tedleyem/ansible-sysadmin-tasks/blob/main/playbooks/check_services.yml) 

* Check sudo  [Playbook Link](https://github.com/tedleyem/ansible-sysadmin-tasks/blob/main/playbooks/check_sudo.yml)

* Check uptime of server [Playbook Link](https://github.com/tedleyem/ansible-sysadmin-tasks/blob/main/playbooks/check_uptime.yml) 

* Bulk add users [Playbook Link](https://github.com/tedleyem/ansible-sysadmin-tasks/blob/main/playbooks/user_add.yml)

* Bulk remove users [Playbook Link](https://github.com/tedleyem/ansible-sysadmin-tasks/blob/main/playbooks/user_delete.yml) 


##### Package playbooks
* Installing multiple packages [Playbook Link](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/system_package_install.yml) 

* Removing multiple packages [Playbook Link](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/system_package_removal.yml) 
 
* Updating system packages [Playbook Link](https://github.com/tedleyem/Ansible-sysadmin-tasks/blob/main/playbooks/system_package_updates.yml) 

* Checking security only package updates [Playbook Link](https://github.com/tedleyem/ansible-sysadmin-tasks/blob/main/playbooks/system_security_check.yml) 


---
##### CyberSecurity and Ansible
Recently (as in like the last 5 years) there have been a list of different vulnerabilities and exploits that may require you to check what version of a package is installed on your system and if your system is affected. These scripts can help you check and answer that kind of question in minutes. A few of the tasks will check for the most recent [XZ outbreak (CVE-2024-3094) vulnerability](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/) and the [Log4J vulnerabilities of 2021](https://www.ibm.com/topics/log4j). In writing this blog I found a great [Log4j-CVE-2021-44228 detector scanner playbook](https://github.com/lucab85/log4j-cve-2021-44228) and a new [job reporting playbook](https://github.com/jwkenney/Ansible-job-report) that I plan on adding to my mix of daily/weekly scans and checks. 
 
Staying ready so you don't have to get ready and be effective as a sysadmin, engineer, cybersecurity analyst, and more requires you to embrace automation and encourage the use of Ansible. Ansible allows you to do more with less, automate the boring stuff, help teams gather data, provision servers, and more. I'm hoping I've sold it enough by now.

#### New repo retrospective
Writing this blog has triggered me to update my [ansible-template repo](https://github.com/tedleyem/Ansible-template) along with the creation of this [vagrant-docker-provider-images repo](https://github.com/tedleyem/vagrant-docker-provider-images). Having a place to store the dockerfiles is helpful for when
companies decide to make changes and old server configs disappear from dockerhub or their online source repository can be vital to testing infrastructure that doesnt move a breakneck speeds. Not every company is moving as fast as [Nike](https://www.intelligentautomation.network/transformation/articles/nikes-digital-transformation-efforts-continue-to-win-big) or [Emerson](https://www.ni.com/en/solutions/aerospace-defense/aero-defense-digital-transformation.html?cid=PSEA-7013q000001fK2yAAE-CONS-GOGSE_100887348866&utm_keyword=digital%20transformation&gad_source=1&gclid=Cj0KCQjwq86wBhDiARIsAJhuphn2vrzYtG2OBWa3J43bfTBfqGBHYlBfp2c_7LBXggiExk7qZDez7WwaAhbHEALw_wcB). 

The ansible-template repo is essentially a useful way to create a quick role that has the same [structure of a role from ansible docs](https://docs.ansible.com/Ansible/latest/playbook_guide/playbooks_reuse_roles.html#role-directory-structure). However, this repo has a Vagrantfile in it configured to run Docker as the provisioner [(because Virtualbox and other Hypervisors don't run on M1 macbooks)](https://discussions.apple.com/thread/252982189?sortBy=best). I tend to come across some useful tests in ansible and keep them here because [ansible molecule sucks](https://www.reddit.com/r/Ansible/comments/hc3cl6/any_alternatives_to_molecule_for_Ansible_testing/) and trying to stay up to date with setting up drivers has become more of a bug than a feature.

Having to use an M1 macbook for developing scripts and testing for work and the struggles with virtualization platforms like Virtualbox not working or other things that are compatible with osX ventura has also triggered the creation of creating Vagrant tests. If you know me you know that I don't like apple products (mainly because of their price and restrictions), but sometimes my work machines are macbooks and I learn the hard way about these things. This time im writing it down and blogging about it to timestamp my frustrations for future reflection. 


### Conclusion 
These are quick and dirty playbooks for day-to-day system administration. Ansible can be used for more advanced things like configuring database servers or changing config files based on changes or permissions of the files. There is definitely a larger list of things ansible can be used for that I will be blogging about. A few of them involve multi-chain deployments of packer builds and running ansible playbooks through CI/CD platforms, or provisioning [sandboxed](https://www.proofpoint.com/us/threat-reference/sandbox) VM's with ansible playbooks to provide as a product for customers in need of it, and more.  This is just a quick blog for me to throw down some tasks I have written over time that I recently had to resurrect from out of the tombs. Thanks for reading.



```
If you wondering if learning about automation is important while trying to break into the IT industry I'll leave you with this. 

“You’re either the one that creates the automation or you’re getting automated.”
```