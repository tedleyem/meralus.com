---
layout: post
title:  "A greek salad, some wazuh, and tofu on the side"
date:   2024-06-21
excerpt: "Deploying Wazuh open source security platform"
img: "blog-headers/vr-movie.jpg"
project: true
---



# Installing and Configuring Wazuh for Enhanced Threat Detection and Response

Wazuh is a powerful open-source security information and event management (SIEM) platform designed to fortify your cybersecurity defenses. Built on advanced threat detection and response capabilities, Wazuh offers a complete toolkit for effective security incident monitoring, analysis, and response. It empowers you to preemptively detect and thwart cyber threats, safeguarding the integrity and resilience of your digital environment.

In this blog, I’ll guide you through the seamless process of installing Wazuh, unlocking a robust security solution for your organization.

Please follow the steps carefully:

First and foremost, head to the official Wazuh website and navigate to the ‘Install Wazuh’ section.

After clicking on ‘Install Wazuh,’ you’ll be directed to a new page detailing the installation process. Navigate to the Quick Start Guide for comprehensive details on the installation procedure.


2. Launch the terminal on your Ubuntu machine and effortlessly install Wazuh by copying and pasting the provided curl command.

curl -sO https://packages.wazuh.com/4.7/wazuh-install.sh && sudo bash ./wazuh-install.sh -a
This will start the Wazuh installation assistant. (Wazuh Version: 4.7.1)


3. Upon successful completion of the installation, you’ll find the credentials conveniently displayed at the bottom of the installation process. However if you have missed that part then you can also view the password using the following command.

sudo tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt

4. Now that Wazuh is successfully installed, let’s access the Wazuh dashboard or web interface. Open a browser, and in the address bar, type either ‘localhost’ or your system’s IP address, e.g., 192.168.250.134. Click on ‘Advanced,’ accept the risk, and proceed.


5. Enter the default login credentials to access the console and log in.


The home dashboard will look similar to this. Currently, you can observe that there are zero agents added. To maximize performance, we need to add/deploy new agents.


6. Our priority now is to enhance security by changing the default admin password. To accomplish this, click on the admin icon in the top right corner of the dashboard and select ‘Reset Password’.


7. Enter the current password, followed by the new password, and click ‘Reset’ to effortlessly update your password


8. You can check the status of your ‘wazuh-server’ using the given command and it should be up and running.

sudo systemctl status wazuh-manager

9. Next, let’s add agents to an Ubuntu server by deploying an agent on the Ubuntu machine. To start this process, navigate to the Wazuh dashboard and click on ‘Add Agent.’


10. Choose the package for your system installation. In this instance, opt for the Linux package in Debian (deb) format designed for the AMD64 architecture and enter the IP (i.e, 192.168.250.136) address of the system.


11. Choose a distinctive name for the agent, and then select the group in which you want to place the agent.


wget https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.7.1-1_amd64.deb && sudo WAZUH_MANAGER='192.168.250.136' WAZUH_AGENT_GROUP='default' WAZUH_AGENT_NAME='UbuntuVTM-Agent' dpkg -i ./wazuh-agent_4.7.1-1_amd64.deb
Copy the provided command and execute it on your Ubuntu machine.


12. Start the Wazuh Agent using the given commands:

sudo systemctl daemon-reload
sudo systemctl enable wazuh-agent
sudo systemctl start wazuh-agent
Run the provided commands in the terminal.


13. You should now see an active agent on the Wazuh’s dashboard.


14. Similarly, you can add/deploy multiple agents to various servers or machines. This centralized approach allows you to collect logs from all the machines in one place, enabling efficient detection and response to cyber threats and various other attacks.

In conclusion, deploying Wazuh agents on your servers not only enhances your cybersecurity posture by consolidating log data for centralized analysis but also provides a proactive defense against potential threats. By monitoring and responding to security incidents in real-time, Wazuh empowers you to safeguard your digital environment effectively.

Thank you for taking the time to read this post. I hope you found it helpful. Stay tuned for more insights in our next encounter. Until next time, stay secure and stay curious!