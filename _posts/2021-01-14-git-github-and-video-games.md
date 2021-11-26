---
layout: post
title:  "Git vs Github and Pokemon"
date:   2021-01-14
excerpt: "understanding what they are and how to remember the difference"
tags:
comments: true
---
## Git vs Github
### Understanding what they are and how to remember the difference
There are tons of classes in college or online that mentioned using git and Github for programming and keeping track of your code. There are also hundreds of people who try to break it down so you know the difference. This is one of the hundreds. What is git? What is Github? Why do they have different names? How can I understand it so I no longer get confused. Lets break it down with understanding and Pokemon.

### What Is Git?
Git was First developed back in 2005, Git is an extremely popular Version Control System that has become the heart of many large and popular software projects. Git is something that is maintained on your local system and gives you a self-contained record of changes made in your projects. It doesn't need internet access to use or manage, except to download it.

If we compared it to other version control systems(from older articles and little experience with bitbucket), Git is responsive, easy to use, and free. Git has been  designed to work well with text files which is great because, lets face it, isn't all code written in a text file of some sort? A specific feature that pulls many people into git is in branches. Branching let you create subsidized local branches in your code. This allows you to try out new ideas, remove tested features of your code, set aside pieces of code to be saved or pushed to master, etc. To better explain that, branches would allow you to create separate versions of your pokemon game from the jump. Now when you "play" your pokemon game, you can play with the charmander branch, or the squirtle branch, or the bulbasaur branch. So to break it down, Git is a high-end version control system. Now we have another thing to learn. What is version control.

### What is Version Control?
Development projects don’t just come out of nowhere, they are created line by line. Version control allows you to manage and organize your development strategies. Lets say your about to walk into a gym and beat a gym leader in pokemon but you want to go back to the store and buy more potions for your charmander and the sandshrew you picked up. You can save the game in the current state with money in your pocket and pokemon with no potions. Now you can run to the store and buy 10x potions and save your game in a different save location. This will create 2 saved games. One with your pokemon. money, and no potions, we will call that your main branch or your 'main-version'. Another save file has your pokemon, no money, and 10 potions, we will call that your 'health-branch'.  No you can test some trial and error by going into the gym with 0 potions in your main-branch and see if the potions were needed to get to the boss and obtain the gym badge. If that doesnt work out for you, you can use your version control (or saved state file) and run into the gym with 10x potions.
Version control is like a savings program for your project. By tracking and logging the changes you make to your potions or money in pokemon, it would be the same as making changes to files you update over time. A version-control system gives you the power to review or even restore earlier versions, just like going loading back and forth through your game saves. Version control takes snapshots of every revision to your project just like a gameboy saves your data.

There are many times when you have multiple saves because you didnt know which pokemon to choose from in the beginning of the game. If you wanted to play with all three of them, you can use version control to save different versions of your game (or branches). This example would be like having a water-branch, fire-branch, and grass branch. You can play the game three different ways, and run it in three different styles. Now that we understand git and version control. Lets talk about Github.

### What Is Github?
Now that we are following my example and have multiple save files of pokemon, how do we share that with friends who want to help test out which file is best to beat the game? In comes Github. Github is a git repository hosting service. It is a cloud based platform that allows you to host your projects online and share them with others, or to have a single place to store and back them up.

In our example lets say your friends have heard of your progress in your pokemon game but want to only see the water-branch save file and see where your squirtle has been up to. With Github you can upload all your saves to Github and let people download (or pull) your save file and play you game as squirtle. If they found that they can help you or want to contribute to your game by beating a gym for you or finding a hack in the game to get 99x master balls, they can modify their water-branch version of the game and save it(or push) back to Github. Github allows you to look at the changes they made and choose if you want to combine your save file with their save file (merging).

### Understanding with code
Lets try and loop that example back to code. Lets say you have a simple html site that has a list of every active player on every NBA basketball team. If someone wanted to help you get every players name for the Los Angeles Lakers, they can pull your site down from Github, add the names for you, and then push up the changes to your original site location on Github. This would be called creating a pull request. If they wanted to take your site and use it for something completely different, they can take the current state of your site and download it for themselves to use. This would be called a (fork). That would be the same as someone taking your saved Charmander-branch game and continuing the game from where you left off.

### Differences between the two.
Unlike git, Github is an exclusive cloud based platform. It is a for-profit platform-as-a-service. It allows you to create repositories for free, and utilize most of its features for free which makes it one of the most popular options for people to store their projects or share their work with others. Github also expands git's features with a graphic interface. It has built in features for adding tasks, to-do lists, write discussions about issues and solve them with others, or have a timestamp for when changes were made to your code or your game saves from anywhere in the world. If you were to lose your game save on your gameboy or drop water onto your laptop, you can rest assure that your information is saved in a database in a Github repository.

### Wrapping it up
This explanation for git vs Github should be understood a bit more now.  
I'm hoping that my explanation will help remind you in the future when someone asks you if you have ever used Github. If your a person who only likes keeping your save files on your gameboy and don't have a Github account to share your save files, then you probably don't have a Github account or used Github. But if you have a project, or game, and have multiple saves for the project saved in different branches then you are familiar with git, or saving a video game.

### Other hosting options
You can use other repository hosting services like BitBucket, SourceForge, or Gitlab. All those other options provide hosting options, built in security and management features, and tons of other things for helping you with your project. Most of them give you options to import you code directly into Github.


If the pokemon analogy doesn't make sense to you then maybe you should try catching all of the original 151 pokemon and find a way to share your experience with me and others.  
