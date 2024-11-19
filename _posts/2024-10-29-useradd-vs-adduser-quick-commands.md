---
layout: post
title:  "Useradd or Add User"
date:   2024-10-29
excerpt: "quick reminder"
img: "blog-headers/useradd-vs-adduser.png"
project: true
---

# Useradd vs adduser

The main differences between the useradd and adduser commands in Linux are:

useradd is a lower-level command that requires additional parameters to set up an account, while adduser is a higher-level command that adds a user with standard settings.

* Availability: useradd is available on all Linux distributions, while adduser is not available on all Linux distributions.
# adduser
* Interaction: adduser is more user-friendly and interactive than useradd.
* adduser asks for additional information such as full name, room number, work phone, and home phone. useradd does not ask for any additional information.

# useradd
* useradd does not create a home directory for the new user by default.
* The useradd command creates a new user account with a fresh home directory, default shell, and system-wide settings. The login parameter must be a unique string, and the user name cannot use the ALL or default keywords.
* useradd does not create password information for a user.

## Final

* **adduser** : common way to add user, password, and home dir
* ***useradd** : quick and dirty --no password created