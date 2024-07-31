---
layout: post
title:  "Gui Cleanup ubuntu server"
date:   2024-07-08
excerpt: "Removing a desktop GUI from an Ubuntu Server"
img: "blog-headers/vr-movie.jpg"
project: true
---


When setting up an Ubuntu server, it’s typical to run it headless, i.e., without a graphical user interface (GUI). However, there are times when a GUI might have been installed, either intentionally for a specific purpose or accidentally. If you later decide to get back to a lean command-line-only environment, you might wonder how to identify and remove the GUI components.


# Identifying a GUI Installation
Before we delve into the removal process, it’s essential to determine whether your Ubuntu server has a GUI installed. Here are several ways to check:

# 1. List Installed Desktop Packages
Different desktop environments are associated with specific packages. For instance, you can check for GNOME, Ubuntu’s default desktop, with:
```
dpkg -l | grep ubuntu-desktop
```
# 2. Check for Display Managers
Display managers handle graphical sessions. Examples include gdm3 for GNOME and lightdm. Check for these using:

```
dpkg -l | grep -E "gdm3|sddm|lightdm"
```
# 3. Inspect Running Processes
```
ps aux | grep -E "Xorg|gdm3|sddm|lightdm"
```
# 4. Check for X Server Installation
```
dpkg -l | grep xserver-xorg
```
# 5. Inspect Systemd’s Target
```
systemctl get-default
```
# Removing the GUI
Having identified the presence of a GUI, you can proceed to remove it.

### GNOME
Remove GNOME, the default desktop environment for Ubuntu, with:

```
sudo apt-get purge ubuntu-desktop gnome-desktop3-data gnome-shell
sudo apt-get autoremove
```
### KDE Plasma
```
sudo apt-get purge kubuntu-desktop kde-* plasma-*
sudo apt-get autoremove
```
### XFCE
```
sudo apt-get purge xubuntu-desktop xfce4*
sudo apt-get autoremove
```
### LXDE
```
sudo apt-get purge lubuntu-desktop lxde*
sudo apt-get autoremove
```
### Display Managers
For lightdm:

```
sudo apt-get purge lightdm
sudo apt-get autoremove
```
For gdm3:

```
sudo apt-get purge gdm3
sudo apt-get autoremove
```
### Final Cleanup
After uninstalling the necessary components, clean up your system with:

```
sudo apt-get autoremove
sudo apt-get autoclean
```
### Boot Configuration
Set your system to boot in non-graphical mode:

```
sudo systemctl set-default multi-user.target
```
Finally, reboot your system to apply all changes:
```

sudo reboot
```
# Conclusion
A GUI can be useful in specific scenarios, even on a server. However, if you want to maintain a lightweight and efficient server environment, it’s often best to run it headless. This guide helps you revert to that state after a GUI installation.


