---
layout: post
title:  "Software Development Methodologies"
date:   2024-04-29
excerpt: "modern software development"
img: "blog-headers/devops-is-burning.jpg" 
project: true  
---

Understanding the Evolution and the speed of change in he IT industry can be jarring. Trying to make sense of it through [many reddit posts](https://www.reddit.com/r/devops/) can send you down a spiral also. I think I might write a few things about what I have learned about these terms, what they mean and how they work and continue to define these things on a yearly basis, or go back to this blog to see if what I wrote today, is still viable next week, or next year. Here is a list of some key concepts of Devops and Cloud/IT/Software based terms and strategies. 

## Agile 
Defined as Iterative and incremental development.
![AGILE](/assets/img/blog/software-methods/agile.png)

[The Agile Manifesto](https://agilemanifesto.org/) dictates the following. 

" We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value "

* Individuals and interactions over processes and tools
* Working software over comprehensive documentation
* Customer collaboration over contract negotiation
* Responding to change over following a plan

Essential Agile is an approache or process that involves breaking the project into phases and emphasizes continuous collaboration and improvement. Instead of Let's build a car! Put it all together and get it out. Agile is more like, Let's build a car, lets first draw out the blueprints, then build the wheelbase, then the body, then the trunk, then the insides, then the engine, and so on. 

## Scrum
Scrum is an iterative, incremental methodology for project management often seen in agile software development. 

![Scrum](/assets/img/blog/software-methods/scrum.png)

##### Image Terminology

* Spint Backlog - Short duration (3-30dyas) milestones for ship-ready release.
* Planning - Time to discuss possible solutions for challenges/features pulled from backlog or discussed in meetings.
* Implementation - Time where which coding, testing, building is done
* Review - Completed testing, pushes to staging, last minute documentation, syntax checking, release notes.
* Retrospective - Review changes, on a scale of 1-10 how burn out are you? Can you do this again in a two week sprint? 
* Definition on Done - Explain what done means to the team? Do we ever go back to looking at this? Did the duct tape work or will we need to add updates later to our sprint backlog and find someone else to do that next time the adhesive from the duct tape wears out. 

##### HISTORY OF SCRUM
The name scrum came from rugby, where the whole team "tries to go the distance as a unit, passing the ball back and forth." Likewise, in scrum, the development phases strongly overlap and the whole process is performed by one cross-functional team across the different phases.

##### Key Concept of Scrum
A key principle of Scrum is its recognition that during a project, there can be requirements churn, and that unpredicted challenges cannot be easily addressed in a traditional predictive or planned manner. As such, Scrum adopts an empirical approach accepting that the problem cannot be fully understood or defined, focusing instead on maximizing the team's ability to deliver quickly and respond to emerging requirements.

### A scrum with no name
For scrum to work well, it requires a specific environment. With the way that large companies are churning out iterative updates to compete with new and compeling software (think Instagram adding stories because of its popularity in Snapchat and other apps), Scrum can be integrated into making these updates if your environment has the following: 

* Increments of valuable work are delivered in short cycles of one month or less (known as Sprints). 
* Ongoing feedback occurs during the Sprint, allowing for inspection and adaptation of the process and what will be delivered. 
* A scrum team has a Scrum Master, product owners, and developers, who are accountable for turning the selection of the work into an  Increment of value during a Sprint.
* The scrum team and other members of their team, org, users or customer-base feedback (or stakeholders), check and evaluate the results of the Sprint and adjust for the next one.


The problem with Scrum that most Engineers fall into (which I have personal experience with) is that best – or good – practices embraced in Agile software development. When you are in a transforming organization where management is looking to push Agile and Scrum meetings to all aspects of the organization to solve everyones problems, this "may" be a red flag. If your on a team that is focused on sprints and metrics and camt explain the product they are supporting (even in vague detail), this may be a red flag. If your team is able to add iterative updates and high five each other but not write documentation on the changes, this may be a red flag. 

A few examples in which Agile or Scrum will not make your existing problems go away:
* The engineering workforce is not equipped for new projects and techniques.
* There is no clear view on the product vision and roadmap or priorities.
* Management is not involved in your most relevant projects and is not managing or leading. Most cases management is looking for metrics or KR's (key results) and don't care for the details of how things were implemented or the long term efforts involved in implementing the changes. 

Although an Agile working processes can help in solving these problems. Agile itself is not the solution to all existing problems. 

#### Silver bullets don’t exist. 
![man-with-no-name](/assets/img/blog/software-methods/clint-eastwood.png)
The Silver bullet in Software is defined as "A single technique or technology that by itself can deliver one order-of-magnitude improvement to some aspect of software development".
Many companies, since the pandemic has created a new wave of people wanting to become Work-From-Home Software developers/engineers, are looking for Silver Bullets engineers. In tech terms a silver bullet is commonly referred to as a command or tool to get something done. An example of that would be the ["kill -9"](https://www.reddit.com/r/linux/comments/1xvr25/linux_tip_dont_use_kill_9/) command in Linux/Unix. In this blog im referring to it as the [Man with no name](https://en.wikipedia.org/wiki/Man_with_No_Name). 

Decades ago, companies would look for specific engineers to come in and kill all opposing challenges in their environment. Like an old western cowboy who specilized in a specific networking stack, or a high level administrator who could rebuild any Dell infrastructure in a week, these guys/gals were special people that were whispered about in blogs and internet forums. These days orgs are looking for Full-Stack engineers, or high-level software engineer who works to design, test, and implement all parts of a software application or product. Youtube and the explosion of information over the past 20 years has caused a saturation of knowledge and learning to become a Full Stack engineer. The problem with this is that if you walk into a saloon looking for a cowboy who specializes in horse wrangling, youll find 10 of them at the bar. 

Issues with this become trusting that the engineer is able to complete the workload vs getting stuck with an incompetant engineer who only understands surface level knowledge and bought their cowboy hat from the dollar store. 

Companies are moving so fast to stay competitive and relevant that in most cases, teams are looking for someone to come in and kill their backlog by cleaning it up and not creating a larger backlog while performing all other tasks at high levels. This can lead to burnout and the cyclical illusion of companies looking for a Full Stack silver bullet continues. 

Many engineers are just looking for a Fistful of Dollars and work in environments where they can get work done, get what they need and leave to get more money, which leaves companies trying to find other engineers to come in and maintain the existing codebase while trying to remedy the previous damages that the previous engineer left behind. If your lucky these days youll enter the town of San Miguel before the Rojos and Baxters fought. 


### Extreme Programming (XP) 
Extreme Programming (XP) is intended to improve software quality and responsiveness to changing customer requirements. As a type of agile software development, it advocates "timeboxing", which is intended to improve productivity and introduce checkpoints where new customer requirements can be adopted.

An elements of extreme programming includes programming in pairs or doing extensive code review, unit testing of all code avoiding programming of features until they are actually needed
![Dilbert-on-extreme-and-agile-1](/assets/img/blog/software-methods/dilbert1.png)
![Dilbert-on-extreme-and-agile-3](/assets/img/blog/software-methods/dilbert3.png

Other elements of extreme programming include:
* a flat management structure
* simplicity and clarity in code
* frequent communication with the customer to provide and support feedback
* The expectation that changes in the customer's requirements are priority 
![Dilbert-on-extreme-and-agile-2](/assets/img/blog/software-methods/dilbert2.png)

[Image credits circa 2007](https://www.globalnerdy.com/2007/11/28/dilbert-on-extreme-and-agile-programming/)


### Lean Software Development
["Think big, act small, fail fast; learn rapidly"](https://eiexchange.com/content/41-think-big-start-small-and-learn-fast-8-rules-for)

Basic principles of Being Lean and Lean software development is defined as 
"A concept that emphasizes optimizing efficiency and minimizing waste in the software development process." 

This approach has origins that may be related to the Lean manufacturing movement of the 1980s (Lean manufacturing is a group of manufacturing techniques that were developed in the 1980s and early 1990s, mainly by large Japanese companies). 
Lean is now considered an integral part of the Agile software development methodology.

* Eliminate waste - Everything not adding value to the customer is considered waste
* Amplify learning - The learning process is sped up by usage of short iteration cycles each one bundled with integration testing.
* Decide as late as possible - delaying decisions as much as possible until they can be made based on FACTS and not on uncertain assumptions and predictions.
* Deliver as fast as possible - The sooner the end product is delivered without considerable defect, the sooner feedback can be received, and incorporated into the next iteration.
* Empower your team
* Build integrity in - refactor and repeat

### Test-driven development
Test-driven development relies on the repetitive practice that involves writing automated test cases that fail, then writing enough code to make the test pass, and then refactoring both the test code and the production code. By writing the test code first, your focusing on the behavior of a unit or its interface. With production based code delivered under this method, code is much cleaner and less complicated. Testable code is clean and should be simple enough to isolate and test with ease.

### Water Fall
The waterfall model maintains that one should move to a new phase of developemnt only when its preceding phase is completed and perfected.
![waterfall](/assets/img/blog/software-methods/waterfall.png)

### What makes you Agile? 
A large part of teams and organizations claim that they use Agile or ask if your familiar with Agile, but the perception of creating Scrum teams, or using Kanban boards, does not make you an effective Agile company. Like a game of double dutch, Agile teams are never ready, never stops learning, and never stops adjusting. 

A lot of organizations have been in an Agile transformation for some years now. Even Nike has found a way, [through its digital transformation](https://fabric.inc/blog/commerce/nike-ecommerce-strategy) to incorporate Agile into every part of their infrastructure. Will these organizations keep challenging their teams and product managers? Do they adapt their tools and engineering skills to new features and insights? Have they adopted practices that will last long and provide stability to the team? Is there enough time to sit down and think about the changes being placed in a 30-60 minute stand up meeting? Does this feature fit right now or will this be a backlog issue in the next couple of years? Answering or defining these questions/strategies may be the best approach towards being Agile.

###### Your Team’s Age and Skill Level
Many teams consist of new engineers still trying to adapt to the environment, so understanding who the Subject Matter Experts (SME's) are and utilizing their knowledge and skills to make sure incremental changes provide value without bloat is important. 
###### Your Coaching Philosophy
Are we Lean and mean? Can we keep the team together if one person "wins the lotto" or "gets hit by a bus"? Having an SME is one thing, making sure everyone is contributing their part and the SME doesnt get burn out like Kobe and the triangle defense or James Harden in Houston is important to a teams longetivity and success. 
###### Your Team’s Personnel
An offense may look great on paper, or you may love watching your favorite college team run it. But will it work for YOUR team?
Consider the strengths and weaknesses of your team before pushing towards Agile. Just because Nike and [Netflix](https://www.engadget.com/2018-03-10-netflix-streaming-tech-hollywood.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAABbwgrTvZiCezqjOU1PGNQoRxdQ3b58ywJTf16YB2GgnXpuQYRovx6NWwHhqkX-rzQ7JSyvjujaIUfwlHsAISooN3BsRQvseKX8FmosURdTdUz7pgIqrXYmgecRUYqqaEDk5c6BAUQ4k7qfik788awTUjk6NX-9_2ix3nkHetBZY) can do it does not mean that you have to compete and get swallowed but by new technology that may be redundant or too costly for your environment. 
Consider your teams strenghts and focus on creating resilience.

###### Your Defensive Philosophy
This is ALWAYS overlooked. 
Ideally, a team’s offensive and defensive philosophies will fit together. Anyone who knows sports is familiar with the term "Defense wins championships", but how does that relate to Software. Well, a teams ability to recover from production based damages or fires is what can make or break a team. Yes, hackers stealing data and companies having to share information like that to their shareholders and make public statements is crutial and can kill a product, but how does your team react when your down week after week and have been fighting fires for a month. How does backup strategy look? Does your cloud based app/product run well in a multi cloud environment? Can you switch between cloud environments if your AWS costs get too high? Can you pivot when all your production servers need to change because of abrupt [Redhat changes](https://www.theregister.com/2023/06/23/red_hat_centos_move/#:~:text=2020%3A%20Red%20Hat%20ends%20development,code%20available%20to%20non%2Dcustomers.). Are you able to pay a new bill if your devops revolves around a group of tools that just got [bought by IBM](https://newsroom.ibm.com/2024-04-24-IBM-to-Acquire-HashiCorp-Inc-Creating-a-Comprehensive-End-to-End-Hybrid-Cloud-Platform) and might hike up prices like [Vmware products afer the Broadcom purchase](https://investors.broadcom.com/news-releases/news-release-details/broadcom-completes-acquisition-vmware). Is your team equipped and able to adapt from [Terraform to OpenTofu](https://www.env0.com/blog/opentofu-the-open-source-terraform-alternative) if they are forced to? 
Will [Redis license changes](https://arstechnica.com/information-technology/2024/04/redis-license-change-and-forking-are-a-mess-that-everybody-can-feel-bad-about/) force you to slow down the new features of your app to find and rebuild your caching or key databases? I could go on for days

 
### Conclusion and Comics 
In conclusion Agile practices and principles are great, but just like coaching a sports team these four things are critical to consider before jumping into Agile and Scrum practices. Investing in training and coaching new people or hiring experienced Engineers is key to having a team succeed, Not competing with the best strategies or rushing to be Agile. Invest in your team and their knowledge, invest in the research and approach. Focus on slow growth and sustainability. And always remember... 

## An investment in knowledge pays the best interest.
