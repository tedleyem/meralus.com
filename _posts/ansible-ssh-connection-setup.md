---
layout: post
title:  "Ansible and handshakes"
date:   2024-04-24
excerpt: "when two servers meet"
img: "blog-headers/ssh-handshakes.png" 
project: true  
---
 
 

SSH connection
Before we get started, we need to understand how Ansible communicates with remote machines over SSH.

By default, Ansible 1.3 and later will try to use native OpenSSH for remote communication when possible.

Ansible, by default, assumes we're using SSH keys.

Ansible has a default inventory file (/etc/ansible/hosts) used to define which remote servers it will be managing. Our public SSH key should be located in authorized_keys on remote systems.

On my desktop, I'm logged in as a user k, and I want to login to aws instance with same user name.



If we insist on using existing user name (most likely "ubuntu") which we access the AWS instance, we can do it by specifying the user name when we issue Ansible command "-u username". If that's what we want to, we still can follow the steps described below.

Basically, we should give our public key to the AWS instance: append "id_rsa.pub" to "/home/username/.ssh/authorized_keys" file (we may well see public key pair of *.pem file already there). For example, for an instance we created with a key pair name, myKey:

$ ssh -i /Users/khong/.ssh/myKey.pem ec2-user@ec2-3-93-147-99.compute-1.amazonaws.com
Warning: Permanently added 'ec2-3-93-147-99.compute-1.amazonaws.com,3.93.147.99' (ECDSA) to the list of known hosts.

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
5 package(s) needed for security, out of 7 available
Run "sudo yum update" to apply all updates.

[ec2-user@ip-172-31-83-165 .ssh]$ cat ~/.ssh/authorized_keys 
ssh-rsa AAAAB3... myKey

[ec2-user@ip-172-31-83-165 .ssh]$ 


Here are the steps to follow in either case.

First, we want to create a user k using the key that's downloaded from aws, bogo.pem:




k@laptop:~$ ssh -i bogo.pem ubuntu@54.153.89.201
In aws instance

$ sudo su -
# adduser k
# cd /home/k
# mkdir .ssh
# cd .ssh

Then, put local public key, ~/.ssh/id_rsa.pub, into aws's /home/k/.ssh/authorized_keys:

ssh-rsa AAAAB3Nza...fPWGjjQfJ7 k@laptop
We may want to switch user:group

chown k:k authorized_keys

Now, we're able to login to aws with the same user k:

k@laptop:~$ ssh 54.67.48.10
Welcome to Ubuntu 14.04.2 LTS (GNU/Linux 3.13.0-48-generic x86_64)



Though it is too early to see how Ansible works, for those who are eager to learn Ansible, I'll show a quick sample usage of Ansible.

On our local machine, we have "inventory" file under prod folder:

.
|--- prod
       |---inventory

The inventory file looks like this:

$ cat prod/inventory 
[server]
52.53.215.28 ansible_user=k ansible_ssh_private_key_file=/Users/k/.ssh/id_rsa

Now, using Ansible we want to check the connection to the production server on AWS. Here is how:

$ ansible -i prod -m ping all
52.53.215.28 | success >> {
    "changed": false,
    "ping": "pong"
}
Note that by specifying inventory "-i prod", Ansible grabs the file under the "prod" folder and performs "ping" using the ip address with key info in the inventory file.


Note that we can do the same for "ubuntu" or "ec2-user" for AWS instance with the inventory file (./hosts) like this:

[myservers]
3.93.171.48 ansible_user=ubuntu ansible_ssh_private_key_file=/Users/kihyuckhong/.ssh/einsteinish.pem

And run the ansible command:

$ ansible -i hosts -m ping myservers
3.93.171.48 | SUCCESS => {
    "changed": false, 
    "ping": "pong"
}
Note that this time, the user running the ansible is local user, and we don't have to have the same user account on the remote ec2 instance, which is the way we usually run ansible playbook.


Here is another form of the hosts file:

# hosts file
[dev]
52.23.188.242
[dev:vars]
ansible_user=ec2-user
ansible_ssh_private_key_file=/Users/ki.hong/.ssh/khong-aol.pem

We can use it this way:

$ ansible -i hosts dev -m ping
52.23.188.242 | SUCCESS => {
    "changed": false, 
    "ping": "pong"
}

It may be very hard to appreciate what Ansible does because the task is small and trivial, but as the tasks get more complicated, we'll be wondering how we can live without Ansible.

We'll be learning more features of Ansible in subsequent sections/pages.

Inventory - /etc/ansible/hosts
Ansible has a default inventory file used to define which servers it will be managing. The default location is /etc/ansible/hosts.

We may need to copy and move the default one so we can reference it later:

k@laptop:~$ sudo mv /etc/ansible/hosts /etc/ansible/hosts.orig
Then we can create our own inventory file from scratch. After renaming the example inventory file, let's edit /etc/ansible/hosts file, and define some servers to manage. Here's we'll define the aws instance under the "aws" label:

k@laptop:~$ printf "[aws]\n54.67.48.10" | sudo tee -a /etc/ansible/hosts
Our inventory file should look like this:

[aws]
54.67.48.10
Note: we can set an inventory file other than the default location (/etc/ansible/hosts) as shown below:

$ echo "54.67.48.10" > ~/ansible_hosts
$ export ANSIBLE_INVENTORY=~/ansible_hosts




Running Commands
Thanks to our setup in previous section, Ansible can directly SSH into the managed servers, and we can ping to our aws instance. Ansible will attempt to remote connect to the machines using our current user name (k), just like SSH would.

k@laptop:~$ ansible all -m ping
54.67.48.10 | success >> {
    "changed": false,
    "ping": "pong"
}
We can see the Ansible output in JSON which tells us if the Task made any changes.

Actually, the previous command won't work if we don't have a user, k. To override the remote user name, just use the -u parameter:

k@laptop:~$ ansible all -m ping -u ubuntu
54.67.48.10 | success >> {
    "changed": false,
    "ping": "pong"
}
If we want to access sudo mode:

k@laptop:~$ ansible all -m ping -u ubuntu -sudo
54.67.48.10 | success >> {
    "changed": false,
    "ping": "pong"
}
Here are the commands we used:

all - Use all defined servers from the inventory file
-m module - Use the "ping" module, which simply runs the ping command and returns the results
-s - Use "sudo" to run the commands
-u username - Log into servers using user username



Trouble shooting
We have a simple hosts file, and want to check the connection to an ec2 instance:
$ cat hosts
184.72.29.90    
$ ansible -i hosts all -m ping
184.72.29.90 | FAILED! => {
    "changed": false,
    "module_stderr": "Shared connection to 184.72.29.90 closed.\r\n",
    "module_stdout": "/bin/sh: 1: /usr/local/bin/python3: not found\r\n",
    "msg": "The module failed to execute correctly, you probably need to set the interpreter.\nSee stdout/stderr for the exact error",
    "rc": 127
}

As the error message said, ansible was looking for /usr/local/bin/python3 but it wasn't there. Actually, on the remote instance, we have /usr/bin/python3.

So, we can either set symlink:

ubuntu@ip-172-31-9-169:~$ sudo ln -sf /usr/bin/python3  /usr/local/bin/python3    

Or we set ansible_python_interpreter in the inventory (hosts file):

184.72.29.90 ansible_python_interpreter=/usr/bin/python3    

ansible -i hosts all -m ping
184.72.29.90 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}    


 