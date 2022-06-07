---
layout: post
title:  "Page Title "
date:   2017-10-04
excerpt: "minimal description of page"
project: true
tags: [add, tags, here,]
comments: true
---

![Image Title Name](/assets/img/blog/<image-name>)
{:class="img-responsive"}


find and remove files bigger than a specific size and type
I want to clean up my server from large log files and backups.
I came up with this:
find ./ -size +1M | xargs rm


How to replace spaces in file names using a bash script
for f in *\ *; do mv "$f" "${f// /_}"; done


