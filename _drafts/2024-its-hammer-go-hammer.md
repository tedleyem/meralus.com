---
layout: post
title:  "What time is it? Ansible Time!"
date:   2024-02-01
excerpt: "Ansible's new time feature"
img: "blog-headers/vr-movie.jpg"
project: true
---

https://www.ansiblepilot.com/articles/mastering-time-in-ansible-the-now-function/


---
- name: Get timestamp from the system
  hosts: localhost
  gather_facts: true
  tasks:
    - name: Get date from the system
      shell: "date '+%Y-%m-%d %H:%M:%S' "
      register: date_stamp

    - name: Set variables
      set_fact:
        cur_time: "{{ date_stamp.stdout }}"

    - name: System Time
      debug:
        msg: "1722620530779449 | {{ cur_time }}"

