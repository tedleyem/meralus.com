---
layout: post
title:  "Ansible testing with Vagrant"
date:   2023-04-22
excerpt: "2023 project list"
img: "blog-headers/ansible-and-Vagrant.png"
project: true
---


# Using Vagrant for Ansible testing
Ansible has been updated so frequently that using tools like Vagrant for testing may have been deprecrated for more native approaches with Molecule. I could be wrong but feel free to read this article and try Vagrant as a solution. My goal here is to describe why I use Vagrant for testing new ansible roles and how you can make your development environment a bit easier by merging the two technologies.

Vagrant, a development tool created by Hashicorp, is a tool used for building, destroying, recreating and managing virtual machines and development environments with a focus on automation. In using Vagrants Ansible Provisioner it can be used for testing Ansible Playbooks and roles.

Let me break down its use case and benefits.

### Why use Vagrant?

Vagrant is a platform independent way for spinning up and managing virtual machines and development environments. I say independent, however, it does require using a supported provider like virtualbox, Hyper-V, and Docker. Vagrant allows people the ability to quickly spin up a local virtual machine environment that looks and behaves just like your local environment, or even a production environment. As a result of that, there are less issues and and configuration drift. If your looking to test an ansible playbook with a very specific Ubuntu or RedHat virtual environment, Vagrant boxes can be the best way to quickly do that. If the wrong environment was created Vagrant can also quickly destroy and rebuild virtual machines in your development and testing environments. This makes it easy to spin up and apply test playbooks against them.

``` vagrant destroy & vagrant up ``` are two quick commands that can be used for recreating and deploying Playbooks onto it. Being able to repeatedly do this in can ensure that your playbook works as intended and can help you catch issues before pushing or publishing changes to share with others.

## Ansible Molecule and its shortcomings.
Ansible molecule is built into a Docker image and is specific to Docker. With that being said Molecules shortcomings include things like Non-Privileged user accounts, Root user issues, and any systemD related tasks or issues. In 2018 I ran into quite a few changes in repeatable tasks that switched from init.d scripts to systemd commands. This commonly occured when upgrading packages like apache tomcat or old java related applications. Because Docker does not use systemD, throws errors when testing networking, and testing volume mounts, I found Vagrant as a solution for all of that. While using VirtualBox as a provider it gives me a headless approach to spinning up a virtual machine and staying in my terminal window.

Vagrant supports multiple providers, like VirtualBox, Hyper-V, VMware (Fusion and Workstation), Docker or libvirt (via third party Plugin), which makes it easy to use in Windows, Mac, or Linux. With this being platform agnostic, it makes it a breeze to pick up quickly and use as a sandbox for testing all types of scenarios, even the ones that can be run with molecule.

## Setting Up Vagrant
First we need to install Vagrant with VirtualBox as the hypervisor, [head over to the Vagrant Download Page, download and install the Package matching your Operating System and Architecture](https://developer.hashicorp.com/vagrant/docs/installation). Ubuntu/Linux Mint users can use the Debian package, OsX users can use the dmg packages if its still available or homebrew, Windows users... should switch a more Unix based system, or download it the way they have available.

After installing Vagrant your going to need to install a supported Version of VirtualBox. For most linux distributions this can be done easily via package management (example: on Ubuntu you can run the command sudo apt install virtualbox to install VirtualBox).

You can check the version of an installed VirtualBox by starting VirtualBox and navigating the the top menu in the navigation bar and go to Help --> About VirtualBox.... This will open an information window where you can find the version of your VirtualBox installation.


###### TEST Ansible Playbook
Now that we installed Vagrant and VirtualBox lets talk about the Ansible Provisioner in the Vagrantfile where all the magic happens..
For the sake of this article you can use the [ansible-role-redis](https://github.com/tmeralus/ansible-role-redis) playbook I wrote.


###### The Vagrantfile
The Vagrantfile in this repo should look as follows and allow you to test this role in a virtual environment that mimmicks a robust linux
server. Ansible molecule uses provisioners like docker to spin up and test ansible code, however it comes with limitations. Docker can be considered

```
required_version ">= 1.8.0"
config.vm.define "virtualbox" do |dev|n
    dev.vm.hostname = "devbox-ansible"
    dev.vm.box = "geerlingguy/ubuntu2004"

    dev.vm.provision "ansible" do |ansible|
    ansible.verbose = "v"
    ansible.playbook="playbook.yaml"
    end
end
```


Vagrant in combination with Ansible can be used in multiple ways, this just  scratches the surface of what is possible, I recommend you visit the following Links if you want more Information on the Topic.

    https://www.vagrantup.com/docs/
    http://docs.ansible.com/ansible/latest/guide_vagrant.html
    https://www.vagrantup.com/docs/provisioning/ansible.html

Ansible Vagrant testing VirtualBox Featured
Theme Bleak by zutrinken Published with Ghost
