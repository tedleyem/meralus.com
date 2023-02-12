---
layout: post
title:  "Devops and Healthcare"
date:   2022-12-25
excerpt: "paint a picture of the DevOps philosophies in the Healthcare industry"
img: "blog-headers/healthcareDevOps.jpeg" 
project: true  
---

### DevOps and Healthcare
By Tedley Meralus
 
If the pandemic has shown us anything, it is that you must always be prepared for change in all aspects of your life. The healthcare and IT industry have rapidly been adjusting to the break-neck speed of changes since the pandemic. Devops Engineers and experienced Nurses are in high demand anywhere you look. Some would even say DevOps is gaining steam in healthcare as the ongoing digital transformation and hospital expectations reshape the industry. Picking up on buzzwords like Agile and DevOps can be just as hard as remembering common practices to help a myriad of patients with different needs and challenges in nursing or the Healthcare industry. As a person who lost his grandfather( 04/01/2020 at 91 years old) and twin brother ( 04/11/2022 at 29 years old) near the beginning of the pandemic (about a month after the president considered it fake), I have experienced and witnessed first hand the real-time demands for patients needs, and the speed at which hospitals have to operate to meet those demands. Patients wanted convenient, safe, and digital access to health records to help comfort the devastating blows that loss of life or disease may affect a family.
Healthcare organizations responded to patient demand by using automation in many cases; for instance, using chatbots to assist with common FAQs for patients to gather information quickly, sending reminders for appointments or alerts for test results through new digital applications, or even using remote software to communicate with those need assistance in remote locations or limited access to hospitals.

The energy of DevOps has expanded to adapt to the volatile landscape of the public health field and Healthcare industry. But DevOps in healthcare involves more than just the IT department. It involves the many clinical, business and financial teams that make up any organization in the highly rigid and regulated industry of healthcare.
**My goal in writing this blog is to try to paint a picture of the DevOps philosophies, tools, and practices in today's IT industry and discuss how its practices are not only implemented, but also beneficial, to the advancements in the Healthcare industry.**

Firstly, let's define a few things. Let's go over what DevOps is and what it stands for. According to the definition on wikipedia,

 " DevOps combines development and operations to increase the efficiency, speed, and security of software development and delivery compared to traditional processes. A more nimble software development lifecycle results in a competitive advantage for businesses and their customers. It is a concatenation of Development and Operations, a method that emphasizes collaboration between the entire spectrum of professionals involved in creation, development, and deployment of software. "
 
 Also, as defined on wikipedia, Agile practices include requirement discoveries and improvement in solutions through the collaborative effort of self-organizing and cross-functional teams with their customer(s)/end user(s), adaptive planning, evolutionary development, early delivery, continual improvement, and flexible responses to changes in requirements, capacity, and understanding of the problems to be solved.

While juicy and somewhat straightforward, these definitions hardly explain its direct concept and idea.
As a DevOps Engineer, I think of DevOps as a set of behaviors, concepts, and tools that allow a team to function; a playbook if you will. The idea differs from the Agile mindset, which focuses on the ability to move a project along a flexible timeline which can be subject to change depending on client/customer feedback).
Agile can be looked at as the evolving playbook for DevOps. As a result of this, Agile is broken down as " Planning that is small, fast, and open to change '' but it focused more on the software development cycle's planning. DevOps, on the other hand, looks beyond that and encompasses all the steps from concept to delivery of a service/solution/product. In layman's terms, if you think of Agile as documentation and discussions that doctors go over, you can think of DevOps as the tools, software, and equipment that doctors, nurses, therapists, medical staff  use to keep the Healthcare industry beating.

The DevOps philosophy stretches beyond just the work cycle. The focus is on how the members of a team function, interact and can be most successful. This means considering all pieces of the puzzle.
Creating this puzzle can look different for all different companies. There is no single answer to “what’s the right toolset”, it is more about what works for your organization.  Just like a hospital, there are functions and rules in place to allow medical staff in the field to be well equipped to handle all the things that come their way, and continue to move like water.

For clinics, medical offices, and healthcare organizations, the ability to have a highly automated infrastructure and using a DevOps methodology is more attractive to work for because they have a more streamlined, effective environment. Automation of daily routines is a fundamental expectation now for employees in all fields. DevOps is all about working better together and innovating faster; fostering continuous development, deployment and measurement; and breaking down silos that had previously hampered processes. These are also important aspects of modern healthcare.

In DevOps the methodical "structure" consists of: development, testing, integration, deployment, monitoring, and systems administration. Here is how that is broken down.

### Development 
When it comes to development tools, there is a never-ending list of options. Common questions that come up in the development process span from "What language is best for the job" and "What tools work best for the environment". Language is often dependent on what the application's purpose is. Is it a simple web application for information? Could PHP and Wordpress suffice the need for a medical website that needs to provide information on what services are provided in their clinics, or what procedures are practiced at this specific hospital? Will the application be more for Analytics, finding a census on how many people have been affected or treated with covid-19? Maybe the Python programming language would better suit those needs. Does the language need to be well structured, or popular, or historically accounted for in terms of dependability? Maybe Java or Perl fits those needs.
Other than choosing the right language or application, the key in the development process is making applications that are usable in order to make our users’ lives better and easier. Development, both from a Software Engineer and Medical professionals standpoint, is a revolving door of proactively developing solutions to components of an ecosystem to keep teams consistent in achieving their goals.
To make these things possible and make lives easier, version control techniques are introduced. Currently, the most popular version control system is Git, but there are still plenty of solutions in the world.


