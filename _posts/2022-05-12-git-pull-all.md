---
layout: post
title:  Bash one-line trick to pull all your GitHub repositories
date:   2022-05-12
excerpt: "git pull all-the-things"  
img: "blog-headers/git-workflow.png" 
---
# Bash one-liners for cloning and managing GitHub and GitLab repositories
 
#### Git Pull ALL 
When it comes to writing code, scripts, or solving problems with programming, there are few things more satisfying then finding the write command to get things done. 

As I noticed myself using a list of repeatable commands in linux or on my macbooks for work I decided to share one that comes in handy quite often. 

I, as well as the next person, tend to have many of my github projects in a specific folder on my machine to keep myself organized. While working with others I find myself continuously running "git pull" to pull the latest code that I may not have stored locally. I also tend to work on different machines and may have updated something on a project on one laptop, and now looking at it on another. To solve this problem I typically go into my github projects folder and run the following command. 

```
 find $PROJECT_PATH -mindepth 1 -maxdepth 1 -type d -print -exec git -C {} pull \; 
```

###### Lets explain what this find and pull command does by breaking it down. 
[Find](https://man7.org/linux/man-pages/man1/find.1.html) is a popular [gnu tool](http://www.gnu.org/software/findutils/) used to search for files in a directory. 
- The $PROJECT_PATH is a variable that can be replaced with the dir your are searching through (example: /home/ted/github-projects). 
- -mindepth and -maxdepth which allow the command to iterate through directories one by one. 
- -type with the "d" flag determines that directories are targeted as the object to be parsed through
-  -print action is performed on all files for which the whole expression is true. This prints a stdout to view what is happening while the command is ran. 
- -exec allows a command to be triggered if the previous parts of the previous segment of the command returns true. 
- git -C {} pull \ does a few things. The {} is the syntax used to dereference tags. This allows the command to just run a git pull and not search or break when tags are present. The "\" allows the stdout to be viewed line by line in an easy to read fashion. 


#### Git Clone multiple repos at once. 
This next command solves another problem I happen to deal with from time to time. During my years of re-creating my dev environment on a new machine with bash scripts, I wanted to find a way to clone all my github repos to my new machine. I happened to find this 2-step one-liner helps quite often. 

Note: It is easier to clone repositories without entering your password by creating ssh keys and adding them to github. Once completed you can create a list of the github repo's you work on the most and need in your environment. 

We can then create a file called gh-repos and download the ssh urls for each repository. 
A list of GitHub URLs in the file gh-repos.txt, like this:
```
git@github.com:username/first-repository.git
git@github.com:username/second-repository.git
git@github.com:username/third-repository.git
``` 

Once created you can move it into your desired dir, I typically call mine github-projects, and then run:

```
xargs -n1 git clone < gh-repos.txt
```

This will clone all the repositories on the list into the current folder. This same one-liner works for GitLab as well, if you substitute the URL's accordingly.

###### Lets explain what this command does by breaking it down. 
 
To run a command for each line in our file gh-repos.txt, we use [xargs -n1](https://www.man7.org/linux/man-pages/man1/xargs.1.html). 

- The xargs tool reads items from input and executes any commands it finds (it will echo if it doesn’t find anything).
 By default, it assumes that items are separated by spaces; new lines also works and makes our list easier to read. 

- The flag -n1 tells xargs to use 1 argument, or in this case, one line, per command.

- git clone will clone the repo based off the input give. 
- The < gh-repos.txt' injects the content within the gh-repos.txt back into the xargs command which, all-together, will clone each git repo listed in the text file. 

I typically use these steps and command when working on new machines or in ne wwork environments. I was showing these tips to a co-worker today and when asked about a certain part of the command I froze and felt as thought I couldn't remember. This blog is to re-assure myself that I haven't just been blindly using old techniques to solve current tasks. These sure help me, if they help you, let me know via Twitter [@techgameteddy](https://www.twitter.com/techgameteddy)

 
    
