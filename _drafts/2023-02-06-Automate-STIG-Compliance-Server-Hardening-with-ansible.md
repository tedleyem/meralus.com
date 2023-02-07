---
layout: post
title:  "NEW TITLE"
date:   2022-02-01
excerpt: "lorem ipsum"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

MAutomate STIG Compliance Server Hardening with OpenSCAP and Ansible

STIG

Security Technical Implementation Guide (STIG) is a list of configuration guideline for hardening systems(e.g networks, servers, router, firewalls, active directory, DNS, OS, workstations, whole environments, individual applications, equipments etc) to improve the security. These guidelines are developed by Defense Information System Agency (DISA) for the U.S. Department of Defense. Systems are inherently vulnerable out of the box. By implementing DISA STIGs you are remediating those vulnerabilities, making your systems much more secure. The STIG checklists/guideline are defined in XML files with XCCDF format(more details about XCCDF discussed in following sections). These checklists content can be view in STIG Viewer which can be downloaded and run as a JAR executable. The applicability of STIG requirements covers DoD agencies, contractors connected to DoD networks, and any other organizations or systems that connect to DoD information networks. Following are the major areas included in the STIG topics(but are not limited to),

Applications
Cloud networks
Mobile devices
Operating systems
Browsers
Routers and servers
Networks
Network devices
System architecture

The vulnerabilities mitigated by each STIG requirement have different levels of potential threat. These range from vulnerabilities at immediate risk of significant exploitation to indirect risks that affect the general security of the system. Compliance with the most at-risk controls is of utmost importance. Each control found within the STIG has a compliance level assigned to it. The level corresponds to the degree of risk from the vulnerability or threat. There are three categories of severity, ranked on level of risk or vulnerability. These are known as Severity Category Codes (CAT), with CAT 1, CAT 2 and CAT 3 levels of risk. CAT 1 controls cover the most severe vulnerabilities and risks.

There is an another compliance guideline/standard defined in NIST Risk Management Framework(RMF). STIGs apply to DoD agencies and NIST(RMF) guide can be applied all agencies(government, private etc). STIG settings cover various NIST SP 800–171 and CMMC domains including access control, identification and authentication, audit and accountability, configuration management, and system and communications protection. So by implementing DISA STIG settings on your systems you are configuring them to be compliant with NIST SP 800–171 and CMMC requirements and guarantee that your systems are configured to meet your compliance requirements.
SCAP

Security Content Automation Protocol(SCAP) is a standard method that provides automated vulnerability management, patch checking and compliance checks in various hosts. It developed by the National Institute of Standards and Technologies(NIST). SCAP checks security compliance by using XCCDF(Extensible content checklist definition format) and OVAL(open vulnerability automation language). XCCDF is XML-based language for specifying checklists and reporting the results of checklist evaluations. XCCDF is an XML file that contains policy structure with unique name and benchmark ID. It helps to check the vulnerability of hosts. The OVAL is a XML-based language for specifying test procedures to detect machine state. OVAL files contain policy checks and helps to check whether the host has up-to-date patches or not.
SCAP Security Guide(SSG)

SCAP Security Guide(SSG) is a security policy written in a form of SCAP documents(policy documents mainly write in the format of XCCDF). The security policy created in SSG covers many areas of computer security and provides the best-practice solutions. The guide consists of rules with very detailed description and also includes proven remediation scripts, optimized for target systems.

SSG implements security guidances recommended by respected authorities, namely PCI DSS, STIG, and USGCB. SSG transforms these security guidance into a machine readable format which then can be used by OpenSCAP to audit your system. SSG builds multiple security baselines from a single high-quality SCAP content. The DISA STIG for RHEL 6, which provides required settings for US Department of Defense systems, is one example of a baseline created from this guidance. If your systems must to comply to these baselines, you simply select appropriate profile from SSG. Security policies in SSG are available for various operating systems and other software, Fedora, Red Hat Enterprise Linux, Mozilla Firefox and others. SSG is a dynamic open source project, which means that many organizations interested in computer security share their efforts and collaborate on security policies contained in SSG. It has usage in Military and Intelligence communities, healthcare, aviation, telecom and other industries. And above all, SSG is available for download free. SSG, together with OpenSCAP tool, can be used for auditing your system in an automated way, more details discussed in following section.
OpenSCAP

OpenSCAP is a free and open-source security automation tool for managing system security and compliance testing. It is a free implementation of SCAP which has been certified by NIST as correctly implementing the SCAP standards. OpenSCAP can provides a wide range of hardening and auditing guidelines for enforcing security. OpenSCAP provides various tools for auditing systems and fixing problems in your system, according to the SSG. SSG, together with OpenSCAP tool, can be used for auditing your system in an automated way. For an example OpenSCAP can find the vulnerabilities in the system according to the STIG guidelines and automate them according to the STIG standard(e.g via using bash scripts or Ansible playbooks). In this post I’m gonna discuss about using OpenSCAP to hardening the Ubuntu 20.04 server with STIG guidelines using OpenSCAP and Ansible. Following are the steps.
1. Install OpenSCAP and SSG Packages

