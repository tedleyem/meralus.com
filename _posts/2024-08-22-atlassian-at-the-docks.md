---
layout: post
title:  "Modernize your infrastructure by leveraging docker"
date:   2024-08-22
excerpt: "portable Atlassian suite"
img: "blog-headers/atlassian-deployment-blog.png"
project: true
---

Throughout my working career I have found a few good and bad things about how organizations operate (as would anybody). One thing I have grown to learn is that An organism’s survival is dependent on its evolution. Ignoring development, projects, ideas, and working traits that enable teams to overcome challenges would threaten its survival. Like all living things,  organizations have to evolve to maintain a competitive advantage and continue to thrive in their businesses. Most businesses spend too much being concerned with being agile enough to adjust to an evolving business landscape. In many ways, the abrupt changes that we are seeing in todays environment, with companies laying off people to supplement labor for AI, is a sharp reminder that having the ability to adapt to change is important. With that being said many organizations, whether operating in a self-managed environment, should be prioritizing infrastructure modernization as a key component to their survival.


Instead of investing in physical infrastructure, many admins are being tasked with finding better ways to host their products, whether it be in the cloud or in the middle of migrating to new hypervisors.

Two of the most popular options in modern tech that companies are using are containers(docker) and container orchestration frameworks(kubernetes/openshift). Containers provide a lightweight alternative to traditional virtualization tools, while orchestration frameworks automate many of the tasks required to maintain container workloads and services. When both of these are working in synergy, companies can become more agile without administrative overhead.


*DevOps and why its important*
Most dev teams have implemented some elements of DevOps into their practices and processes, but having the products with the right capabilities is paramount to the quality and speed of production.

To speed up development of the boring business side of development, you can leverage [Atlassian's Docker container images](https://www.atlassian.com/blog/enterprise/why-docker-matters-in-your-enterprise-infrastructure#:~:text=Data%20Center%E2%80%99s%20hardened-,Docker%20container%20images,-.%20After%20defining%20the). After defining and setting the required configuration once, you can deploy exact replicas of that environment in every stage of your deployment lifecycle, which enabling the agility to keep the team moving forward and the flexibility to accommodate your companies evolving development strategy over time. Moving and being portable allows you to migrate from monolithic servers to cloud infrastructure to data centers without the prolonged time of tedious workflows involving hours of setting up and configuring critical system applications like Jira or bitbucket.

Leveraging portability with docker images allows you to  to create secure, consistent, predictable environments that can speed up all aspects of your teams work and other teams in your organization. Reducing impact of HR, programmers, admins, and more. If you can build it for one team quickly, you can scale it and build out the same instance for 10 teams if need be.


 After defining and tuning your configuration once, you can instantly deploy exact replicas of your environment from the command line at every stage of your deployment lifecycle, giving you the agility needed to keep valuable work moving forward, and the flexibility to accommodate your organization’s evolving development strategy over time.

*Simplified administration*

Container images provoke speed and agitility, but they can still contribute to some administrative overhead if you dont have the talent or teams in place to manage them. Thusly, Kubernetes (K8s) enters the field.

Kubernetes aka K8s (or k-eights) is a container orchestration framework that allows you to easily manage your containers in one place. Kubernetes comes with a list of benefits.

* Deployment automation
* Automated operations for containers
* Security enhancements
* Accelerated upgrades and rollbacks
* Better scalability and resiliency
* The ability to manage everything in one place reducing resource consumption.
* With these deployment strategies you can perform upgrades or changes with little to NO downtime at all.

With all this free marketing I'm mentioning for Atlassian, Docker, and kubernetes I have created deployment strategies for testing purposes. Being able to stay in control of your data and your infrastructure with code makes it easier to meet compliance needs while still leveraging modern technologies.


### The good and the bad
I have helped deploy docker instances and reduced downtime in development and staging environments from a full work day (8 hours) to minutes within a meeting. It caused confusion at first but the upgrade process that used to take 4 hours of prep work took 4 minutes with 26 minutes of testing and quality assurance. We had on saturday every month set for upgrades. My enhancements changed the interview process for other teams who no longer had to mention having to work on saturdays. Giving back peoples saturdays caused conflict for some teams who leveraged the free day during the work week to get errands done. So, using IAC and shrinking upgrades and maintenance windows helped with the speed of development but also inconvenienced teams lol. Sometimes you gotta take the good with the bad.

## See for yourself
Who would I be if I didn't share some code for others to test things out with. Reading these blogs could be fun, but playing with the applications and processes are more fun. Here is a list of deployment resources to test out using Docker, Kubernetes, and Terraform.

--
[Deploy with Docker](https://github.com/tedleyem/atlassian/tree/master/docker)
[Deploy with Kubernetes](https://github.com/tedleyem/atlassian/tree/master/kubernetes)
[Deploy with Terraform (in AWS)](https://github.com/tedleyem/atlassian/tree/master/terraform)
