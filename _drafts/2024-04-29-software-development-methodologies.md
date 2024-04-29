---
layout: post
title:  "SOFTWARE DEVELOPMENT METHODOLOGIES"
date:   2024-04-29
excerpt: "lorem ipsum"
img: "blog-headers/devops-banner-image.jpg" 
project: true  
---

Understanding the Evolution and the speed of change in he IT industry can be jarring. Trying to make sense of it through [many reddit posts](https://www.reddit.com/r/devops/) can send you down a spiral also. I think I might write a few things about what I have learned about these terms, what they mean and how they work and continue to define these things on a yearly basis, or go back to this blog to see if what I wrote today, is still viable next week, or next year. Here is a list of some key concepts of Devops and Cloud/IT/Software based terms and strategies. 

## Agile
![AGILE](/assets/img/blog/software-methods/agile.png)
Iterative and incremental development.

Agile Manifesto
We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:

Individuals and interactions over processes and tools
Working software over comprehensive documentation
Customer collaboration over contract negotiation
Responding to change over following a plan
That is, while there is value in the items on the right, we value the items on the left more.

## Scrum
Scrum is an iterative, incremental methodology for project management often seen in agile software development.

The name scrum came from rugby, where the whole team "tries to go the distance as a unit, passing the ball back and forth." Likewise, in scrum, the development phases strongly overlap and the whole process is performed by one cross-functional team across the different phases.

A key principle of Scrum is its recognition that during a project, there can be requirements churn, and that unpredicted challenges cannot be easily addressed in a traditional predictive or planned manner. As such, Scrum adopts an empirical approach accepting that the problem cannot be fully understood or defined, focusing instead on maximizing the team's ability to deliver quickly and respond to emerging requirements.

Terminology

Product Backlog
Wish list for the features of final product.
Release Backlog
Priotirized list of Backlog.
Spint Backlog
Short duration (3-30dyas) milestones for ship-ready release.
Burndown Chart
This shows remaining work in the sprint backlog.


## Extreme Programming (XP)
Extreme Programming (XP) is intended to improve software quality and responsiveness to changing customer requirements. As a type of agile software development, it advocates timeboxing, which is intended to improve productivity and introduce checkpoints where new customer requirements can be adopted.

Other elements of extreme programming include: programming in pairs or doing extensive code review, unit testing of all code, avoiding programming of features until they are actually needed, a flat management structure, simplicity and clarity in code, expecting changes in the customer's requirements as time passes and the problem is better understood, and frequent communication with the customer and among programmers.

## Lean
Think big, act small, fail fast; learn rapidly."

Basic principles of lean are:

Eliminate waste - Everything not adding value to the customer is considered to be waste
Amplify learning - The learning process is sped up by usage of short iteration cycles each one coupled with refactoring and integration testing.
Decide as late as possible- delaying decisions as much as possible until they can be made based on facts and not on uncertain assumptions and predictions.
Deliver as fast as possible - The sooner the end product is delivered without considerable defect, the sooner feedback can be received, and incorporated into the next iteration.
Empower the team
Build integrity in - refactoring

## Test-driven development (TDD)
Test-driven development (TDD) relies on the repetition of a very short development cycle. It's a technique for designing a code. In TDD, each new feature begins with writing a test not the production code. By writing the test code first, we're focusing on the behavior of a unit or its interface.

If we deliver a project using TDD, the code tends to be more cleaner and less complicated. This is because as I'm writing the test, I'm ensuring the code testable. Testable code is clean and simple so that we can isolate it and test it easily.


## Water Fall
The waterfall model maintains that one should move to a phase only when its preceding phase is completed and perfected.



# DEVOPS and the cycle of understanding
https://www.agitma.nl/devops-understanding-the-evolution/

DevOps: understanding the evolution
Many organizations find themselves somehow confronted with the need to change the way their teams are organized and operating. Echoing in the hallways is this idea of DevOps. It sounds promising and has a lot of common ground with Scrum, which organizations are already familiar with. Moreover, it is drenched in Agile thinking. This blog is the first of a few concerning DevOps. In this blog I’ll describe an organizational evolution which frequently ‘’happens” to IT organizations in their journey towards DevOps. Which phase is your organization in and what is there to gain and overcome?

Definitions

Before jumping into the evolutionary path, let’s spend a minute chewing on three DevOps definitions.

DASA: “DevOps is a cultural and operational model that fosters collaboration to enable high performance IT to achieve business goals.” [1]

Humble: “a cross-disciplinary community of practice dedicated to the study of building, evolving and operating rapidly-changing resilient systems at scale.” [2]

Len Bass et al. “a set of practices intended to reduce the time between committing a change to a system and the change being placed into normal production, while ensuring high quality” [3]

As you can see, the definitions have some overlap but aim their focus differently. The term DevOps has not one clear and uniform definition that is shared in the community. Therefore, it is a good practice to find some common ground before starting any discussion on DevOps in your own organization. For now, it is good enough to have a feeling of what a definition could look like.

1. Pre-DevOps: Scrum teams

Scrum is still the most widely applied framework which is used to organize software development teams. There is no need to differentiate in level of maturity or quality by teams using this framework. In this phase, teams just focus on getting their next Increment of Done software ready and possible even release it. In the team all capabilities to get the software Done should be present, for example designing, programming, testing & even appropriate documenting. However, these are all capabilities and not roles and they are preferably not tight to only one person. All members are simply called developers and there is a chasm between teams and production environment.

COMMON CHALLENGES: managing external dependencies, including limiting waiting times and hand-overs to other departments for deployments.


2. Pre-DevOps: CD/CI

Since the Continuous Delivery (& Integration) revolution was ignited by Jez and Farley in 2010, a lot more attention is paid to automate and integrate, test execution, deployments on pipelines and feedback loops. The availability of tools that could execute and monitor these activities via – more or less – user friendly interfaces helped getting momentum. In this phase teams are able to deploy much faster and more reliable to different stages. The long-winded deployment manuals become something of a quickly forgotten past, instead the teams are empowered with new tools.

COMMON CHALLENGES: setting up reliable pipelines, changing existing software with CD in mind, depending on the team that supports the pipeline tooling and operator who execute the deployments to production.



3. DevOps round I: Functional Operations

Coming from the previous phases, teams have a rhythm of delivering working software. They should start to live by the mantra “You build it, you run it”. Teams become more interested in the health and status of the production environment. That is an excellent reason for reaching out to Functional Operations to obtain this – more business – side of the software. New questions arise. How is the software used? Which features are the most valuable ones? What is the logging or monitoring of the production environment telling us? The usual approach to enable this organizational need is by extending the existing delivery teams with people who have this Operational role. Often these people come from a more centrally organized department. In doing so, the teams receive more responsibility in the shape of team members who are authorized to see certain data on production and who have in-depth knowledge of how the software is being used. This Functional Ops-role is embodied by an Ops-Engineer who joins the teams.

COMMON CHALLENGES: embedding the Functional Operators in the team (and not creating a split team), getting the required rights available for more team members, getting all the information from production to the team e.g. logging and monitoring information.

4. DevOps round II: Technical Operations

Once organizations have more than a few development teams, there are usually also some supporting teams around. The latter teams are usually specialized in the infrastructural layers of the software solutions: development machines, testing environments, disk management and operating systems are all good candidates. If such a central team or department is in place, this team is often responsible for the deployments of new software into production. But, the newly empowered teams in phase 2 or 3 have no such need anymore. More importantly, the teams themselves have the technological means to get their new Increment deployed on any stage or server that is required. The next question usually follows very soon: “Who is now allowed to perform the deployment to the production environment?”. This task had been one of the most eminent examples of the segregation between Dev & Ops, but is in this phase integrated into one.

COMMON CHALLENGES: again, embedding new people in the team, especially when mindset between Dev & Ops are colliding.


5. Post-DevOps: BizPerfSecDevOps?

In order to make teams more and more self-supporting, they need other capabilities, either technical or more business oriented. Depending on the nature of the business and – again – the size of the organization, any of the following experts’ roles could be eligible for the team: DB-admin, security expert, platform engineer, performance engineer, UI/Interaction designer, SEO specialist, business expert.

COMMON CHALLENGES: which extra responsibilities are helping teams to create more value versus which capabilities should remain separate?


# Conclusion: Growth
From an organization view point any of the phases described above is just one of the almost infinite amounts of possibilities to get organized. Take a step back and see how your organization is just a collection of people, with skills, tools, tasks, responsibilities and mandates organized in a particular way. We aim to come up with the exact organization that is able to create the most value. In the evolution above there is an ongoing shift in roles and responsibilities to and from teams. The context of the team is very much leading in getting the optimum setup. Longstanding organizational setups and existing boundaries are often hard to get by.

One way of thinking more out of the box is by raising the question: “What if we only had two teams?” or even better “What if we only had one?” This forces you to elaborate on who is allowed to do what and why. This question is applicable in all phases, yet becomes paramount in the last one. Last but not least: don’t get stonewalled by the existing organizational structures and boundaries.

