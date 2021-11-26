---
layout: post
title: "Out with the old, in with the Nagios?"
date: 2020-07-17
excerpt: "Setting up Nagios"
tags:
---
## Taking a modern day approach to managing a classic application

I have to admit I learned about Nagios about a decade after its initial release. In a sprint of learning new technologies in my previous job I had to learn how to navigate through Nagios and understand why it was being used and what it was being used for.
To understand what Nagios core is: Nagios provides enterprise-class Open Source IT monitoring, network monitoring, server and applications monitoring.

To break things down it is the essential server monitoring tool created in 2002. It has been "replaced" by many other tools that have plenty of features and options for backups, data manipulation, and others... but Nagios works. For the services provided with Nagios core, it works for many modern day networking practices. We were able to check connection settings and availability of servers using nagios and alert us via text or email if servers crashed or went down.
In the midst of learning that I was tasked to move the Nagios platform from a redhat 6 server to a centos 7 server. In that project came the question of how to take the old and outdated Nagios application and put it on a new server. Will it still work properly. Will it be easy to manage and should  we look for a new solution?

I just spent hours learning about Nagios and having to go into researching something new and setting up something brand new would be too time consuming at this point. I had to build out Nagios and make sure it can be managed in a modern day approach. I needed to make sure it could be backed up and saved, and use the new applications that I had setup within the networking environment (those things being ansible, Git,and jenkins.)

My first thoughts when building it out were 1. There has got to be a better way to migrate all of this without breaking things 2. There has got to be a plan for the next upgrade cycle. 3. There must be a way to save the config files. My answer became a multipart solution. Using Git to save personal config files, using Ansible to deploy it to a new server, and running Ansible playbooks through jenkins to maintain Nagios.

Git is the perfect tool to save the config files and manage the changes of the files to make sure that, if your monitoring server crashes and cant be restored, there is a location where the files are saved.

Ansible allowed me to manage the OS arc and deployment steps on downloading the proper dependancies, nagios plugins, and other requirement for setting up a nagios container. [This playbook](https://Github.com/tmeralus/ansible-role-nagios-server) was a helpful start to show how others setup and deploy nagios through Ansible. The original playbook was forked from [here](https://Github.com/sadsfae/Ansible-nagios) and thus became its own monster. In the short amount of time I had I chose to tweak the playbook to my liking. Using Ansible allowed me to make changes to Nagios hosts or contact settings in nagios without having to go into the Nagios server itself.  Managing Nagios and restarting or stopping it to configure the changes could now be done running an Ansible playbook saved in Github.

Now instead of worrying about all the possible locations or connected config files in a linux server I knew where they all were. Years from now if we have to upgrade from CentOS 7 to 8 or to a debian based Ubuntu distro I'm less worried about rsyncing data from one box to another and more focused on running the playbook and getting going in no time.

Jenkins, being the automation and deployment platform allowed me to apply changes to nagios and push them to the github repo I created. Jenkins would then see those changes and trigger ansible playbooks I setup to update, restart, or stop nagios temporarily so that changes can be made in a controlled matter.

Using the knowledge I had with Ansible, Jenkins, and Git allowed me to take an old Nagios platform and use with a more modern day approach. The old approach of pulling the tar file from nagios and trying to untar and configure the perl scripts from scratch is now a thing of the past. Managing Nagios by accessing the server and navigating to the files, making copies, and then restarting nagios has now become a Jenkins freestyle job that I can test before pushing full changes for nagios. I've taken out the old methods of managing the software and gave it a new spin. Future admins who will take my place will have documentation and git changes to go through to help with updating and manaing multiple linux server and network devices using the new/old.... vintage Nagios.

I will write be writing more blogs about how to use Jenkins, how to run the ansible playbook, and how to setup up the entire environment soon. For now, like Nagios, we will keep in classy.

# TLDR (Too Long Didn't Read)
I found new ways to manage an outdate, but very useful monitoring platform using Ansible, git, and jenkins.

## Ansible Playbook
[Link:](https://Github.com/tmeralus/ansible-role-nagios-server) was a helpful start to show how others setup and deploy nagios through Ansible. The original playbook was forked from [here](https://Github.com/sadsfae/Ansible-nagios)


## Nagios Docker Container Setup
[Link:](https://github.com/tmeralus/docker-nagios-setup)

## Jenkins Demo project
[Link:](https://github.com/tmeralus/jenkins-build-projects.git)
login information
username: guest
password: guest

Jenkins Jobs:
