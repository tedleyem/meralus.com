---
layout: post
title:  "A greek salad, some wazuh, and tofu on the side"
date:   2024-06-21
excerpt: "Wazuh open source security platfom deployment"
img: "blog-headers/vr-movie.jpg"
project: true
---


-- maybe write a blog about it on linkedin
deploying with open tofu

I am currently studying for my CISSP certification and came across the topic of SIEM’s. I have never had any experience with this type of software and figured it would be beneficial to get hands on experience to better understand how SIEM functions and why it is important in the field of Cyber Security.

# What is SIEM?
Security Information and Event Management is a software designed to collect logs/events from a wide variety of sources and centralizes them. This allows for a wide variety of features including real-time threat identification, alerting blue teams of adverse events, compliance auditing and more.

Today we will be looking at Wazuh, a free and open-source SIEM solution. It is a powerful SIEM that also includes XDR capabilities.

Some notable features of Wazuh:

# Vulnerability detection and scanning
* Compliance testing for PCI DSS, HIPPA, NIST 800–53, GDPR and TSC
* Security Information and Event Management
* Incident response
* Intrusion detection
* Wazuh is composed of four main components:

* Indexer: The Wazuh indexer is responsible for indexing and storing alerts. It also provides a search engine to sort through alerts.
* Server: This is the central component of this SIEM solution, it aggregates logs from agents and is capable of analyzing events to discover indicators of compromise.
* Dashboard: This is the graphical web interface for Wazuh, it provides an easy way to visualize events and threats throughout the network.
* Agent: This component runs on the end devices, it is responsible for communicating events to the server.

# Getting Started with Wazuh
Embarking on your Wazuh journey is a straightforward process, and I’m here to guide you through the initial steps to harness the power of this open source XDR and SIEM platform. Let’s get you started:

# Setting Up the Essentials:
Follow the Quickstart guide for an automated installation that gets you up and running in minutes. If you prefer a more hands-on approach, the comprehensive Installation guide is your go-to resource for detailed instructions.
Install your first Agents. This is a very simple process and the exact command line parameters will be generated for you based on your environment, youst go to the Agents sections and chose “Deploy New Agent”

# local development with docker
single node development

# local development with minikube
test locally with minikube and changes between docker and minikube

# installing an agent with ansible
# testing with docker/vagrant images


# Test vulnerabilities with malware
https://github.com/fire1ce/eicar-standard-antivirus-test-files

https://www.eicar.org/download-anti-malware-testfile/


# deploying with open tofu
