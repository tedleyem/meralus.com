---
layout: post
title:  Fixing Battery Issue for Thinkpad X1 carbon
date:   2022-03-19
excerpt: "7th gen Lenovo Thinkpad X1 Carbon | Ubuntu 20.04" 
comments: true
img: "blog-headers/battery-issue.jpg"
---
Knowledge, like air, is vital to life. And like air, no one should be denied it.

I recently made the mistake of plugging my Lenovo X1 Carbon (Gen 5) into a 5 volt USB-C charger overnight. The LED on the side indicated that it was charging but, when I woke up in the morning, it obviously hadn't. Worse, it now refused to charge even when plugged into the correct charger.

The fix is simple (although undocumented as far as I can tell). Basically, you need to reset the battery as follows:
 	 
    Unplug from any power sources (this won't work if you don't do this).
    Reboot into the BIOS setup (F1 on boot).
    Navigate to the Power menu.
    Select the "Disable built-in battery" option.
    Wait for the laptop to power off and then wait 30 seconds.
    Connect the power and start the laptop.

This will temporarily disable the battery which seems to reset any "bad charger" bits.

Hopefully, this will save others some time and frustration.

The X1 Carbon is otherwise a great laptop with an awesome keyboard. However, because this is my blog and I can rant all I want here:

    The dedicated Ethernet port is pretty much useless given the ubiquity of USB-C. I'd have much preferred an additional USB or USB-C port.
    The nipple seems a bit firmer than the one on my X220 and also seems to get into the "wandering cursor" state a bit more frequently.
