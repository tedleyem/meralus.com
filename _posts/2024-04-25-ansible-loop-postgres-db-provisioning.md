---
layout: post
title:  "Postgres Provisioning with Ansible" 
date:   2024-04-25
excerpt: "ansible role to create a postgres db"
img: "blog-headers/ansible-postgres-love.png" 
project: true  
---

At one point a few years back I had to take ownership of a project that I only heard about. 
The week before I was told there was a postgres related project that required setting up a postgres server 
to provision and work properly based on a customers answers to a questionnaire, in an isolated environment. 
I learned that sandboxed servers are VM's that are isolated from networks for specific reasons. 
They can be black box servers used for testing, they can be servers spun up in a data center in the middle of the ocean or not close enough to popular cities with easy physical access. 
The company I worked for delivered top of the line audio and video equipment to other larger companies. 
The application that this postgres server was running was an app to help service the devices 
and manage them. 
The app would dump data into postgres related to serial numbers, firmware versions, names of device locations, 
and other things like that. A few listed tables and schemas needed to be preconfigured in this database for specific devices to work. 
This could be easily managed if you can login to AWS, connect to the running postgres instance, and run some posgres commands to backup, restore, create a new database, and dump the data if needed, but for these "sandboxed" machines that wont be the case. 

With all that being said these sandboxed instances had requirements that demanded tables and names
setup beforehand. Noe one on the team knew of a way to do this WHILE tring to containerize the database with docker compose. 

Because docker and ansible are my hammer and nail I decided to create an ansible playbook that a user can run
to setup the database. This playbook asked a list of questions that would determine the name of the database, 
the locale, password, users, and other database specfic things. I wish I could show more of that without sharing 
the specifics of the application, but I can't. However, I decided to rebuild the project with some dummy questions and dummy data to show some cool things ansible can do. 

### Some of these key features are 
* Create a questionnaire and use the responses as variables to configure a database
* Provision a database with or without docker with just a variable 
* draft up a quick way to spin up postgres
* utilize ansible to create a scripted way to provision the backend of an application

I would like to note that this was a project was very specific and probably not a use case 
that would  warrant many forks, likes, or pull requests. However, it was fun, it solved a problem, and it got me some recognition at work. All things that make working with ansible and Linux fun at work. 

Full project source code can be [found here](https://github.com/tedleyem/ansible-role-postgresql-blog). Updates to this project will happen over time. This week has been a busy week with work and scripting so I'm sure some fine tuning to these yaml files will be needed in the future. 


---
# CREDITS 
Much credit goes out to Jeff. The role was inspired by Jeff Geerling's [postgresl role](https://github.com/geerlingguy/ansible-role-postgresql). I made the necessary tweaks 
to express the small points made in the blog. Sharing the example for fun.

More information on the ansible modules used can be found here. 

* [Ansible interactive input prompts](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_prompts.html)
* [Ansible set facts module](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/set_fact_module.html)
* [Jinja 2 templating](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_templating.html)



