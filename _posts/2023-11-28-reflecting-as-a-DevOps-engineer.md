---
layout: post
title:  "Reflecting as a Devops Engineer"
date:   2023-11-28
excerpt: "My thoughts on the Devops world and its current state"
project: true
img: "blog-headers/devops-is-burning.png"
---

##### Reflecting
Over the past few years I have noticed and learned a few things as a Devops Engineer. I have worked for smaller obscure companies, robust and resilient companies, and some of the biggest retail companies in the US and found a few common foundational problems show up in all of them. The DevOps and Cloud Engineering feild typically has a mix of these cultural problems listed below and I want to take a little time to share my experience as I grow through my journey. Reading through forums, social media threads, and other blogs sites I have noticed that there are hundreds of others that have been [feeling the same way](https://www.reddit.com/r/devops/comments/ri13en/what_are_the_top_3_problems_you_face_technically/?share_id=tcisAso0L0n9mjCO8hWo_&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=1). This may come off as a rant, but its not. I see it as an understanding of the feild and the work, and documenting some of my thoughts on it so I can release it from my mind and not let it weigh me down or deter me from burnout.

<u>Current Problematic Trends in Devops</u>

* Devops being used as a tool and not a methodology or practice.
* Too many tools for the same job (swiss army knife)
* Agile/Sprint Planning transforms Engineers into [Sisyphus](https://www.britannica.com/topic/Sisyphus)
* Poor documentation
* Siloed engineering
* The Tokyo Drifting of Agile


##### The 12 Factor App
When I remember, because nobody is perfect, I refer back to the 12-factor app when I need some guidance on the best way to make sure an app is structured the way it should be and is secure
when being deployed. Every app you work on is different, just like every house is different but you can always find the same kind of architecure in a home. The triangular planning on the kitchen appliances (stove/range, sink, and refrigerator) or the cookie-cutter style of townhomes in a community are goood examples. The 12 factor app is like that. So when I begin work at a new place and look at how the spaghetti string of code is all written and wired together I try to remember to go back to this to see if there are similarities or where there may be painpoints in the future. Many engineers and developers come from a syadmin background or a programming background so they are skilled in certain areas but not in all areas so being able to refer to some kind of documentation like [the 12 factor app](https://12factor.net/) is a good place to make sure my foundational knowledge of app development is intact. It can be very hard or confusing to try and jump into a system of flowing infrastructure and find out where you can perform your best or be a valuable part of the team and in my reflection, I have been re-reading this guide.

##### The Swiss Army Knives of Grace
Many times I feel that most people have this idea or expectation that DevOps stuff is bug free, and code is written to work without errors or workarounds and perfect from the beginning. However, developers can refactor or restructure the way a header or footer or a button looks six ways till sunday and nobody has a problem with that. It has become such commonality that if you dont have a good manager to block the questions and request youll be left with a team or DevOps guys who are trying to be the swiss army knives of IT and get burnt out. Those are the types of people I run into a lot. Guys/gals that are so tired they have resorted to "thats not my job" mentality because of the high demand and frequent requests to add new features, make changes that someone would consider small, or take on new projects to help a single component of the SDLC. This creates a ripple in the waters of Devops work that leads to Engineers being able to gain an understanding of multiple tools and processes but not having enough time to master or further educate themselves. I do my best to be aware of and vocalize my strenghts and weaknesses in a team so that others can feel comfortable enough to share their strenghts and weakenesses. This allows us as a team to give each other grace when the rest of the departments are wondering why we arent getting to their ticket requests, change requests, tasks fast enough. If the chemistry of a team is competitive it can lead to great solutions coming out but if everyone on the team is competing against each other you have what can look like a broken down and beaten swiss army knife.


##### How many hammers is needed to secure the wood to the fence
The speed of

##### Agile/Sprint Planning
To iterate on the topic of speed and working together, I bring you... devops close your ears... Agile and Sprint Planning!

The dreaded [Agile methodology](https://www.atlassian.com/agile) is a project management approach that involves breaking projects down into sprints to help organize and prioritize the needs and bottom lines of businesses. It reminds me of the [triangle offense](https://en.wikipedia.org/wiki/Triangle_offense) of Phil Jackson's Lakers from the early 2000's. Every company begins to adapt to the idea and can see how it helps other big competitors, but when your in the trenches of devops and the software development lifecycle you quickly pick up on the pain points and disadvantages. Just like the NBA draft and the trades of big named players to create superteams, this can either be a great fit or a terrible failure that leads to loads of back logged issues that no one has time to get to. A few disadvantages to Agile Methodology are

* More time and commitment
* Lack of documentation
* project drift
* unpredictability of time


Every place I have worked with has found a way to take the disadvantages of Agile methodology and chalk it up as some kind of overhead cost until a vulnerability is found or a database wasnt backed up and there is no documentation who did what or when. Communication is key to get any team to achieve their goals but with Sprint Planning and setting sprints to 2-week or 1-month intervals there is a constant needed for interactions. meetings, discussions, and mental energy to walk through processes which creates less time to actually work on a solution and allow time for staging and bug checking.

I find that this brings a level of stress that most people overlook. The stress comes from the inability to take time for testing out a solution and making sure that it is scalable or has enough documentation for future modificiation. An example in a 2 week sprint that I see all the time goes a little something like this. First day planning involves multiple meetings on finding a method to solve a problem. First week involves more meetings on solutions found and which solution is right for the job, then end of the week. Second week involves creating the solution and testing that it works, spending a few days to test against whatever security or test environment is setup within the infrastructure and pass all green lights and checkmarks. Then push to production and move on to next sprint and next topic until said solution breaks or is no longer needed. Just because a solution works and is fixed doesnt mean that it may not introduce issues when customers get their hands on it or utilize it differently than expected.

By the time the solution comes back around and is broken because of other updates, changes, or restructuring, engineers are left trying to find out how the solution worked in the first place and how to get it to work again and write documentation on changes to how it got fixed to solve a problem, but now how or wby it was implemented. For many front-end developers their work can be seen and viewed by their team or the public so if a grid isnt responsive or the colors of a page are wrong they have immiediate feedback. With code and back-end developers its harder to get immediate feedback. Just because a test passed saying that code passed a check doesnt mean that code is doing everything it needs to do. An example would be getting an all white homepage for an apache tomcat web application instead of a page with content and information on it but getting a 200 - OK message in your testing environment beacuse the page loaded and the application is running.

Sprint planning is attractive because its flexibility and adaptiveness to change make it the ideal for project managers and directors above the working chain of command to understand that problem X may be resolved within this sprint or can be added to a future sprint. However, commitment is involved by everyone in Agile methodology which reduced the time for documentation, prioritizes the projects that can get done quicker and can have project run behind or go beyond the original scope of the project.


##### Sisyphus Metrics
To reach metrics opens up backlogs and drifts so big that engineers become a [Sisyphean](https://www.britannica.com/topic/Sisyphus). The term Sisyphean is describes a task that is impossible to complete. It refers to the punishment that Sisyphus receives in the underworld, where he is forced to roll a boulder up a hill repeatedly for eternity. This may be a huge reach but cheating death in Devops would be equivalent to writing documentation, moving lower priority tasks to a backlog without actively creating a plan or a time to work on it in the future, or find ways to solve the Epics,Stories, or tasks to gain higher recognition for your work and dismissing the needed remedial work of adding tags to cloud resources, or confirming backups are validated or compoenents are stable before passing them to development teams.

##### There is an I in win but not as a TEAM
The domino effect that takes place when engineers are working on sprints and priority tasks can created whats called "Siloed engineering teams". The speed of implementing Agile planning or using it can be so attractive that most engineers dont get a say in whether or not it works for their team. Directors are told that investors or sponsors want to know if their team is "Agile" or if they user "Scrum" if they can deliver a product within X amount of sprints and when a director says yes it is inevitably pushed to engineers to deliver and provide feedback in the the form of Epics, stories, and tasks. This can sometimes create a the idea of a LEAN and Agile teams can mean that engineers have to work on isolated tasks and be spread thin so that all metrics are met and your department is reaching its goals. Reach goals means everyone is winnning right? Looks can typically be deceiving. Breaking into Silo Engineering, which can naturally happen, means that the admins turned cloud engineers or programmers turned cloud engineers dont have the time or havent inovated a culture of cross collaboration. In my current job it was discussed and brought up in a meeting and our manager prioritized the destruction of siloed engineering. This allowed us all to work together and structure our tasks in a way that allowed the subject matter experts working on one area to fill us in on what they were doing and how we can help. It encouraged new ideas, enhanced documentation, and allowed all the work to get done faster and efficiently. The siloed engineering had only been done recently and I spent a bulk of time working on projects that hadn't been touched or modified in 7 years which turned me into the SME of that part of the SDLC. A few friends and engineers I speak to say that this is a common occurance in which, teams within teams, or engineers within a team are spread thin and have to rely on their own "self-starter" atitude to get jobs done.


##### Poor Documentation
Little to no documentation for most of the current infrastructure or applications on a platform is expected these days. Any documentation available had suffered from years worth of deprecated steps or ideas. Agile planning and the culture of "sprinting" to the finish line doesnt leave room for writing documentation on proper form, mandatory steps, small guides on project scalability, or anything of the sorts. Most documentation has resorted to teams leaving comments in code instead of README's so that they know why a method is being used or changed, or one-line
changelogs for applications. With the culture of higher salaried Engineering jobs, Remote work, and other benefits in tech there are engineers leaving companies and companies hiring engineers on contract like terms to resolve backlogs or issues left by other engineers. I have experienced this first hand with a few contracts I have worked. Poor documentation often forces me to spend valuable time between countless meetings to find essential information on how a process even works, which hampers my productivity, which brings down metrics, and then has people questioning an engineers skills. Without clear guidance, im left most times to reverse-engineer code and resort to trial and error of getting deprecated configuration managment tools like Puppet out of the infrastructure and create a new method of cleaning up code, before I get a chance to solve the existing problem or come up with a solution.

##### Tokyo Dift
Many times I find that there is a gray area in Devops Infrastructure. Soon to be deprecated code is still in place while current infrastructure is being built. Current infrastructure is being written as IAC with an ansible repo or terraform project to assist in a fast migration. The problem occurs when teams have to keep the lights on while everything is in a fragile state of migration. When can we plan a change window to implement the new IAC, should we keep the new database and old database running at the same time and bite the bullet on the cost of RDS's in AWS? When do we plan the time to migrate the application over to the new infrastructure and confirm that we have enough engineers on staff to manage the upscaling without driving everyone to burn out. If we continue like this can we hire new engineers to assist in managing old and new infrastructure? These questions are typically answered with a gavel by the IT Director or manager and has multiple resources quickly falling into a backlog and an infrastructure drift that many teams experience and accept. When a car is drifting down a racetrack it may be wearing out its tires (or creating burnout for engineers) but the car is still making its way to the finish line which is all management wants to see. I have found this to be an acceptable criteria for most teams because incremental fixes will eventually merge the drift into a backlog that wont be on the radar for investors/clients/consumers to worry about in the long run.


There are a lot of [advantages to agile](https://builtin.com/agile/benefits-of-agile). Like faster fixes and solutions to problems, an increated room to experiment new features, a visible path to success, and customer feedback that can be answered or resolved in a timely fashion. I don't want anyone reading this to think that I shy away or dislike the Agile methodology, I've just noticed the similar inconsistencies, experienced burnout, and some of the shared difficulties that it brings due to the rapid growth of cloud computing and technology.



##### Avoiding the pitfalls of Agile
In conclusion, from the outside looking in, Agile offers promising results and promotes faster project completetion, an efficient development process, and visibility on what teams are working on. But at the end of the day, its within the teams willingness to adapt, be flexible, and collaborate with others that make Agile work. As someone who has been in the feild now for a few years I can easily adapt to a system and use my set of skills in any environment to help any team along their SDLC, but, I still wonder. What do you do when a team is burnt out from looking at roadmaps, fighting with developers on fixes and features, and growning at the thought of daily stand up meetings that distract from their workflow?

What will be the new framework of management that will come along to resolve all this or help provoke a culture of Devops,Cloud, or Software engineers that can collaborate on projects, manage infrastructure, document processes and changes, and clean up backlogs, and not suffer from burnout? Only time will tell.

For any Engineers reading this make sure you take time to R.E.S.T

* R. relax your mind
* E. examine what you've learned
* S. study your surroundings
* T. take time to reboot*


##### Thanks for listening
