---
layout: post
title:  "Flask Boilerplate Template"
date:   2024-06-19
excerpt: "creating at template for flask projects"
img: "blog-headers/python-flask.jpg"
project: true
---

#### Give me six hours to chop down a tree, and I will spend the first four sharpening the axe
While using [Roadmap.sh](https://roadmap.sh/) to refresh and keep my python skills sharp I decided to start making tons of python projects to own and maintain. Many of the Python Lambda functions that I have helped update or worked on in the cloud feild are things I cant really show off because they are for work or were for work related purposes and have private information included. My goal in adding more value to these blog posts that no one reads is to start building out small projects that I can work on without restrictions. I have had tons of small ideas that I have always wanted to work on and can get through a coding interview or talk enough about code to get my a job so I dont have to write blogs on medium to share my knowledge in hopes of getting a job. These blogs can just be a time capsule of when I first shared a project and a reflection on my thoughts, ideas, and fun with projects.

### My goals
My goal with using roadmap.sh is to take the things I know in Python, like lists, arrays, functions, and modules, and start learning more ways to utilize python for all types of things. One thing that Python is known for, but isnt commonly used for is Web Development. As someone who has built wordpress, react, angular, and basic html,css,js based websites I know there are tons of other web frameworks and languages that can be used for making web apps, but the idea that Python can be used is great. With all that being said I have created a few projects using Flask. My goal is to build out micro projects, and hopefully by the end of the year build out the "big project" that has been on my mind for quite some time. I have had a few struggles with how to go about building the project and finding solutions for populating data so these small projects will help with that.

### Templates
I even decided to create a boilerplate template for these projects as well. This will allow me to maintain that boilerplate and add more features as I see fit instead of finding the newest free template online. Free templates like [creative tim](https://www.creative-tim.com/product/material-dashboard-flask) are colorful and decorated and I have a big fan of using template to get projects off the ground. But these projects are not for yall. They are for me. I dont know if creative tim  in the future will start charging or changing or remove the free templates and the typical behavior with templates is to grab and go. These flask projects and the template I created will allow me to fully understand and utilize bootstrap and flask to its full extent (instead of grabbing a template, find and replace names, and connect a database).


### Choosing Flask
I decided to use [FLASK](https://flask.palletsprojects.com/en/3.0.x/) as my web framework to knock out these small projects.
Flask is a micro web framework written in Python that helps developers build web applications. It's known for its flexibility, simplicity, and lightweight nature, which makes it suitable for both small projects and larger, more complex applications. Flask is ideal for smaller projects or prototypes due to its lightweight nature and minimalistic design. Django, another Python framework is suited for larger, more complex projects requiring robust features and scalability. These projects dont need authentication, wild routing, or an [Instagram ready website](https://instagram-engineering.com/types-for-python-http-apis-an-instagram-story-d3c3a207fdb7).

#### Projects Now and Projects Later
These 3 projects are simple enough to blog about and to throw up into the public world for people to see. As I find more free time my goal is to create projects for testing things like HTTP endpoints, database connections and data, and some other worthwhile projects. For now, enjoy the scraps lol.


#### Flask-template
A template to use for building your own flask projects
![image](/assets/img/blog/flask-templates/flask-template.png)

#### Flask-TinyURL-Shortener
A Tiny Url shortener
![image](/assets/img/blog/flask-templates/url-shortener.png)

#### Flask-Quote-Generator
A Random Quote generator
![image](/assets/img/blog/flask-templates/quote-generator.png)


#### Test Cases
To use these templates you an pull and run the docker images that were built with Github Actions.
You can also download the projects on github and tweak them to your liking.
Because they are working templates you can also use these docker images for spinning up kubernetes or docker images for testing out those platforms as well. I run into issues where I want to test out a kuberentes manifest and just confirm that ingress routes are working or that logs and permissions are working properly but when I look online for simple docker images I find things like wordpress, grafana, and docker's hello-world app. These apps are a less complex, but a bit more complex than a hello world app. So they should be great for a spin up/spin down environment or container development.

#### Docker Run
To run the current flask projects you can run the following commands
```
$ docker run tedleyem/python-flask-template:latest
$ docker run tedleyem/python-shorturl:latest
$ docker run tedleyem/python-quote-generator:latest
```

# Conclusion
The journey of a thousand lines of code begins with a single step. I think thats how the quote goes.
This year has looked to be a promising year and its half over already. Although I have 10 years in the IT industry from support technician to DevOps Engineer, I have learned that having your own workshop at home and building out a development environment so you can continue to sharpen your skills and remind yourself of why you like what you do and why you do it. My wife who hadnt watched any of the IP man movies had a fabulous time watching as Yip Man was knocking people off tables and saving his town. I however, was captivated that every movie had a point in which he would [train on a wooden dummy](https://www.youtube.com/watch?v=0ZGLNpaaPzg). Its reminds me of the quotes “Wisdom comes not from age, but from education and learning.” and “Learning never exhausts the mind.”