### Testing
Testing will always be a hot topic for software engineers until the end of eternity. There are many parts to testing tools such as Git and other code testing applications that assist in deliverable solutions. One can think of git like the tools used to store and create the handbooks and procedural documentation that gets updated in hospitals. Those computers store and update those documents in an area that is accessible to teams to create a distributed and linear workflow to make sure each team has the knowledge and equipment needed for their jobs.

Tools here include Selenium, used for application and browser testing, Travis CI and Jenkins for continuous integration testing, or Nessus for vulnerability scanning. The importance of lab testing in modern healthcare cannot be overestimated. Most hospitals maintain an on-premise laboratory to obtain immediate results for urgent medical conditions at all hours of the day and night. Ensuring the stability of an application before it hits the public eye is crucial. We have seen what negative testing can do during the wake of a pandemic, along with the nature of rushing solutions without testing. If Devops can learn from the Healthcare industry over the past few years, it's safe to determine that testing is a critical aspect to the toolchain and the preclusion of bad products/solutions going to market.


### Continuous Integration/Continuous Delivery
Continuous integration isn’t really a new concept, but it does add to the DevOps toolchain in important ways. Companies like Travis CI and Jenkins have been working for years on developing a seamless approach to integrating new code into an existing operating stack.
Adding this concept to the idea of Continuous Delivery, we start to curve the cycle of our DevOps setup.
Continuous Delivery allows an automated approach to pushing out code to stable states for the deployment process of the toolchain to take place. Continuous Deployment exercises in Healthcare can look like facilitating regular compliance standards and providing that information publicly to not only increase patient satisfaction but keep a competitive advantage that can help support Data Science initiatives. One of the core practices of Devops is having infrastructure as code. This involves, but is not limited to, configuring and controlling environmental resources with code to help with configuration changes. Managing techniques and implementing resources allows Devops Engineers to make changes to networks or infrastructure easily repeatable and helps with standardizing these changes. Implementing policy as code for Medical institutes allow teams to establish and monitor things like HIPAA compliance at scale and identify risks with ease. This helps make expansion of clinical buildings and hospitals to become seamless and structured.



### Deployment and Delivery  
Deployment and Delivery can look very different from any Devops Shop you go into with the use of cloud services, hosting solutions, containerization, or other buzzwords like serverless or cloud-native solutions. Popular looks like Ansible, Chef, Puppet, and Terraform are used to help take the infrastructure as code approach to deliver stable and production ready code to public environments. These approaches are all dependent on a company's needs. As the tech industry moves as fast as these buzzwords fade away from social conversation, the adoption and deployment of these things move at a much slower pace. Some organizations are just now beginning to feel safe moving to containers and serverless and although the cloud has become extremely popular, there are many enterprise level customers still using bare metal and staying away. Once a decision is made on which new infrastructure to adopt, teams come together to handle anything behind a single application tier. Most of these teams consist of developers, troubleshooters, quality assurance testers, and even DBAs to look at issues with databases. After teams all agree to the changes at places, methods are set in place to slowly push these new changes into production environments. These can look similar to rolling out COVID-19 tests at local grocery stores, pharmacies, or the shipping and delivery of new over the counter drugs to local medical facilities as well. It is not uncommon for some healthcare providers to use AI based tools when finding an approach to deploying new products and solutions to help with risk probability and obtain satisfaction feedback. There is even a National Healthcare Quality Award (NHQA), an annual competition for hospital accreditation, where smart healthcare is an item of focus. Deployment at scale for hospitals and other medical practices have tools in place similar to that of ansible and terraform that help with analysis, efficiency, and deliverability.


### Monitoring
Being able to view infrastructure systems and see what they are doing has become a critical part of staying on top of changes and making sure teams are not left in the blind during an outage or disruption or natural disaster.
Monitoring tools like the ELK Stack or Grafana come into play. Most important data also comes with change logs or logs of data and information. Popular and Longstandings tools like Splunk, and Datadog, help provide more insights into what our applications are doing (and saying) while they’re out there in the wild.
The ability to see your infrastructure and feed that back through the team to improve is critical to success in the market of application development. Reports, Statistics, Analytics, all circumference DATA, which is one of the many heartbeats of the Medical industry as well. It concludes the end of the Devops cycle, but is also the beginning.

### Communication
Like any relationship the most important component of them all is communication. This is also the most interesting part of the DevOps philosophy. The tools used in all aspects of our life are what keeps the moving parts of any organization moving. From Slack, to Microsoft teams, to the collaborative and cooperative efforts of Zoom, Skype and other video conferencing tools that are well known, they are the key to a successful DevOps implementation.


### Conclusion
DevOps is incorporated in both worlds. It is not only a set of tools to streamline your organization, but also the philosophy applied to those tools, and the teams working with them.  All of these elements must come together to improve your application and how it interacts with end users. By bringing together DevOps philosophy and tools, you can empower a team to make successful DevOps implementation a reality in any workplace.
 

