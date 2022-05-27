---
layout: post
title:  Github ssh-keys for work and for play
date:   2022-04-02
excerpt: "managing multiple github accounts on one machine"  
img: "blog-headers/git-ssh-keys.png" 
---
# Use multiple ssh-keys for different GitHub accounts on the same computer

At my current work place, I was asked to create a new GitHub account before I can be a member of the company’s GitHub organization and in turn get access to all the private project repositories. This posed a problem. I have my own personal github account on my machine already with [gh-cli](https://cli.github.com/) installed and running with ssh keys since the [move away from passwords](https://www.zdnet.com/article/github-shifts-away-from-passwords-with-security-key-support-for-ssh-git-operations/). I needed to create an ssh key and add it to my organizations account. I can't use the same one from my personal but need to be able to do the following.
I need to be able to run a git pull or git clone and let my machine know what ssh-keys should be used when pulling from dir1 vs pulling a repo in dir2 from work. 
After some trial and error, these are the steps I used to finally got it to work.


###### Step 1: Create a new ssh-key and add it to the work GitHub account

$ ssh-keygen -t rsa -b 4096 -C "my-work-email@google.org"

Lets say we saved the new private key as id_rsa_work and the public key ip_rsa_work.pub and already have existing keys 
for personal user (id_rsa and id_rsa.pub).
Your ~/.ssh dir should looks something like this once you have answered all the prompts. 
```
    /home/tedley/.ssh
    ├── config
    ├── id_rsa 
    ├── id_rsa.pub
    ├── id_rsa_work
    ├── id_rsa_work.pub
    ├── known_hosts 
```
copy the context of the public key into your work account now. 

    $ cat ~/.ssh/id_rsa_work.pub


###### Step 2: Modify the ssh config file on your local machine ( ~/.ssh/config)

You can use vim or nano or a text editor to modify the config file. That file will help break down the dir and 
identity file you would like to point to. 

This helps if you seperate your work based repos and personal based repos into different folders. 
I personally created a dir in my home dir called "github" for personal and "projects" for work related projects. 
Once you have your repos and dirs setup on your local workstation in a similar fashion you can add the following 
to your config file.

```
# Personal GitHub account
Host github.com
 HostName github.com
 User git
 AddKeysToAgent yes
 UseKeychain yes
 IdentityFile ~/.ssh/id_rsa.pub # personal ssh-key
Host github.com-work
 HostName github.com
 User git
 AddKeysToAgent yes
 UseKeychain yes
 IdentityFile ~/.ssh/id_rsa_work.pub # work ssh-key
```

###### Step 3: Clone the work project repo (with a slight change in the address)

To clone the work project repos using the new ssh-key we need to make a small change to the repo’s ssh address. The host url needs to match the Host defined in the ssh config file from last step. The section above where in the address there is Host github.com, replace it with github.com-work.

Example: , a typical private repo ssh address we get from GitHub would look like this:

    git@github.com:[my work GitHub group]/[my project].git
    or
    git@github.com:Company/tedley-repo.git

###### Step 4: We need to tweak its address like this before we can git clone it:

    From this:
    git@github.com:Company/tedley-work-repo.git
    To this: 
    git@github.com-work:Company/tedley-work-repo.git

###### Step 5: Testing it out. 
Now you should be able to cd into your "projects" directory and pull a repo from your work organization. 
As long as both ssh private and public keys are in the ~/.ssh dir on your machine the following command should work. 

    $ cd projects 
    $ git clone git@github.com-work:Company/tedley-work-repo.git

And now test with personal 
    $ cd github 
    $ git clone git@github.com:tedley/my-personal-repo.git

Both those commands should be able to clone your desired repos without having to ask for passwords or conflicting with key usage. 
This is my current solution. Hopefully gh-cli will provide an option to have multiple accounts to use for home and work. Maybe ill peek around and 
see how I can contribute, but for now, hope this helps whoever reads it. 

___
### An alternative option 
___
###### Setup dynamic user and email dependant of folders 

There is another option that we can hammer down here as well. Lets say we want to set the user depending on the folder you are in. In the above examples 
I dont have examples so I will use a few here. 
```
personal github profile: 
 username: teddy
 email: teddy@meralus.com

Professional github profile: 
 username: teddy-TWTR
 email: teddy@twitter.com 
```

In your ~/.gitconfig, makes sure to remove the [user] block and add the following (change this to fit your needs) :
```
      [includeIf "gitdir:/home/teddy/projects/"]
      	path = .gitconfig-home
      [includeIf "gitdir:~/home/teddy/work-projects/"]
      	path = .gitconfig-work
````
In your ~/.gitconfig-home, add your personal info:
```
      [user]
      	email = teddy@meralus.com
      	name = teddy
````
 In your ~/.gitconfig-work, add your professional user informations:
```
      [user]
      	email = teddy@twitter.com 
      	name = teddy-TWTR
```
This also helps solve the problem, just in a different approach. 