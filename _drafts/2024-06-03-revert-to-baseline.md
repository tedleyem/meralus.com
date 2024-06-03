---
layout: post
title:  "Making good choices with ansible"
date:   2024-06-03
excerpt: "10 habits of great Ansible users"
img: "blog-headers/ansible-banner-1.png"
project: true
---

While working on more and more ansible playbooks on this m1 macbook without being able to use vagrant for the time being has be following bad habits. A few years ago I ran into this Red Hat blog article [10 habits of great Ansible users](https://www.redhat.com/sysadmin/10-great-ansible-practices) and it helped me clear up SOME of the issues im having. One of the issue im having is that the inability to use test vm to run all aspects of my ansible playbooks or roles prevents me from ensuring that they work through and through. This doesn't stop me from linting or fighting with whitespaces or naming convetions in modules though. I have no excuse for not checking those things. At previous work environments I would use [pre-commit](https://pre-commit.com/) to force myself to check and fix syntax but when thats not in play I go back to bad habits. In my current environment I find myself creating a branch to use for sending tons of small commits to fix syntax issues or make small changes to tests that get run through Ansible Tower. Connecting the branch in ansible tower and using a test server at work allows me to work through playbooks and testing, which sounds good right?!? Wrong. When the ansible role or playbook is completed and working properly i'm left with 10's of 100's of commits in a brnach that I need to squash.

### Experience is simply the name we give our mistakes. — Oscar Wilde
With the boundaries set from pre-commit i'm able to efficiently clean up the small syntax issues in ansible, but this isnt about pre-commit, this is about removing boundaries I placed on myself and my coding style to enforce better habits. One who complains all the time is either Dishonest or scared. I am neither. To prove that to myself I must repeat the quote I catch myself saying more and more that I must "Grow through what you go through".

With all that being said I am writing this blog to discuss the 10 good practices for writing ansible projects. Reading this from the link above may be nice but writing it out i nmy blog forces me to do three things.
1. write a new blog post to complete my short term goals
2. Re-read and reapply these habits into my working environment.
3. Review and repeat the habits moving forward.

### Use whitespace and comments
Ansible uses YAML for writing playbooks, and whitespace characters (literal space characters) are what YAML uses to define document structure and denote nesting. Tabs are not allowed.

For example:
```
foo: bar
     dah: dum
     lah:
       dee: dah
       dah: dee
```

is translated into Python (using the PyYAML library) as:
```
foo : bar
dah : dum
lah : {'dee': 'dah', 'dah': 'dee'}
```
Using comments is another best practice that can help you meaningfully describe lines of code. Don't overuse them—the more clear the comment, the better! In YAML, comments begin with a pound (or hash) sign:
```
# This is a comment
```

### Use roles to keep playbooks well-organized
While there are many possible ways to organize playbook content, one crucial way is with Ansible’s roles organization feature. Here is an example role directory structure:
```
site.yml
webservers.yml
fooservers.yml
roles/
    common/
        tasks/
        handlers/
        files/
        templates/
        vars/
        defaults/
        meta/
    webservers/
        tasks/
        defaults/
        meta/
```


# Troubleshoot on execution
If you're looking to test new plays or do some debugging, there are a few alternative ways to run playbooks in Ansible. Using these switches can help you catch problems in your code more quickly. Here is a breakdown of a few:
```
-vvvv enables connection debugging.
--step causes Ansible to stop on each task and ask if it should execute that task.
--check enables check mode, where Ansible runs without making any changes on remote systems.
--diff enables diff mode, where Ansible provides before-and-after comparisons.
--start-at-task starts executing your playbook at a particular task.
```
### Use native modules when possible
Ansible's goal is to make things as easy and convenient as possible. So while you can use commands such as command , shell , raw , and script to do command-line operations, using them excessively could lead to problems down the line. It's best to use run commands sparingly since there are hundreds of native Ansible modules that can do what you need.

I typically use these tasks as a means to an end and expect them to ALWAYS make changes when running ansible in an idempotent fashion. Even if the command is to run a "grep" search or print out the results of an "ls" command to check permissions. Knowing that these changes with be triggered in ansible as "changed" may not be ideal if someone is trying to report what changed during a playbook run (like modifying a file) may not be ideal but it has never broken idempotency.

### Keep debugging messages clean
While useful for debugging variables or expressions, the debug module can clutter the output. It's best practice to remove these lines of code before your playbook goes into production. You can also control when the debug is run with a verbosity parameter. For example, if you set it to 3, it will only run debug when you run -vvv.

```
- debug:
   msg: "I always display!"

- debug:
   msg: "I only display with ansible-playbook -vvv+"
   verbosity: 3
 ```

# Conclusion

Being able to write this out helps add more clarity to the small things im forgetting to check before pushing commits to a branch. This should should potentially save me hours in testing over time. Could I have just saved this link to my browser and gone back to it instead of rewriting it here, sure. Could I also anticipate that Ansible gets changed like most Red Hat products and docs may disappear on a platform that I cant control, yes! For anyone reading this I would highly recommend making sure you have a small list og "guidelines" or "best practices" when learning anything new. Having any foundation is better than no foundation at all. We can only grow from our own mistakes. Ill conclude with this quote I guess.

```
"There is nothing noble in being superior to your fellow man; true nobility is being superior to your former self". "Failure is success if we learn from it". "To improve is to change; to be perfect is to change often"
```


