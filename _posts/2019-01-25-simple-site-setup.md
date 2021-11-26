---
layout: post
title: Simple Site Setup
date:   2019-01-25
excerpt: "creating your personal piece of the internet"
tags: [blog, site, web, jekyll]
comments: true
---
![Image Title Name](/assets/img/blog/simple-site-setup.png){:class="img-responsive"}

Every sports champion has a ring or a jersey in the rafters that help show that their growth and accolades
in the game. Developers, young aspiring programmers, and Administrators don't have a hall of fame to showcase
their work but there are ways to let people see your accolades or follow you in your journey. Your "how I got here", the "More than a resume" page that sticks out if you will. Here is how to get it done with Github.

Before I get into it I want to express my frustrations when I find people online (more specifically Twitter) who have a domain
in their bio that link to nowhere. I get so excited to see young individuals like myself in the tech field and want to learn
more about what they know or what they are working on currently, just to find out that they didn't keep up with their site.
With this blog you'll be able to keep your site up and running, give or take you pay annually for your domain.


## Git and Github
For those newbies getting into programming or the tech field, the term version control and Github may be ready or said
in your journey. Lets define what Github is. GitHub is a web-based hosting service for version control using Git. It is mostly used for computer code. It offers all of the distributed version control and source code management (SCM). To simplify it, it is an online spot to post your code and projects to share and collaborate with others. Github, in my opinion is a mix between a "Dropbox" for your code and a small social hub for programmers. It provides access control and several collaboration features such as bug tracking, feature requests, task management, and wikis for every project. There are hundreds of open source projects that host their software on Github which allows you to view what new features were added and how they were added. This can be resourceful when you want to learn how a company builds and compiles their code.

To learn more about [Git](https://en.wikipedia.org/wiki/Git) or [Features in Github](https://github.com/features)


## Github and Gitlab Pages
The best part of this blog is using and setting up [Github Pages](https://pages.github.com/) and [Gitlab Pages](https://about.gitlab.com/product/pages/). Github Pages, is a [Jekyll driven](https://jekyllrb.com/) static site generator that is free to use to create plain text sites.
For those of you who have built sites only using HTML,CSS, and Javascript can rejoice because this will allow you to now use your knowledge and create your own site, and let these Pages do the heavy lifting and server hosting for you.

 Those who use php or python (flask, django, etc) wont be as excited. GitHub Pages is a static site hosting service and doesn't support server-side code such as, PHP, Ruby, or Python.


### Finding the right theme
Some of you readers don't have the time to build a static site from scratch and want to find something simple to use so you can start blogging or showcase your talent. For the ones that want to do that download one of the themes below.

### Various Listed themes
[Jekyll themes](http://jekyllthemes.org/).

To create a resume or Freelance page you can download the  theme here.
### Freelance Theme
* [Demo](http://jeromelachaud.com/freelancer-theme/)
* [Github Source](https://github.com/jeromelachaud/freelancer-theme)
* [Shoutout to the developer](https://github.com/jeromelachaud)

### Freelance Theme 2
* [Demo Link](https://volny.github.io/creative-theme-jekyll/)
* [Github Source](https://github.com/volny/creative-theme-jekyll)
* [Shoutout to the developer](https://github.com/volny)

### CV/Resume Theme
* [Demo](https://jekyller.github.io/PanelCV/)
* [Github Source](https://github.com/jekyller/PanelCV)
* [Shoutout to the developer](https://github.com/jekyller)


### Blog Theme
[Demo](https://wowthemesnet.github.io/mediumish-theme-jekyll/) theme here.
* [Download Link](https://github.com/jeromelachaud/freelancer-theme/archive/master.zip)
* [Github Source](https://github.com/wowthemesnet/mediumish-theme-jekyll/)
* [Shoutout to the developer](https://github.com/wowthemesnet)

Once you have your theme downloaded or ready to use, Login to Github and create a new repository.

The name of the repo will reflect the domain name that people will use to view the site.
 Ex: [username].github.io

 Note: It’s important to name your repository in this manner; this will tell GitHub to host the files in this project automatically and display them when someone points their browser to:
 Ex: http://username.github.com

In the description of your repo I would suggest writing "My little corner of the internet" but you can write anything to remind you that this is your project site.

Once you have your repo completed you can download the project onto your computer to edit with an IDE.

## Private Vs Public Repo
The site will be available to the public along with the code written on the site so if you have projects or blogs drafted (which we will get into later) that you dont want to show anyone its best to go into the settings of the repo and make it private. Since the aquisition by Microsoft Github has now allowed the Github free users to create free private repos (which were once $7 a month per repo.).

Click the green "Clone or Download" button of your new repo and download it to your machine. I would recommend created a folder in your documents directory and name it github, then put your project in that folder to stay organized with more repos in the future.

Extract the project folder and then move your theme of choice into the new username.github.io project folder.


The jekyll projects are broken down and constructed with a specific directory structure.

`includes/`
`_layouts/`
`_plugins/`
`assets/`
`pages/`
`_config.yml`
`.gitignore`
`License.md`
`Rakefile`
`ReadMe.md`
`index.md`

The directories starting with an underscore have materials
defining the basic layout and style for the site. If you want to build the site locally (for testing
purposes), there will also be a `_site/` directory containing the
actual site (with
[Markdown](https://daringfireball.net/projects/markdown/) files
converted to html). You don't want the `_site/` directory in your
repo, so add that to your `.gitignore` file.

The assets/ directory contains any NON-MARKDOWN materials for the site (e.g.,
images or example code). These files won't be touched in the
conversion but will be just copied over as-is.

The
pages/ directory contains
[Markdown](https://daringfireball.net/projects/markdown/) files that will become html pages on your site.

The config.yml file contains all the configuration parameters you will  need to modify your site.

The Rakefile has instructions for the conversion; you won't modify this file.

The index.md page is a Markdown version of the main page for your site. It contains headers with a particular form.

---
layout: page
title: simple site
tagline: Easy websites with GitHub Pages
description: Minimal tutorial on making a simple website with GitHub Pages
---

This layout structure is how the Markdown will read the page and build it when it is pushed to github.

Now go to the page about [how to make an independent website](independent_site.html).

### An IDE for everyone
We will now need an IDE for writing changes to your code and updating the site. For this tutorial I would reccommend the [Atom IDE](https://atom.io/) and the [Github plugin package](https://github.atom.io/)
Atom will help with uploading your work to github.

### Building Your Site Locally
To test your site locally you can follow my thread [here](https://tedley.me/building-local-site/)

### Making Sites without Jekyll
If you want a plain website without all of this
[Jekyll](https://jekyllrb.com/)/[Markdown](https://daringfireball.net/projects/markdown/)
stuff, you just need to add plain html,css, and Javascript
and avoid naming directories that start with underscores.

If you want some directories with underscores, just include a file
named `.nojekyll`. You might just include that anyway.

I would recommend using [Jekyll](https://jekyllrb.com/) and
[Markdown](https://daringfireball.net/projects/markdown/). Markdown makes building, maintaining, and writing html code so much easier.

You can [use a custom domain with Github Pages](https://help.github.com/en/articles/using-a-custom-domain-with-github-pages) as well.

# In Conclusion
With this newfound information you can now host your own personal blog page, portfolio page, or an online CV to add to your resume for employers to see what you do in your free time. Technology is always growing and constantly changing so its great to show employers your passion and how you stay up to date with the trends of the world.

If you have any questions or want to work together and building a personal site feel free to contact me on twitter  [@TechGameTeddy](https://twitter.com/techgameteddy)
