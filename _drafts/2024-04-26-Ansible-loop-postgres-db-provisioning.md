---
layout: post
title:  "Postgres Provisioning with Ansible" 
date:   2024-04-26
excerpt: "ansible role to create a postgres db"
img: "blog-headers/ansible-postgres-love.png" 
project: true  
---

At one point a few years back I had to take ownership of a project that I only heard about. 
The week before I was told there was a postgres related project that required setting up a postgres server 
to provision and work properly based on a customers answers to a questionnaire, in an isolated environment. 
I learned that sandboxed servers are VM's that are isolated from networks for specific reasons. They can be black 
box servers used for testing, they can be servers spun up in a data center in the middle of the ocean or not close enough 
to popular cities with easy physical access. The company I worked for delivered top of the line audio and video equipment 
to other larger companies. The application that this postgres server was running was an app to help service the devices 
and manage them. The app would dump data into postgres related to serial numbers, firmware versions, names of device locations, 
and other things like that. A few listed tables and schemas needed to be preconfigured in this database for specific devices to work. 
This could be easily managed if you can login to AWS, connect to the running postgres instance, and run some posgres commands to backup, restore, 
create a new database, and dump the data if needed, but for these "sandboxed" machines that wont be the case. 

With all that being said these sandboxed instances had requirements that demanded tables and names
