---
layout: post
title:  "NEW TITLE"
date:   2024-02-01
excerpt: "How to check your battery status using Linux terminal"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

Checking the battery status through GUI is easy. Hovering the mouse cursor over the battery indicator given in the Laptop task bar simply shows the battery level. But, did you know you can find the battery status through the Linux command line as well?

Yes, there are some utilities in Linux that can be of help in this regard.

This article explains 4 different methods of checking laptop battery status using the Linux command line. So,
Why Do You Need to Check Battery Status?

So, why do you need to check the battery status? Knowing laptop battery health on a monthly basis is a good practice. It’ll inform you about any issues your computer might have related to charging or battery life. You can get alerted earlier and take the measures required, such as charging or altering batteries.

When your PC is not active, the power management feature levels down its components to a low-power state. And also turns off the power. 

Similarly, knowing the power source, battery model name, the technology used, vendors, etc helps operate your devices better and keep work going without any hassles.
How to Check Battery Status Using Linux Command Line

Follow the methods mentioned below to check battery status using the Linux command line. Check Battery Status with “upower” CommandThe command produces output 
Check Battery Status with upower Command

The upower command-line tool helps extract information related to the power source (batteries). It provides an interface to list down all the power sources of your PC or laptop.

Options Used with the upower Command

    –monitor: You can print a line each time a battery or power source is added by connecting –monitor to upower. It also produces outputs while the power sources are removed or changed.

    –monitor-detail: This option prints the full power source detail whenever an event occurs.

 

Syntax

upower -i /org/freedesktop/UPower/devices/battery_BAT0

upower -i `upower -e | grep 'BAT'`

upower -i $(upower -e | grep BAT) | grep --color=never -E "state|to\ full|to\ empty|percentage"

The above are three different ways of using acpi command to find power source information.
Use cat and find

The “cat” and “find” commands also help find details about your battery and power source.

Syntax

For the battery capacity, the syntax would be:

cat /sys/class/power_supply/BAT0/capacity

For more detailed battery information use the find command.

Syntax

And the syntax is,

find /sys/class/power_supply/BAT0/ -type f | xargs -tn1 cat

Check Battery Status with acpi Command

The acpi command extracts information from the /sys or the /proc filesystem. You get to know the battery status and thermal information using acpi.

Options Used with the acpi Command

    -b: The shortened form of –battery and it gives battery details.

    -t: The shortened form of –thermal and shows thermal details.

    -a: The shortened form of –ac-adapter to give ac adapter details.

    -c: The abbreviation of –cooling. It gives information regarding your cooling device.

    -V: Stands for –everything. It produces output about every device connected and overrides other options.

    -f: The abbreviation of –fahrenheit. Once given as input, -f produces temperature results in fahrenheit units instead of celsius.

    -i: The abbreviation of –details. It shows additional battery details, such as battery capacity or temperature trip points.

    -s: The short form of –show-empty. It shows non-operational devices.

 

Syntax

acpi -V

acpi -t

Above we have given two different acpi examples.
Use batstat Program

The batstat is a ncurses-based CLI utility. It displays the laptop battery status in Linux. Using batstat you’ll get full charge energy, current energy, level of the battery, battery level history, and the time passed from the beginning of the program. It doesn’t count the sleep time of your machine.

Steps to View Your Battery Status with batstat

Step 1: Install batstat in your machine by:

git clone https://github.com/Juve45/batstat.git

Git cone helps clone the latest version of batstat available. And it’ll create a folder named “batstat” to save all the contents.

Step 2: Then change the current directory to batstat/bin/ directory typing:

cd batstat/bin/

Step 3: Bring batstat binary file copied to the PATH, for instance, /usr/local/bin/

sudo cp batstat /usr/local/bin/

Step 4: Make the file executable using:

sudo chmod +x /usr/local/bin/batstat

Step 5: View the battery status through:

batstat

The Conclusion

We have reached the ending of our article. If you’re here until now, then you have probably understood how to check battery status using the Linux command line. The above methods work as expected in order to find out your battery information. So, go ahead and do some experiments on your batteries today using Linux.
