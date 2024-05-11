---
layout: post
title:  "A history of DevOps, sort of"
date:   2024-05-11
excerpt: "devops and the cycle of understanding"
img: "blog-headers/basketball-plan.jpg" 
project: true  
---
 

# DEVOPS and the cycle of understanding
Companies are always looking forward and working on forward growth prioritizing the need to change the way their teams are organized and operating. The best practices used in DevOps (to promote collaboration between development and operations) have become the common ground for Scrum and Agile thinking. My attempt here is to describe the cycle of what looks like frequent things that "happens" to IT as they move forward in DevOps. Anyone who has worked in Devops may find what im about to say familiar. 


# DevOps: Scrum teams
Scrum is still one of the most widely applied framework which is used to organize software development teams. Like the famous [triangle offense](https://en.wikipedia.org/wiki/Triangle_offense) used in the NBA there is little need to know about the maturity or the quality/quantity of teams using Scrum. Scrum allows teams to focus on getting their next incremental tasks done. Software driven, release focused results. One man needs to setup a screen for the ball-handler, the ball-handler needs to roll off the screen. We all all looking to achieve the same goal and score points but in this phase, we need to deliver the small steps to get there. Examples that are more related to software would be designing, programming, testing & even appropriate documenting. What makes this unique is that these are all capabilities and not roles and they are preferably not tied to only one person. All members are simply called developers and there is only a difference between teams and production environment (like practice and in-game performance).

# Scrum team COMMON CHALLENGES
Managing external dependencies (making sure other players on the team know what positions and roles they need to be in), long wait times when handing-overs projects to other departments for deployments (waiting on the off-ball screen to make sure defenders fall for the confusion), and preparation for execution (shooting the ball and making sure players are ready for the rebound) are all common challenges faced during the scrum phase.


# DevOps: CI/CD
Since the Continuous Delivery (& Integration) revolution was ignited by [Jez and Farley in 2010](https://www.davefarley.net/?p=305), a lot of attention is focused towards automate and integrate, tests and execution, deployments on pipelines and feedback loops. The availability of tools that could execute and monitor these activities helps maintain momentum. Tools like splunk, grafana, and other dashboards to showcase uptime, package releases, and more are great showcases of Continuous Development and Delivery. In this phase teams are able to deploy much faster and more reliable to different stages. The long-winded deployment manuals become a forgotten relic of time. Teams are empowered with new and emerging tools and strategies to continue growth (jenkins, github actions, etc).

# CI/CD COMMON CHALLENGES 
Setting up reliable pipelines, changing existing software with CD in mind, depending on the team that supports the pipeline tooling and operator who execute the deployments to production are all common challenges. Working with teams proficient in the tools (jenkins) or languages (groovy) can be critical to meeting deadlines or releasing new features to the public. 

# DevOps and Functional Operations
After explaining the previous phases its easy to understand that teams have a rhythm of delivering working software. They should start to live by the mantra [“You build it, you run it”](https://aws.amazon.com/blogs/enterprise-strategy/enterprise-devops-why-you-should-run-what-you-build/). Teams become more interested in the health and status of the production environment. That is an excellent reason for reaching out to Functional Operations teams to obtain the data associated with the mantra. Teams like this are on the "business" side of the software. 

Questions arise when running and using the software that become the heartbeat of these operations. How is the software used publicly and internally? Which features are the most valuable ones? What is the logging or monitoring of the production environment telling us? The typical approach to enable this organizational need is by pushing the existing delivery teams with people who have this Operational role.
In doing so, teams receive more responsibility in the shape of team members who are authorized to see certain data on production and who have in-depth knowledge of how the software is being used. In basketball terms these would be something along the lines of your assistant coaches, they asses working strategies with coaches, they organize and sometimes supervise the maintenance of the reports, scores, and tools needed for the team to continue to perform, and continue administrative duties. In Software Shops your SRE (senior reliability engineers) would be the guys who do a lot of these work. Reviewing data, providing the visual tools for teams, facing customer/clients needs and responding to feedback loops of new features or bug fixes, and more. 

# Functional COMMON CHALLENGES
Many SRE's have trouble with getting the required rights and access for more team members, getting all the information from production to the team e.g. logging and monitoring information. Working as middle-men for a team that works as middle-men can cause a list of troubles in terms of rights and access but as long as the entire team is working towards the same goal, these issues become commonplace. 

# DevOps and Technical Operations
Once organizations and teams have more than a few development teams, there are usually supporting teams around them as well. The latter teams are usually specialized in the infrastructural layers of the software solutions: development machines, testing environments, disk management and operating systems are all good candidates. When a central team or department is in place, this team is often responsible for the deployments of new software into production. 
These teams themselves have the technological means to get their new Increment deployed on any stage or server that is required. But, it raises the question, “Who is now allowed to perform the deployment to the production environment?”. Is that in the hands of the CI/CD team? The development team? This question is a perfect example of the segregation between Dev & Ops, but is in this phase integrated into one.

# Operations COMMON CHALLENGE
The expansion of teams may cause the collision with production, development, and forward growth. 
In NBA terms its similar to adding new role players or all-stars to a team and finding the right chemistry. If you have two dominant teams who both want or need to push releases to production it may be similar to having Kobe Bryant and Michael Jordan on the same team at the same time. Who is the captain of the team? Who will have the ball more? Will the entire team succeed if both these players are in constant collision? 

# DevOps  BizSecCyberDevOps?
To keep teams more self-sustaining, they need other capabilities, either technical or more business oriented. Depending on the nature of business growth, and the size of the company, 
experts and key role players can find niche jobs or study the new trending names of jobs that match their skillset. Database admins, security engineers, platform engineers, Full stack engineers, etc. Role players, the glue, the reserves, the bench team, are players who are vital but don't get the "MVP" recognition as other players. NBA starts of this calibur would be John Salley, Javele McGree, Robert Horry, Steve Kerr, and the likes.

# Roleplayer COMMON CHALLENGES 
Questions and common challenges here are: Which extra responsibilities are helping teams to create more value. Which capabilities should remain separate? Should Joel Embiid or Karl Anthony Towns be a true center or should they be shooting 3-pointers, driving to the basket like Giannis Antetokounmpo, breaking ankles like Kyrie Irving? Or is it possible to create value and still dominate like the 3-and-D Mikal Bridges of the Brooklyn Nets? 


# Conclusion: Growth
From an organizational standpoint, any of the phases described is just an infinite feedback loop generating possibilities for growth. Project Managers should find time within each phase to take a step back and see how the collection of people, skills, and responsibilities provides the most value. There is an ongoing shift in roles an responsibilities to and from each team and organization. Buzz words like "Platform Engineer" tend to influence a desire or need to continuously integrate more players in teams. Having proper plans and guidelines in place while taking the time to reflect on process, control-flow, and value, is critical to continual growth. Most companies that focus on growth and great ideas, which are implemented while "running lean" and focusing on "best practices". But "All truly great thoughts are conceived while walking.”


If I have learned anything about life, Devops, and "growing through what I am going through" it is this 

```
Life can only be understood backwards; but it must be lived forwards

```

This quote is a great example of why the common DevOps logo below and its cyclical nature emphasizes the importance of logos and the importance of understanding Devops practices and strategies. 
![](/assets/img/blog/devopss.jpg)

Even when things "happening" all the time, Its the details that are important. The little things make big things happen. 