Following command will automatically install OpenSCAP and SSG packages for Debian-derived systems(ssg-debderived). The installed SSG packages will be available in /usr/share/xml/scap/ssg/content directory. It contains various SSG documents which written in XCCDF format.
2. Get Latest SSG Packages

The currently install SSG packages does not have latest SSG package updates. For an example it contains SSG documents of ubuntu 16.04 server and does not have SSD document of ubuntu 20.04 server. We have to manually download the latest SSG packages from ubuntu repository.
3. Check Available SSG Profiles

The SCAP document for ubuntu 20.04 is scap-security-guide-0.1.60/ssg-ubuntu2004-ds.xml. We can check the available SSG profiles on SCAP document via openscap info command.

Main thing to notice here is that the SCAP document contains multiple profiles which are corresponding with different compliance standards(e.g CIS, STIG etc). The profile contains unique profile id. The profiles include CIS Benchmark, STIGs security compliance, and standard security profile. These profiles provides guidance and security compliance you can use to audit your system in different standards(e.g CIS, STIG etc). In this scenario we are using STIG profile to audit and hardening the system. We can view the information of specific profile id with following command.
4. Scan with OpenSCAP

The main goal of the OpenSCAP tool is to perform configuration and vulnerability scans of the system. OpenSCAP doing the scanning against the policies defined in the SCAP document profile. oscap xccdf eval is the command that used to scan/audit the system with corresponding SCAP document profile. In the command we need to specify the SCAP document path and profile id. It will generate scan/audit report as HTML file as well as Asset Reporting Format (ARF) xml file. When scanning, you’ll see a lot of output and tests performed by the oscap command. There are different results in audit reports: pass, fail, notchecked, and notapplicable.

Above command scan the vulnerabilities in the system generates audit report rahasak-report.html and audit result ARF xml file rahasak-result.html. We can view the audit report HTML file in the browser and get more details. The report contains the Ubuntu 20.04 server’s STIG compliance score 63%. OpenSCAP gives this score based on the vulnerabilities in the system. Scan report contains detailed information about the vulnerabilities in the system as well. We can fix these vulnerabilities and get higher score. OpenSCAP provides automated way to fix the vulnerabilities.
5. Generate SSG Guide and Check List

OpenSCAP provides a way to generate SSG guide to hardening the system. In our scenario we can generate SSG guide to hardening the server with STIGs compliance. Following command will generates an SSG guide and security checklist for STIGs security compliance.
6. Generate Server Hardening Ansbile PlayBook

The most interesting thing with OpenSCAP is that it provides a way to automate server hardening based on the identified vulnerabilities. For an example we generate an Ansible playbook to remediate the server according to security compliance(e.g STIG) automatically. The Ansbile playbook will be generated-based on the vulnerabilities that identified in the system(we have scan the vulnerabilities in the system and recorded in the ARF file). Following is the way to generate the Ansible playbook rahasak-playbook.yml based on the audit ARF result file(vulnerability scan result file) in rahasak-result.xml, which uses the STIGs security compliance. Apart from the Ansible, OpenSCAP supports to generate hardening script as bash script as well.

Following is the part of generated Ansible playbook. It contains more automation tasks. By using the Ansible playbook we can harden the Ubuntu 20.04 server according to the STIG compliance guide.
Apply Ansible Playbook

Once generated the Ansible/Bash script we can apply it and fix the vulnerabilities in the system. In following command I’m executing the Ansible Playbook on dry run mode(with --check). Once you fix the vulnerabilities(e.g with generated Ansible Playbook), you run the OpenSCAP audit again with oscap xccdf eval as mentioned in the Section 4. Then it will give you higher STIG compliance score since vulnerabilities are fixed according to the STIG guide.



Reference

    https://4sysops.com/archives/disa-stig-compliance-tools/
    https://www.perforce.com/blog/kw/what-is-DISA-STIG
    https://adamtheautomator.com/openscap/
    https://blog.knoldus.com/openscap/
    https://www.solarwinds.com/federal-government/solution/disa-stig-compliance
    https://www.cubcyber.com/disa-stig-cmmc-nist-800-171
    https://www.quora.com/In-computer-security-how-are-STIG-and-SCAP-related-or-different
    https://www.teimouri.net/what-is-openscap/
    https://www.teimouri.net/what-is-openscap/#OpenSCAP_Security_Guide
    https://middlewaretechnologies.in/2022/04/how-to-scan-ubuntu-system-vulnerabilities-using-openscap.html

    