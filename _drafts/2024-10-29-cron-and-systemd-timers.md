---
layout: post
title:  "cron vs systemd-timers"
date:   2024-10-29
excerpt: "scheduled jobs"
img: "blog-headers/docker-introduction-01.jpg"
project: true
---
Stepping into the vast world of Linux, I was armed with a mission: schedule my Python backup script to run regularly. The criteria seemed straightforward — execute every 30 minutes, refrain from overlapping runs, and have an option for manual testing. Simple, right?

I was in for a surprise.

In this post I’ll be diving into the world of task scheduling on Linux, covering cron and systemd timers along the way.
1.0 Intro

Coming from a Windows background, I thought setting up scheduled tasks on Linux would be straightforward. Windows has been handling these tasks with ease for a long time. However, I quickly realized that Linux had its own set of challenges.

That’s where systemd comes in.

Introduced in 2014, systemd quickly became an essential part of the Linux ecosystem. It’s not just a tool; it’s the central manager for a Linux system. From the moment a Linux system starts up, systemd is there, managing processes and ensuring everything runs smoothly.
Info

Currently, systemd is the default for many popular Linux distributions, including:

    Red Hat Enterprise Linux (RHEL)
    CentOS
    Ubuntu
    Debian
    SUSE
    Arch

With that background, let’s dive into systemd timers and explore why they might be a better choice than the traditional cron.
2.0 Systemd Unit Files

Consider a typical crontab entry:

1



*/30 * * * * /usr/bin/python3 /path/to/your/script.py

This cron job triggers a Python script every 30 minutes. If we want to replicate this behavior with systemd, two separate ‘unit files’ are needed:

    Service File: Defines what you want to run.
    Timer File: Specifies when and how the service should execute.

Here’s how these files are structured:

Service File (/etc/systemd/system/myscript.service):

1
2
3
4
5



[Unit]
Description=Execute my python script

[Service]
ExecStart=/usr/bin/python3 /path/to/your/script.py

Timer File (/etc/systemd/system/myscript.timer):

1
2
3
4
5
6
7
8
9



[Unit]
Description=Run myscript.service every 30 minutes

[Timer]
OnBootSec=5min
OnUnitActiveSec=30min

[Install]
WantedBy=multi-user.target

3.0 Benefits
3.1 Non-overlapping

Systemd timers guarantee that only one instance of a task is in execution at any given moment.

If a task takes longer than expected, systemd ensures the subsequent scheduled instance waits patiently. In contrast, cron would launch another instance even if the previous task hadn’t finished, potentially leading to chaos ‘operational challenges’.
3.2 On-demand execution

Systemd allows you to manually start tasks:

1



$ systemctl start myscript.service

This feature enables immediate testing or intervention, removing the guesswork of “Will it run correctly next time?”.

While cron is well-suited for automated tasks on a fixed schedule, it lacks the flexibility for immediate execution. Systemd timers offer both scheduled and on-demand task initiation.
3.3 Unified Logging

Systemd introduces a centeral logging system, journald.

Journald ensures that outputs (both stdout and stderr) from your timers are automatically captured. This contrasts with cron, where the executed script or application must possess its own built-in logging logic to record outputs.

To probe the logs for our myscript.service, execute:

1



$ journalctl -u myscript.service

This command retrieves the service’s activity logs, streamlining troubleshooting and performance assessment.
3.4 Granular Timing

In the world of task scheduling, systemd is undeniably a game-changer.

Fancy executing a task to the exact tick of a second?

1
2



[Timer]
OnCalendar=*-*-* 12:00:15

While cron has championed minute-level precision, the idea of sub-minute granularity remains a bridge too far.

Systemd timers also cater for the requirements of distributed systems. Imagine wanting a task to run at any time during the day.

No worries:

1
2
3



[Timer]
OnCalendar=daily
AccuracySec=24h

Anticipating synchronized havoc with all your machines knocking at your server’s door simultaneously?

Add some deliberate unpredictability with RandomizedDelaySec.

This randomness prevents every node from checking for updates in unison:

1
2
3



[Timer]
OnCalendar=hourly
RandomizedDelaySec=15m

But what if you’re intrigued by event-relative task execution?

Cron doesn’t support event-driven triggers.

Systemd timers allow tasks to be tethered to specific system events. Case in point? Running myscript.service 15 minutes after boot:

1
2
3



[Timer]
OnBootSec=15min
Persistent=true

3.5 Error Handling

Imagine a task fails. Rather than just shrugging it off, systemd can kick off another service to handle the mishap.

Dreaming of getting notified on Slack when something’s amiss? There’s a Slack notifier for that! Old school and prefer a trusty email? Dive into this mailto script.

In contrast, cron offers a simpler, more limited approach.
3.6 Birds Eye View

Gaining a unified perspective of all scheduled tasks in systemd is a breeze:

1



$ systemctl list-timers --all

This single command displays every timer, no matter the user.

Contrast this with cron. Each user’s tasks lie within individual crontabs. To inspect, you’d hop between users:

1



$ crontab -u <username> -l

And don’t forget the system wide tasks in /etc/crontab and /etc/cron.d. In this realm, systemd offers clarity where cron asks for a scavenger hunt.
3.7 Dependencies

Systemd timers execute tasks intellligently.

Ever been in a situation where you need to confirm a database service is alive and kicking before running that crucial backup?

Systemd’s got your back:

1
2
3
4



[Unit]
Description=Backup service
Requires=database.service
After=database.service

What about ensuring NFS file shares are mounted beforehand?

1
2
3
4



[Unit]
Description=MySQL backup task
Requires=mybackupshare.mount
After=mybackupshare.mount

4.0 Drawbacks
4.1 Complexity

Cron’s beauty lies in its simplicity.

Simply drop a line in a crontab you’ve got a task set to run periodically:

1



* * * * * /path/to/script.sh

On the flip side, systemd, while undeniably robust, can feel like a double-edged sword. Setting up a timer isn’t a brief affair. It mandates two separate unit files: the service and the timer.

Essentially, you’re looking at double the configuration, doubling the chances for an oversight.
5.0 Summary

Cron and systemd timers serve distinct roles in the Linux world. While cron remains the go-to for straightforward scheduling, systemd timers cater to modern system management with precise timing, advanced error handling, and dependency management capabilities.

Choosing between the two boils down to the task at hand. Having both tools in your toolkit ensures you’re well-prepared for any scheduling challenge.

Thanks for reading, and happy scheduling!