---
layout: post
title:  "Fun with Bash scripts"
date:   2023-11-30
excerpt: "2023 project list"
img: "blog-headers/fun-with-bash-scripts.png"
project: true
---


#### Bash script solution
While working on [Project Sandbox](https://github.com/tedleyem/project-sandbox) I decided to write a bash script to spin up the react project using docker for future portability. I decided to create two dockerfiles so that there is a dev dockerfile and a prod dockerfile that uses nginx. I am an advocate of using cli but hate having to retype commands or look through my history and run through command. Typically I use aliases but when your working on specific projects that require the use of commands like calling bash scripts by name It doesn't make sense to make these one off shortcuts, so I wrote a bash script [here](https://github.com/tedleyem/project-sandbox/blob/main/build.sh).

At first I thought it would be quick and painless but getting into the idea of using getops to create switches for the bash script go me so excited about writing it. Lets break down what getopts is, why its used, and how much fun I had.

#### What is getops?

getopts is a command that comes built-in with Bash. It's designed to help manage the command line options and arguments that are provided to a script or function. In other words, it aids in 'decoding' what the user has input and determining what actions the script should take.

Compared to positional parameters (like $1 or $2), getopts is generally more reliable and less prone to errors. This is because getopts allows options and arguments to be clearly labeled and defined, reducing confusion and mistakes that can arise from the strict order requirement of positional parameters.

In layman's terms its an option within bash that allows you to add options and arguments in a bash script to help with reading and manipulating input.
To help with understanding it more there are a few terms to get familiar with when using getopts.

* Options, normally referred to as flags, are special kinds of positional parameters that begin with a hyphen (-) and modify the behavior of a command or a script. They are normally single letters, like -v or -h.
* Arguments, sometimes also called parameters, are positional parameters that provide specific data to the script or command. They might follow an option if that option requires further information, or they could stand alone as inputs to the command or script itself. They can look like -f file.txt or -u username.

A better example, in the command ls -l /home, -l is an option that modifies the behavior of the ls command, and /home is an argument that provides specific data (the directory to list) to the ls command.

#### The getopts Syntax

The getopts command syntax looks like this:
```code
getopts optstring name [args]
```

Here's a breakdown of the syntax:

* optstring: This is a string of characters that are recognized as valid options. Each character represents an option that the script expects to receive. If a character is followed by a colon, it indicates that this specific option requires an argument.

For example, an optstring of abc would mean the script is looking for options -a, -b, and -c without any arguments. However, if the optstring is a:bc, it means the script is looking for options -a, -b, and -c, but only -a requires an argument.

* name: This is a variable that getopts uses to store the current option that it is processing. While this variable can technically be any name you want, it's conventionally named opt or option. In my script I use 'flag' as the name being used.

* [args]: This is optional. If provided, getopts will parse these arguments instead of the positional parameters.

In a typical use case, getopts is used within a while loop to process all the options given to the script. The case statement is often used to perform different actions based on the current option that getopts is processing.



#### Handling multiple options (with arguments) with getopts

For this script, I chose to handle multiple options -c, -d, and -p, and have all the options require an argument. If an argument is not provided to any of these options or an invalid option is passed, it will print an error message and terminate the script with an exit status of 1.


```
while getopts :dpc flag; do
    case "${flag}" in
        c|--clean)
        clean_containers
        ;;
        d|--dev)
          ENV="DEV"
          deploy_dev
          ;;
        p|--prod)
          ENV="PROD"
          deploy_prod
          ;;
        *)
          echo "ERROR: Invalid option" && sleep 1
          echo "Please choose an environment to build" && sleep 1
          echo "Choose -d for DEV or -p for PROD" && sleep 1
          exit 1
          ;;
    esac
done
```

#### The fun in all of it
Let’s examine this script in detail.

The OPTSTRING is defined as :dpc. This tells the script to expect two options, -d, -p, and -c, which are all required as arguments.

The while getopts ${OPTSTRING} flag; do ... done loop sequentially parses the options passed to the script. For each option it encounters, getopts assigns the option to the opt variable and then executes the body of the loop, which is set as functions above in the script.

Inside the loop, a case ${flag} in ... esac statement handles each option. If the option is d, it will set an environment variable and run the deploy_dev function. If the option is p, it it will set an environment variable and run the deploy_prod function.

Lastly, I have the ?) in the case statement. This is a special character that is matched when none of the required options that are expected to be passed are not set or used. When that happens, getopts will echo a few error messages and terminate the script with an exit code of 1.

A question mark (?), which is a popularly used option, is used to match any invalid option that is passed. In these cases, the invalid option is assigned to the OPTARG variable, the script prints an error message and terminates using exit 1.


After cloning the project you an run the following commands.


Build the project with docker-compose.yml
```
bash build.sh -d
```

and then you can try building the production specific version by running docker-compose-prod.yml.
```
bash build.sh -p
```


#### Conclusion
Could the script be handled better, sure, but when it comes to building functions, I see it like creating art. A script can be functional, beautiful even, but never finished. Using getopts brought be back to how much fun you can use logic in a simple bash script to run different commands by using
arguments, flags, switches, parameters, or whatever you need to call them. My goal was to create a script to run different commands without having to type out long repeated commands, and I did that. May be boring to you but while im in the middle of [resting](https://meralus.com/finding-time-to-rest/) and [finding fun in my work again](https://meralus.com/Project-updates/) this has been like relaxing at a pool.