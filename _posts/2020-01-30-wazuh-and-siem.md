---
layout: post
title:  "Infrastructure security with Wazuh and SIEM"
date:   2021-01-30
excerpt: "SIEM and Wazuh security"
project: true
tags: [add, tags, here,]
comments: true
---


The past year of 2020 has introduced and exposed a lot of very scary thing to the world. A global pandemic, political unrest, and the [2020 United States federal government data breach](https://en.wikipedia.org/wiki/2020_United_States_federal_government_data_breach). CyberSecurity and protection is, and has been, at an all time high. The [Solar Winds attack](https://www.csoonline.com/article/3601508/solarwinds-supply-chain-attack-explained-why-organizations-were-not-prepared.html) also leaves people and businesses frightened and worried about their own security. SIEM (or Security and event management) is one of the most popular approaches to making sure you can stay ready and protected to help prevent or mitigate attacks in the future. There are a lot of SIEM platforms for security like IBM QRadar or McAfee Enterprise Security Manager, but today, I wanted to shine some light on a free and open source solution known as Wazuh. Having it be open source and free to setup should allow you to bring it up when speaking to your team about new resolutions for your company moving forward, or at least be in the conversation for best security platform. Is it the Lebron James or Michael Jordan of security? You can decide after reading.


# What is Wazuh
Wazuh, which a pronounce 'wah-zoo' is an open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance. It has so many features as an open source application that I consider it the "Full" platform. I want to break down its features, ways to set it up, and how you can use it in your dev or business environment.

I'm going to my best here to explain its features and how it may help you with examples that may help better understand. At times when reading about features on high class software or enterprise ready solutions I get lost with tech jargon and spend more time learning acronyms and less time learning about products or software, or news for that matter.

# Security Analytics
Live and real-time monitoring you can check daily to make sure that there aren't any suspicious people actively trying to log into your servers or changes to an app you built aren't being made without you knowing about it. The dashboard is colorful and nice as well.
# Intrusion Detection
Intrusion Detection is similar to malware scans and checking to make sure your app isn't making hidden files or doing things its not supposed to. If you've ever been afraid that the picture you downloaded isn't a virus, this feature will help tell you that.
# Log Data Analysis
This features helps read logs and can build graphs that help you see how many times there were errors in a file. Want to see how many times your apache web app or php web app was being hit before it crashed. This features will help put that in a graph for you.
# File Integrity Monitoring
When working on team projects there are normally more than one person editing files or making changes. Who changed the permissions to the htpassword file that should be owned by apache? This feature helps monitor files to find out who changed what files or what application modified the files that it needs to.
# Vulnerability Detection
Software and packages get updated so much these days that its hard to keep up. When the solardwinds attack happened CVE's (or common Vulnerabilities and exposure fixes) are created to help fix any software that could affect your system. Vulnerability Detection will help you know that the packages on your system are up to date
# Configuration Assessment  
To better secure an application or a system, there are security policies that can be put in place. This feature helps make sure hardening guides and security policies and standards are in place or need to be changed.
# Incident Response
Stuff happens, and when it does, actions should be put in place. The Incident Response feature helps with actively performing countermeasures. Need to make sure that the IP address that was attacking your system was blocked? This will help remind you if thats been done or not.  
# Regulatory Compliance PCI/STIG compliance
If your managing a database that saves user information or credit card data because your ideas on those t-shirts with cats on it is selling like crazy, the Regulatory Compliance features in Wazuh will help you stay up to date with the latest PCI requirements to meet security standards. Miss Stewart's credit card information wont be leaked and she can rest assure that she can buy more products from your site. Maintain security by implementing multiple types of Security Standards and practices with this features.
# Cloud Security
The cloud security features in Wazuh allows you to pull security data from big named cloud providers like Google or AWS and help provided rules to asses how your environment is configured.
# Container Security  
With containers capitalizing the market its important to make sure that all your containers, whether they be docker or another container platform, have some kind of detection to report and help prevent threats from hackers connecting to your containers that hold your data.

Speaking of containers and Wazuh, Lets work on setting up a Wazuh cluster with some popular container platforms. In these examples ill be using the following software versions.

* Ubuntu 20.04
* Docker version 19.0.3.8, build afacb8b7f0.
* kubernetes v1.11.0+d4cacc0
* openshift (oc) v3.11.0+d4cacc0

# Setting up Wazuh
Many companies are currently using, or have migrated to a container based architecture like OpensShift or Kubernetes to manage their infrastructure. Here is a quick guide on setting up a Wazuh kubernetes cluster, along with a way to setup and test it in your local environment with docker-compose. For a deeper dive on how they setup the docker containers involed in wazuh, you can check out their [Github repo](https://github.com/wazuh/wazuh-docker).



Having at least two Kubernetes nodes in order to meet the podAntiAffinity policy.


Deploy
Deploy Kubernetes

Follow the [Official guide](https://documentation.wazuh.com/4.0/deploying-with-kubernetes/kubernetes-conf.html) to deploy a Kubernetes Cluster there are a few pre-requisites before deploying.
Once the pre-requisites have been met you can now clone the wazuh repo.

$ git clone https://github.com/wazuh/wazuh-kubernetes.git
$ cd wazuh-kubernetes

Once you cd into the wazuh dir you can get the entire setup running with one single command.

$ $ kubectl apply -k .

If you wanted to take it setup by step you can remain in the same dir and run the following commands and make necessary system changes as needed.

#Deploy wazuh's elastic stack
$ kubectl apply -f base/wazuh-ns.yaml
$ kubectl apply -f base/aws-gp2-storage-class.yaml

$ kubectl apply -f elastic_stack/elasticsearch/elasticsearch-svc.yaml
$ kubectl apply -f elastic_stack/elasticsearch/elasticsearch-api-svc.yaml
$ kubectl apply -f elastic_stack/elasticsearch/elasticsearch-sts.yaml

# Deploy Kibana and Nginx configs
In case you need to provide a specific domain name or configure cloud based parameters
you can make those changes in the nginx-svc and nginx-deploy.yaml files that are in the
elastic_stack/kibana dir.

$ kubectl apply -f elastic_stack/kibana/kibana-svc.yaml
$ kubectl apply -f elastic_stack/kibana/nginx-svc.yaml

$ kubectl apply -f elastic_stack/kibana/kibana-deploy.yaml
$ kubectl apply -f elastic_stack/kibana/nginx-deploy.yaml
3.4. Deploy Logstash

# Deploy logstash for log monitoring
To deploy logstash for log detection, retention, and management you can
deploy the following.
$ kubectl apply -f elastic_stack/logstash/logstash-svc.yaml
$ kubectl apply -f elastic_stack/logstash/logstash-deploy.yaml
Deploy Wazuh

# Setting up the wazuh cluster
Getting the final bits and peices of the wazuh cluster up, or making
changes to system requirements or ip addresses you can make the changes to the .yaml files in the wazuh_managers dir and deploy the following.

$ kubectl apply -f wazuh_managers/wazuh-master-svc.yaml
$ kubectl apply -f wazuh_managers/wazuh-cluster-svc.yaml
$ kubectl apply -f wazuh_managers/wazuh-workers-svc.yaml

$ kubectl apply -f wazuh_managers/wazuh-master-conf.yaml
$ kubectl apply -f wazuh_managers/wazuh-worker-0-conf.yaml
$ kubectl apply -f wazuh_managers/wazuh-worker-1-conf.yaml

$ kubectl apply -f wazuh_managers/wazuh-master-sts.yaml
$ kubectl apply -f wazuh_managers/wazuh-worker-0-sts.yaml
$ kubectl apply -f wazuh_managers/wazuh-worker-1-sts.yaml


Once you have them all deployed you can verifying the deployment
and make sure all the pods and containers are running properly with this command.  

# Checking Namespaces
$ kubectl get namespaces | grep wazuh

# Checking Services
$ kubectl get services -n wazuh

# Checking Deployments
$ kubectl get deployments -n wazuh


# DOCKER
If your not familiar with the complexity of kubernetes you can also spin up
a wazuh cluster using a docker-compose file. This works in a production environment that doesn't use container based architectures like kubernetes or openshift as well. I've set this up for a few different businesses that have utilized it as a full stack application security suite.

To get the docker-compose.yml file on your system:

$ curl -so docker-compose.yml https://raw.githubusercontent.com/wazuh/wazuh-docker/3.9.5_7.2.1/docker-compose.yml


To get the full Wazuh repository:
$ git clone https://github.com/wazuh/wazuh-docker.git -b 3.9.5_7.2.1 --single-branch

To start the Wazuh stack, which includes Wazuh, elasticsearch, and nginx, you can do the following.

$ cd wazuh-docker/

You can start the cluster with docker by running this command:
$ docker-compose up -d

A good warning when spinning this up is to fine tune the elasticsearch container because java. Elasticsearch can be quite resource heavy so fine-tuning the ES_JAVA_OPTS memory variable ex. "ES_JAVA_OPTS=-Xms1g -Xmx1g"

# Container security - STIG
Many companies use STIG's to help with implementing CVE's so they can stay up to date with security threats. That last sentence was something you would probably read on a business page and get confused so let me break that down. STIG stands for Security Technical Implementation Guide, which is a set of standards required to meet security protocols for a server so that it wont be affected by different viruses in the world. Many times STIG checks will let you know if a package on your server is out of date or needs to have a specific version that will secure it from specific security attacks. CVE's are Common Vulnerabilities and Exposures which are what get created when major viruses affect different platforms, applications, or businesses. Naturally when you hear about something like the [Solarwinds Hack](https://www.theverge.com/2020/12/21/22194183/intel-nvidia-cisco-government-infected-solarwinds-hack) that plague big businesses there is typically a CVE created that many security platforms implement to secure their servers.

# SCAP scanner and evaluations
SCAP, or Security Content Automation Protocol is an expression used for changing security data in a standardized and human readable format. Once you setup wazuh or have it running proper it may feel intimidating but that's what this itty bitty blog is about.

For a a setup of Wazuh using ansible check out [this playbook ](https://github.com/tmeralus/ansible-role-wazuh-setup) 
