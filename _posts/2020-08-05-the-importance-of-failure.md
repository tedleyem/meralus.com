---
layout: post
title: "The Importance of Failure"
date: 2020-08-05
excerpt: "CCDA Validator and interview tests"
tags:
---
## There are many lessons in defeat,
https://www.wanderlustworker.com/the-importance-of-failure-5-valuable-lessons-from-failing/

An important lesson in failing is knowledge. Knowledge of self, knowledge of the past, and knowledge of the present, is what shapes the future. This COVID-19 pandemic has shifted my life in more ways than one. Losing my job, family members has thrown me, along with others dealing with the same dilemma into a hurricane of emotions. Now, I have failed more times than I’d like to admit, but they never keep me down for long.

Recently, in the midst of job hunting I have come across what a few failures, or jobs that passed on me. I have a variety of skills in tech and experience as a Sysadmin and Linux admin. I have enough experience on paper to prove my worth and my talent as a Linux administrator.I also have certifications, which for some have value and help bypass HR "firewalls" and for others just a piece of paper that determines your ability to understand concepts but no experience. Even with the experience and the certifications some job interviews just don't pan out well. I get extreme cases of test anxiety when taking certification exams, or tests in general, and always feel like I know the material but get lost in the multiple choice answers or writing down the exact commands, sentences, or phrase a test is looking for. Whether it be from not doing well with the skills challenges, or not having years of experience in categories they are looking for, or even being "over qualified", many people are left wondering what they did wrong or what went wrong in the interview. Since most of these skills challenges and tests get sent to an employer without giving you results it can be a struggle to find out where your weaknesses are. The rejection emails afterward can be a very humbling experience as well.

Getting rejection letters because hiring managers are looking for someone local, someone with more experience in X or Y, or the famous "It was a close decision between you and someone else and they ended up choosing someone else" can definitely feel like a punch in the gut. I'm a firm believer of the quote that "Every moment in life is a learning experience" so I treat this as such. I find it a productive way to stay focused and prepare myself for failures left hook and uppercuts.

With one of the jobs that passed on me they introduced me to a github project that they wanted me to setup within a specific time frame. I didn't get the job, however, I am aware of the software used and the skills needed so I decided to challenge myself by setting up my own challenges using the same example project they gave me. This way I can showcase the skills I have, possibly sumbit a pull request and help contribute to someone else's project, and have something to show for the next interview looking for examples of my talent.

The initial challenge triggered the idea to draft up another challenge I had at my most recent job as well.
I find that even though i'm currently unemployed and have the chance to finally catch up on Netflix or Hulu originals I find it better to utilize some of this free time I have to sharpen my skills and show off a bit of what I have learned. This will hopefully be a great timestamp I can look back to in the future and provoke more ideas, projects or challenges. I'll find another job that fits like a boxing glove and be able to punch my way out of any other obstacles I face soon. For now, I hope this blog evokes a reader to challenge themselves to show off a project that have been working on or find a way to showcase their talent as well and keep their skills sharp.  

Here are the two challenges and descriptions below.

 finish setting up the application but setup a jenkins build project to check and keep the application up to date. I figured this will showcase my skills in Linux, Jenkins freestyle projects, docker configurations, git, CI/CD, devops tools, and then some. That way, if I run into another interviewer who asks me more about my skills and my talents I have something to show and explain with documentation.

# CCDA Validator Challenge
The interview skills challenge wanted me to setup an application built from the Office of the National Coordinator for Health IT known as the Reference CCDA Validator.

Description: CCDA provides capabilities to validate your CCDAapplicable standards-specifications.

[Link:](https://github.com/onc-healthit/reference-ccda-validator)

Interview Challenge: Build out the CCDA validator on a given web server

In the README.md file you can see that the application requires the following

 a. Tomcat 7 (7.0.53 recommended) or above has been installed and NOT running. https://tomcat.apache.org/download-70.cgi
 b. You are using a pre-built referenceccdaservice.war file. In other words, the .war file was not built from the project directly.
    Such a thing is possible but beyond the scope of this document.
 c. With Tomcat installed and the referenceccdaservice.war in your hands, you are ready to begin configuration and deployment.
 d. Java 7 or 8 is installed and a JAVA_HOME is set. Note: Java 7 is recommended.


Steps are fairly straight forward.
Install tomcat, the referenceccdaservice.war file, Java 7 or 8, the needed Vocabulary Artifacts, scenario files,
and set the configuration parameters of the application to link to all the necessary files and directories.



## Solution: A jenkins build for a CCDA docker container
Github Link: https://github.com/tmeralus/docker-ccda-validator
Dockerhub link:

 Because the application requires a few external components its a good idea to make sure that those files
 are always up to date. A great way to do this would be in a jenkins freestyle job that will pull the needed files from
 other github repositories and make sure they are the most up to date files, and then build and test a docker container
 based off all the latest files and configurations for the validator.

[Setup:](https://github.com/tmeralus/docker-ccda-validator/blob/master/README.md)

## Jenkins Demo project
[Link:](https://github.com/tmeralus/docker-jenkins-build-projects)
[Setup:](https://github.com/tmeralus/jenkins-build-projects/blob/master/README.md)
login information
username: guest
password: guest
