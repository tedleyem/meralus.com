---
layout: post
title:  "NEW TITLE"
date:   2024-02-01
excerpt: "lorem ipsum"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

My theory on

# Cherry picking redhat kernel versions with grubby


## GRUBBY
To check the name of the default kernel version
# grubby --default-kernel

List all kernel menu entries
# grubby --info=ALL

To the index number of current kernel being used
# grubby --default-index


# grubby --set-default=/boot/vmlinuz-4.18.0-513.18.1.el8_9.x86_64
The default is /boot/loader/entries/377389b79b454a8fbd934c776ead4d2f-4.18.0-513.18.1.el8_9.x86_64.conf with index 0 and kernel /boot/vmlinuz-4.18.0-513.18.1.el8_9.x86_64


