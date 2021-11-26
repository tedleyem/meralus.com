---
layout: post
title:  Nick Foles and Ansible
date:   2018-02-16
excerpt: "Using Ansible and runnning as second string"
#project: false
tags: [ansible, linux, devops, football]
---


![Philly Special](/assets/img/blog/philly-special.jpg){:class="img-responsive"}
The Philly Special (also known as Philly Philly) was a trick play between Philadelphia Eagles players Corey Clement, Trey Burton and Nick Foles on fourth-down-and-goal toward the end of the second quarter of Super Bowl LII. Foles lined up in the shotgun formation, but moved up to the right side of the offensive line behind right tackle Lane Johnson and yelled "kill, kill", followed by "Lane, Lane." Foles then stayed on the right side of the offensive line and the ball was snapped to running back Corey Clement. Clement then ran left and flipped the ball to Trey Burton, to complete a reverse to the right side of the field. Finally, Burton threw the ball to Foles, who ran a route to the right corner of the end zone and made the catch for a Philadelphia touchdown. After the extra-point was successfully kicked by Jake Elliott, the Eagles went up 22–12, maintaining the score into halftime.

On February 4th, 2018 I was sitting at a friends house in West Palm Beach Florida after waking up in Philly and regretting not staying another day in PA to watch the game at a bar and enjoy my teams win. One week before my new job as a Linux administrator I knew that this job would be a job I plan on staying at for quite some time. With that knowledge I'm going to need to be ready and prepared with special plays prepared for when I get hit with a blitz at my new job.

For Nick Foles, the backup QB of the Philly Eagles to be confident enough to try a special play during the most critical
game of his career, he has to be both well versed in the game of Football, trust all his team, and have confidence in himself. So, how do I become a Nick Foles. I knew that I would be working with the other Linux Administrator to take the load off his back while he finishes other big projects so I would be the second string Linux Admin in the office (or Jr Linux Admin), so we have that in common. I'm comfortable in bash scripting and in a terminal on CentOS and Ubuntu already (just like Nick knows his QB plays), but I don't have that special move and don't know how they manage all the Linux servers in the office yet. What is a guy to do in this situation..... take the opportunity to learn a new skill.
![Philly Philly Play](.assets/img/blog/philly-special.jpg){:class="img-responsive"}

I quickly searched to find the best Configuration Management tool that helps with Virtual Machines and is quick to learn. After understanding more about the structure and orchestration of the most popular Dev Ops tools I found that Ansible (which I was already using for small commands in a dev environment) was the best choice. It has close to no footprint on remote systems and is the best solution to keep in my back pocket.

![Ansible](/assets/img/blog/ansible-logo.png){:class="img-responsive"}
To learn more about Ansible I found one of the best articles on Linux Journal by Shawn Powers (thank you big guy) that helped me get a clear understanding of how to setup playbooks and use those to update multiple systems.. Now, I know what your thinking, your jumping the gun Ted, wait until you get into the job and find out how they do things so you can follow suite. There were two things that were certain before starting this new job other than death and taxes. One, that I had to be on top of my game, and two, that I should be prepared to pick up and learn new things quickly and make sure im able to test and deploy these things quicker than I normally do at home. Well, I was right.

Shortly after 30 days in the office and learning how the network is setup in the office I found that the way in which web servers were being updated along with hosts files on specific servers were all done manually and took anywhere between 15-45 minutes depending on the pool of servers.

Updating applications, backing up folders, using shell commands like rsync and running commands to stop and start services on servers in an order that made sure all specified service run the way they should would have taken me 6 minute per server to do on a weekly basis. 6 minutes for 16 servers...thats 96 minutes! With ansible I can organize what commands get run, when they get run, cron them out to run on a scheduled time, and name it kill_kill_lane_lane.yaml for chuckles in the office has turned it into a 6 second job (with 10 seconds to wait for alerts to flood my
   emails that things are working).

![Ansible Play](/assets/img/blog/ansible-play.png){:class="img-responsive"}

I don't want to go into the specifics of how my office does things obviously but I can say that I've used Ansible on more occasions than one and have reduced the time it take to update Configuration files on 10+ servers from 45 minutes to less than 45 seconds.

The file modules in Ansible's documentation are easy to understand and Ansibles ability to use the --check or "dry run" flag to test playbooks before pushing them to groups of servers saves me so much time in my current job and helps prevent any "oh shit" moments at work too.

In conclusion I'm now able to run my very own Philly Philly when my team needs to make critical changes to multiple servers. Being confident and always willing to learn new things has been the best part of Ansible deployment and my job as a Linux administrator.

I will be pushing Ansible playbooks and have more blogs about Ansible coming soon.




## https://en.wikipedia.org/wiki/Philly_Special
## https://www.linuxjournal.com/content/ansible-making-things-happen
