---
layout: post
title:  "Testing your site locally"
date:   2019-01-25
excerpt: "Testing your site locally"
tags: [blog, site, web, jekyll]
---
To test your site locally, you'll need to install the following

- [ruby](https://www.ruby-lang.org/en/)
- the [github-pages](https://github.com/github/pages-gem) gem

#### Installing ruby ####

Ruby has
[Ways to download ruby packges](https://www.ruby-lang.org/en/installation/).

On an Linux system you can follow this [Ruby Installation link](https://www.ruby-lang.org/en/documentation/installation/)

On a Mac OS, older versions of ruby will already be installed. To get the latest versions of Ruby you can use the [Ruby Version Manager (RVM)](https://rvm.io/).

On a Windows system, use [RubyInstaller](https://rubyinstaller.org/).


#### Installing the github-pages gem ####
Run the following command in terminal or with your package manager:

 $ gem install github-pages

This will install the `github-pages` gem and all jekyll dependencies needed.

You can also update the github pages gem or any gem
by running the following:

 $ gem update github-pages

#### Testing your site locally ####
Now that these packages are installed you can
move to your folder where your jekyll based site is and run

 $ jekyll build

This will create a `_site/` directory, that will have
everything in your `assets/` folder, `index.md` and all files ending in .md in the `pages/` dir.

To test the site on your local workstation you can type

$ jekyll serve

The output of the command should point you to the domain where your page can be seen.

Now open your browser and go to <http://localhost:4000>
