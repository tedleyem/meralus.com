---
layout: post
title:  "Vagrant and M1 macbook development"
date:   2024-04-25
excerpt: "testing ansible playbooks with vagrant"
img: "blog-headers/vr-movie.jpg" 
project: true  
---
I've recently started at a new job, and I'm fortunate enough to have been given a new M1 Macbook. However, my testing I typically do is linux based. My personal laptops are all ubuntu machines along with my wifes computer, an older macbook. Stepping into this new job I figured it would be easy to use homebrew and download all my tools and get up and running, and boy was I wrong. 

I have found that the most efficient way to create VM's is to create them automatically through code, so its repeatable and simple. This is where Vagrant comes into play. Vagrant is an open-source tool used for creating and managing virtual development environments. It provides a simple and portable way to create and configure virtual machines (VMs) with predefined configurations, making it easier to set up and manage development environments for software projects.

The first thing I noticed after writing my first ansible playbook is that I couldn't install virtualbox to create and test the playbook against multiple machines. [Virtualbox doesn't support Apple Silicon](https://discussions.apple.com/thread/252982189?sortBy=best). With my experience with Linux professionally and personally over the years this isnt my first roadblock. nor will it have me complain about "Windows does it better" like most of my colleagues at my new job. I decided to switch the provider to Docker for now and get that working. 

#### Docker and Vagrant 
Docker and Vagrant have very different philosophies about how you should run your development setup. Docker's ideal is a minimalist setup, with just enough to run the single process you need. If you want more processes, Docker wants you to create more containers. Vagrant prefers a maximalist style, install everything on the one virtual machine and get it all going together.

To get Docker going you'll need a Dockerfile this describes the setup needed to create the Docker container. For our Docker container to be friends with Vagrant we're going to configure it as if its a traditional linux machine. By default you'll need at least sshd (which lets you SSH into the machine). I also needed systemd (which runs services). This is very much not how you should do Docker normally.

--- 
https://medium.com/@iamzamartech/create-and-manage-vms-with-vagrant-on-mac-m1-chip-d8b85eed082e

https://dev.to/taybenlor/running-vagrant-on-an-m1-apple-silicon-using-docker-3fh4
Here's the Dockerfile I used:
# Docker image to use with Vagrant
# Aims to be as similar to normal Vagrant usage as possible
# Adds Puppet, SSH daemon, Systemd
# Adapted from https://github.com/BashtonLtd/docker-vagrant-images/blob/master/ubuntu1404/Dockerfile

FROM ubuntu:18.04
ENV container docker
RUN apt-get update -y && apt-get dist-upgrade -y

# Install system dependencies, you may not need all of these
RUN apt-get install -y --no-install-recommends ssh sudo libffi-dev systemd openssh-client

# Needed to run systemd
# VOLUME [ "/sys/fs/cgroup" ]
# Doesn't appear to be necessary? See comments

RUN apt-get -y install puppet

# Add vagrant user and key for SSH
RUN useradd --create-home -s /bin/bash vagrant
RUN echo -n 'vagrant:vagrant' | chpasswd
RUN echo 'vagrant ALL = NOPASSWD: ALL' > /etc/sudoers.d/vagrant
RUN chmod 440 /etc/sudoers.d/vagrant
RUN mkdir -p /home/vagrant/.ssh
RUN chmod 700 /home/vagrant/.ssh
RUN echo "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA6NF8iallvQVp22WDkTkyrtvp9eWW6A8YVr+kz4TjGYe7gHzIw+niNltGEFHzD8+v1I2YJ6oXevct1YeS0o9HZyN1Q9qgCgzUFtdOKLv6IedplqoPkcmF0aYet2PkEDo3MlTBckFXPITAMzF8dJSIFo9D8HfdOV0IAdx4O7PtixWKn5y2hMNG0zQPyUecp4pzC6kivAIhyfHilFR61RGL+GPXQ2MWZWFYbAGjyiYJnAmCP3NOTd0jMZEnDkbUvxhMmBYSdETk1rRgm+R4LOzFUGaHqHDLKLX+FIPKcF96hrucXzcWyLbIbEgE98OHlnVYCzRdK8jlqm8tehUc9c9WhQ==" > /home/vagrant/.ssh/authorized_keys
RUN chmod 600 /home/vagrant/.ssh/authorized_keys
RUN chown -R vagrant:vagrant /home/vagrant/.ssh
RUN sed -i -e 's/Defaults.*requiretty/#&/' /etc/sudoers
RUN sed -i -e 's/\(UsePAM \)yes/\1 no/' /etc/ssh/sshd_config

# Start SSH
RUN mkdir /var/run/sshd
EXPOSE 22
RUN /usr/sbin/sshd

# Start Systemd (systemctl)
CMD ["/lib/systemd/systemd"]
If you don't need systemd in your setup then you can remove that and change the RUN of sshd to:
CMD ["/usr/sbin/sshd", "-D"]
All of this sets up a Docker container which doesn't work like a regular Docker container. It runs more like a virtual machine. This means it will be difficult to manage using the normal Docker commands. Once you take it down it will also be difficult to get up again. Best to control it with Vagrant. I've had to delete the container and re-create it with Vagrant many times.

Vagrant is pretty easy to configure
To get Vagrant running using your Dockerfile you just need to add a little bit of configuration:
Vagrant.configure(2) do |config|

# ... your existing config

  # Custom configuration for docker
  config.vm.provider "docker" do |docker, override|
    # docker doesnt use boxes
    override.vm.box = nil

    # this is where your Dockerfile lives
    docker.build_dir = "."

    # Make sure it sets up ssh with the Dockerfile
    # Vagrant is pretty dependent on ssh
    override.ssh.insert_key = true
    docker.has_ssh = true

    # Configure Docker to allow access to more resources
    docker.privileged = true
  end

# ...

end
You may need to override some other settings here. The override variable allows you to change top-level settings, while the docker variable allows you to setup docker-specific stuff. Have a read of the vagrant docker provider and vagrant docker provisioning documentation.

Once you've set this up, you can run your Vagrant machine with:
$ vagrant up --provider=docker
And if you need to do extra things inside the machine, you can ssh in with:
$ vagrant ssh
You should have sudo access as well if you need it.

Vagrant doesn't like to run multiple boxes
When I first ran Vagrant, before I realised Virtualbox wouldn't work it started and then failed. Then when I tried to run vagrant with the Docker provider it gave me errors about not having multiple boxes. I also couldn't delete my box because virtualbox wasn't running.

You can just delete the files in .vagrant to resolve that. It seems like Vagrant doesn't have a good way of resolving this itself.

You can re-provision Vagrant
Sometimes I found my setup would break, in my case it wasn't too hard to just run the Vagrant provisioning script again.
$ vagrant up --provision
Once that was complete some of my issues got resolved. It's not a good idea to blindly do this, but in my case I'm just trying to get it running.

Docker's public network bridge feature is broken
It doesn't seem to work on Mac! So if your Vagrant config has something like:
config.vm.network "public_network"
Try to see if you can replace it with:
config.vm.network "private_network", type: "dhcp"
In my case this substitution was sufficient, but you may have other requirements.

Your linux binaries need to be arm64
I ran into some issues because our provisioning scripts assumed that the architecture of the system would be amd64 (Intel and AMD 64-bit processors). It was a pretty safe bet that the CPU was amd64 up until Apple introduced their M1 chip!

Running linux on the M1 chip uses the arm64 architecture instead. As a handy shortcut you can get the architecture of the current machine in linux with:
$ dpkg --print-architecture
I used this in shell scripts by setting a variable:
readonly ARCH=`dpkg --print-architecture`
And then substituting that in when binaries were downloaded and installed, usually that was relatively simple, e.g.:
wget http://somedomain.com/some_binary_linux_amd64.zip
Became
wget "http://somedomain.com/some_binary_linux_${ARCH}.zip"
I learned a lot - but I still don't know much
I learned a lot about Docker (and how not to do things) Vagrant (and how to hack it) and some various linux tricks trying to get this all working. However I'm very much not a linux, Docker or Vagrant person, I'm just trying to make things work. So if I've written anything here horribly wrong, or extremely misguided, please throw down a comment.

If this helped you I'd love to hear it! I got stuck googling around for how to do this, and I imagine there are other people out there in the same boat.



# hiccups 
https://github.com/tedleyem/ansible-template



- [ ] write about ansible testing and why Vagrant and M1 macbook
    https://www.ansible.com/blog/developing-and-testing-ansible-roles-with-molecule-and-podman-part-1 ----
    Testing Ansible Roles with Docker
    https://www.ansible.com/blog/testing-ansible-roles-with-docker
    Molecule 
    https://ansible.readthedocs.io/projects/molecule/examples/docker/
    Testing Ansible Automation with Molecule 
    https://medium.com/contino-engineering/testing-ansible-automation-with-molecule-pt-1-66ab3ea7a58a
    Introducing Ansible Molecule with Ansible Automation Platform
    https://developers.redhat.com/articles/2023/09/13/introducing-ansible-molecule-ansible-automation-platform#


