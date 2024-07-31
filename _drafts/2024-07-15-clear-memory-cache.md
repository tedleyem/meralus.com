---
layout: post
title:  "NEW TITLE"
date:   2024-07-16
excerpt: "Clear memory cache"
img: "blog-headers/vr-movie.jpg"
project: true
---
# add dr strange picture here
How to clear memory cache and buffer in Linux

Linux, like other operating systems, has an efficient and affective memory management for managing memory hungry Application or database. RAM as you know is a vital part for Operating systems for storing code and data, in Linux it uses memory cache and buffer for improving the system performance.

If I talk bit more about memory cache and buffer, although memory cache is used by the operating system kernel for keeping regular accessed data in memory for improving the system performance, but an overloaded cache of obsolete data can also impact adverse of system performance as well. Whereas memory buffer is used for improving communication between CPU and Hard Disks or other storage media by storing data temporarily till then data is processed between the CPU and Hard Disks, or other storage media.

Although application or database running on Linux use memory page cache management algorithm such as LRU (Least Recent Used) or LFU (Least Frequent Used) for optimizing memory automatically, but sometime high memory intensive application or database can cause performance issue in operating system by creating memory bottleneck.

In this Article I will show you the steps on how to clear memory cache and buffer by using Linux commands without worrying about killing or stopping the memory hogging Application or database processes.



Clearing memory Page Cache and buffer through Linux command

There are three ways for clearing the buffer and cache from system memory:



To clear only page cache:
# sync; echo 1 > /proc/sys/vm/drop_caches



To clear dentries (directory entries) and inodes:
# sync; echo 2 > /proc/sys/vm/drop_caches



Third option is to use below command for clearing dentries, inodes and page cache as well:
# sync; echo 3 > /proc/sys/vm/drop_caches



In the above three command options you can see multiple commands are used with semicolon “;” as first command sync will clear the filesystem buffer then after semicolon other commands run for clearing the cache.



An example of one of above command usage:



You can see by using one of the above command how much memory cache and buffer are dropped.



Wrap up!

In this article you have read about how to clear the memory buffer and Page Cache in Linux with three simple commands without worrying about killing or stopping the memory intensive Application or Database processes. But in case if memory bottleneck issue is persisted consider to check with Application or database vendors for getting kernel memory tunable parameters or you can also consider to increase the server memory or RAM as well.