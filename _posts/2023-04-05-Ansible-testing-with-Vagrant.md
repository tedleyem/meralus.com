---
layout: post
title:  "Ansible testing with Vagrant" 
date:   2023-04-022
excerpt: "2023 project list"
img: "blog-headers/ansible-and-Vagrant.png" 
project: true  
---
 
 https://blog.keyboardinterrupt.com/testing-ansible-with-vagrant/
 
 
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

## Setting Up VirtualBox 
First we need to install VirtualBox and Vagrant, head over to the Vagrant Download Page, download and install the Package matching your Operating System and Architecture. Ubuntu/Linux Mint users can use the Debian package, OsX users can use the dmg packages if its still available or homebrew, Windows users...should switch a more Unix based system, or download it the way they have available. In this article I will be strictly talking about using Virualbox because thats my virtual provider of choice. 

After installing Vagrant your going to need to install a supported Version of VirtualBox. For most linux distributions this can be done easily via package management (example: on Ubuntu you can run the command sudo apt install virtualbox to install VirtualBox).

You can check the version of an installed VirtualBox by starting VirtualBox and navigating the the top menu in the navigation bar and go to Help --> About VirtualBox.... This will open an information window where you can find the version of your VirtualBox installation.

VirtualBox---About


With Vagrant and virtualbox installed you can now pull one of my ansible-roles on github. 
For the sake of this article you can use the [ansible-role-redis](https://github.com/tmeralus/ansible-role-redis) repo. 



Now that we installed Vagrant and VirtualBox lets talk about the Ansible Provisioner in the Vagrantfile where all the magic happens..  

Creating a Vagrantfile with the vagrant init command should results in a Vagrantfile containing the following config (commented lines redacted). 


```
required_version ">= 1.8.0"
# Defining a New VM named server and assign to a variable named dev
config.vm.define "virtualbox" do |dev| 
    # Set the hostname of the VM 
    dev.vm.hostname = "devbox-ansible"
     
    # Set the box (OS) for the Virtual machine, we use centos7 
    dev.vm.box = "geerlingguy/ubuntu2004" 
    
    dev.vm.memory = "2048"
    # Port forwarding configuration as per our requirement 
    #dev.vm.network "forwarded_port", guest: "80", host: "8080" 
    
    # Creating a Shared Directory between host and guest VM 
    #dev.vm.synced_folder "/apps/shared", "/shared" 
    
    # Provision the webserver with Ansible, Execute the playbook 
    
    dev.vm.provision "ansible" do |ansible| 
    ansible.verbose = "v"

    # Mention the fully qualified path and name of playbook. 
    # If no path mentioned, vagrant will take the base directory where Vagrantfile resides  
    ansible.playbook="playbook.yaml" 
    end 
end

```


Vagrant is able to define and control multiple guest machines per Vagrantfile. This is known as a "multi-machine" environment.


This Vagrantfile can only be used to spin up a single virtual machine based on the a config.vm.box parameter that needs to be added. This cna be added under line one. 

Vagrant.configure("2") do |config| starts the Vagrant configuration block and specifies that the Vagrant version 2 is used, this is default for all Vagrantfiles and we don't need to mess with that line. 
The second line config.vm.box = "base" specifies the Base Image used for the Creation of the virtual machine and the last line,
end closes the configuration block started on the first line.

############################
############################
############################


STOPPING POINT 
https://blog.keyboardinterrupt.com/testing-ansible-with-vagrant/


############################
############################
############################


This Vagrantfile can only be used to spin up a single virtual machine based on the a config.vm.box parameter that needs to be added. This cna be added under line one. These are examples of setting up a new Vagrantfile. 

 kbi/ubuntu16.04 Base Image, we could use this machine with Ansible by targeting it by its IP Address but this would be inconvenient as the IP address changes every time we rebuild the Box with vagrant destroy && vagrant up.
Instead we can create a Playbook that gets provisioned onto the vagrant box automatically whenever it is freshly built via vagrant up or when we run the vagrant provision command.
For that we add a provision section to our Vagrantfile and specify a Playbook.


Vagrant.configure("2") do |config|
  config.vm.box = "kbi/ubuntu16.04"
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
  end
end

For demonstration purpose we create this very basic playbook.yml inside the working directory:

---
- hosts: all
  tasks:
  - debug:
    msg: "Hello World"

Whenever we run vagrant provision now, the Ansible provisioner will be applied, and thus the playbook.yml will be provisioned onto the virtual machine. The same will happen whenever we create the virtual machine with vagrant up.

    The Ansible Provisioner is not the only available provisioner, we could also use the Shell provisioner to run shell commands every time the Box gets provisioned or other configuration managers like Puppet.

Now that we know how to integrate Ansible into Vagrant we can start playing around by expanding our playbook.yml. In example we could add more tasks, variables or include roles and start provision them onto the virtual machine in a automated and reproducible way.
Testing Ansible roles with Vagrant

Ok so how can we use Vagrant and the Ansible provisioner to develop and test Ansible roles?

For demonstration purpose we will create a simple role that does the following:

    installs Apache2
    deploys a simple Hello World Site

To spice things up a little, we will create our role so it works both with Ubuntu and Centos so we have to take the differences between the two into account.

Our tests should do the following:

    provision the role onto a VM running Ubuntu 16.04
    provision the role onto a VM running Centos7
    test if the Hello World site can be accessed locally

Setup a new role with a Vagrant based test

First we will set up our environment
 

This is a good starting point for our new role, now wee need to create a Vagrantfile inside the hello-world/tests directory. For that we run the command vagrant init to create a basic Vagrantfile.
 
We will then replace the content of the generated Vagrantfile with this:

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  boxes = [
    { :name => "ubuntu-hello-world-box", :box => "kbi/ubuntu16.04" },
    { :name => "centos-hello-world-box", :box => "kbi/centos7" }
  ]
  boxes.each do |opts|
    config.vm.define opts[:name] do |config|
      config.vm.box = opts[:box]
      if opts[:name] == boxes.last[:name]
        config.vm.provision "ansible" do |ansible|
          ansible.playbook = "test.yml"
          ansible.limit = "all"
        end
      end
    end
  end
end

Ok, this looks a little more complicated than the Basic Example shown in the beginning so lets break it down a little.

First we define a list named boxes containing the basic Informations of our virtual machines, the name and the Base Image used for the Box.

boxes = [
  { :name => "ubuntu-hello-world-box", :box => "kbi/ubuntu16.04" },
  { :name => "centos-hello-world-box", :box => "kbi/centos7" }
]
...

After that we have a Loop that iterates over the boxes list and creates the virtual machines,

boxes.each do |opts|
  config.vm.define opts[:name] do |config|
    config.vm.box = opts[:box]
    ...
  end
end

and if the last box has been built, the Ansible Provisioner is told to Provision the Playbook test.yml onto all hosts.

...
    if opts[:name] == boxes.last[:name]
      config.vm.provision "ansible" do |ansible|
        ansible.playbook = "test.yml"
        ansible.limit = "all"
      end
    end
...

This rather complicated loop method is used, so we can ensure that the Ansible provisioning is only run once, and only after the last machine has been built.

For the provisioning to work we need said test.yml to contain a valid Playbook, in our case the test.yml Playbook must look like this:

---
- hosts: all
  become: yes
  roles:
    - ../../.

    If you run vagrant up or vagrant provision from inside the tests directory, this Playbook will include the hello-world role by using the relative path ../../. and provision it onto the virtual machines.

From now on we can add Stuff to our hello-world role and test the provisioning on both Ubuntu16.04 and Centos7 by running the vagrant provision command or if we want to, we can easily recreate the Whole environment by running the two commands vagrant destroy and vagrant up sequentially.

If you just wanted to run the provisioning on a specific VM you can pass the name of that VM to the provision command like this vagrant provision ubuntu-hello-world-box or vagrant provision centos-hello-world-box.
Developing the hello-world role

In this Section we will start developing the role, and I encourage you to run the Vagrant command vagrant provision after every change you made to the role, this way you will see whenever something is not working as expected. Naturally if you copy and Paste the Snippets correctly, the provisioning will probably not fail, so i encourage you to type the snippets by hand and add Errors deliberately from time to time, to see how vagrant provision behaves when it encounters a problem with the role.

    disclaimer:
    This role is kept as simple as possible for Demonstration purpose, if you need examples for Apache2 role take a look at the available roles in the Ansible Galaxy.

First we need to add tasks to our role that install the packages needed for Apache2. The Problem is that Ubuntu and Centos use different package management systems and the packages that must be installed are named differently.

To work around this Issue we will create two tasks, one for each target distribution and add conditions to them which will ensure they are only run on the correct platform.

On Ubuntu the Apache2 package is named apache2 and the on Centos it is named httpd.
The package management module used for Debian based distributions, like Ubuntu, is apt and the package management module used for RedHat based distributions, like Centos, is yum.

Create these two tasks in the hello-world/tasks/main.yml file...

---
- name: Install Apache2 packages on Redhat based Systems
  yum:
    name: httpd
    state: installed
  when: ansible_os_family == "RedHat"
  notify: restart httpd

- name: Install Apache2 packages on Debian based Systems
  apt:
    name: apache2
    state: installed
  when: ansible_os_family == "Debian"
  notify: restart apache2

... and add the specified handlers in hello-world/handlers/main.yml

---
- name: restart httpd
  service:
    name: httpd
    state: restarted
    enabled: yes

- name: restart apache2
  service:
    name: apache2
    state: restarted
    enabled: yes

These tasks ensure the Apache2 packages are installed correctly on either a Debian or RedHat based System and the handler ensure that the Service gets restarted and enabled when the package is installed.

You can easily test this by running vagrant provision inside the tests directory.

Next we want to deploy our Hello World site.

For that purpose we will create a Jinja2 template named hello.html.j2 with the following content in the templates directory.

hello-world/templates/hello.html.j2

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World on {{ ansible_distribution }}</h1>
    </body>
</html>

And add the task, to deploy the template, to the hello-world/tasks/main.yml

- name: Deploy the Hello World site
  template:
    src: hello.html.j2
    dest: /var/www/html/hello.html

That is all there is to our role, three tasks, two handlers and a template, to clean things up a little we delete some of the skeleton directories and Files created by the ansible-galaxy init command inside the hello-world directory.

rm -r defaults files meta vars

Before we call it a day though, we should destroy our vagrant environment and rebuilt it from scratch, to make ensure the provisioning works.

vagrant destroy
vagrant up

Okay, so The provisioning does not result in errors, that is great news, but we did not actually function test the Apache2 Server and Hello World site. For that want to add a few Task to our test.yml Playbook that check just that.

The new test.yml could looks like this:

---
- hosts: all
  become: yes
  roles:
    - ../../.
  tasks:
    - name: Flush the Handlers
      meta: flush_handlers

    - name: HTTP Check if hello.html exists
      uri:
        url: http://127.0.0.1:80/hello.html
      register: http_response

    - name: Debug output
      debug:
        msg: "{{ http_response }}"

    - name: Check the Statuscode of the http_response is 200
      fail:
        msg: Something went wrong :/
      when: http_response.status != 200

Okay, now Tear down the Vagrant environment again and Rebuild it one more time to actually see the Function tests succeed.

vagrant destroy
vagrant up

And just to ensure that our role is idempotent, run vagrant provision, no changes should be made on the second run.

Now that you have learned the basics of how Vagrant can be used in the Ansible role development process, lets try to extend our Vagrantfile a little and add a Debian Machine to the Mix. For that you only need to add another item to the boxes List containing the Name of the new box,as well as the Base Image that should be used.

  boxes = [
    { :name => "ubuntu-hello-world-box", :box => "kbi/ubuntu16.04" },
    { :name => "debian-hello-world-box", :box => "kbi/debian9" },
    { :name => "centos-hello-world-box", :box => "kbi/centos7" }
  ]

If you now tear down and rebuild the Vagrant environment, Vagrant will spin up three virtual machines and apply the role, as well as a basic function test, to all of them.
Sourcecode on GitHub

You can find the code for the two examples used in this article on GitHub,
Feel free to clone fork, and do whatever you want with the repository.
If you have other great examples, you can even enhance it by sending a PR.
Reading and learning material

I encourage you to play around with what we have built so far, break it, this way you will quickly discover how useful testing the role via vagrant can be i.e. you could add Suse Linux to the distributions the role should be tested on. this will surely break, as Suse Linux uses another package management system entirely.

Vagrant in combination with Ansible can be used in multiple ways, this article merely scratches the surface of what is possible, I recommend you visit the following Links if you want more Information on the Topic.

    https://www.vagrantup.com/docs/
    http://docs.ansible.com/ansible/latest/guide_vagrant.html
    https://www.vagrantup.com/docs/provisioning/ansible.html

Ansible Vagrant testing VirtualBox Featured
Theme Bleak by zutrinken Published with Ghost
