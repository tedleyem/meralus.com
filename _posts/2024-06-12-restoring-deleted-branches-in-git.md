---
layout: post
title:  "Git Landscaping"
date:   2024-06-12
excerpt: "How to restore a deleted branch"
img: "blog-headers/cleaning-branches.png"
project: true
---

While working on learning git, which has become a lifelong tasks that I compare to Monasticism that has just become a way of life, I broke a repository and had to restore a delete branch. I wanted to document a few ways to restore a delete branch in Bitbucket.

# Small story
While working on upgrading and making changes to a VM I flew too close to the sun and burned my wings. Luckily because it was a VM in a hypervisor with active backups I was able to roll back the vm to a previous state. Rolling back that VM means that any work being done on the vm from 6am (the time of the last snapshot was made) to 12pm (the time I decided to roll back the changes) will be lost. The system I was on, you guessed it, was a production machine, so it wasnt that important.

![](/assets/img/blog/restore-branches/Two-Buttons.jpg)

##### Issue
I chose to rollback the machines. The issue with that was that the VM had Bitbucket on it. The commitment was made, but the PR I created, based off the branch I had created and pushed to that morning, was no longer on the server. So here is a few solutions for recovering that data. Some of the images here are ripped from sources online cuz I not stupid enough to show my personal private projects and want to remove any work related images lol.

#### Solution 1 - LOCAL RECOVERY
Push the branch from a local copy. If you still have the changes you pushed locally you can just git push again and it will create that branch once more.
You may need to use git fetch to sync the current state of the repository with your local state, but pushing the changes will recover your branch.

#### Solution 2 - Recover by checking logs in Bitbucket
Reviewing logs and commits in BitBucket and recreating branches in the UI from the commits can save you as well. In my case, when reverting changes, this does not work because the changes are gone. However, push commits record the history of branch creation and deletion. You can find the deleted logs and create branches from those logs. This works in BitBucket, but has not been tested in Github or Gitlab UI. I would like to assume this works in other cases but I dont feel like breaking things to test that lol.

A quick how to:
* Open the push logs for the repository
* Select the deleted branch from the Branch  dropdown
* Review the push logs to determine the last commit in the branch before it was deleted
* Click the commit hash in the push logs to open the commit on a new page
* Create a tag for the commit.
* Recreate the branch based from the tag created in the previous step.
* Open the Create Branch page then choose the tag under Branch from > Tags
* Set the branch name and click Create branch

The second solution may help with branches that get removed or deleted after pull requests get pushed to the main branch, or if multiple branches are deleted because of some sort of automated reason. However it happens, there are solutions, at least in BitBucket.

# Conclusion
The only way we learn is through FAILURE. I live to learn because the objective of being human is to grow. So this hiccup will eventually be a small history lesson to talk to other git friendly IT comrades.