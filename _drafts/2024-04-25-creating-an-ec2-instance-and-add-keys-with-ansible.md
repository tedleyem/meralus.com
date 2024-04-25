---
layout: post
title:  "Ansible and Elastic Compute Cloud EC2"
date:   2024-04-25
excerpt: "creating an ec2 instance with ansible"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

https://github.com/tedleyem/ansible-ec2-keys-blog


Introduction
Ansible is a configuration management tool, and unlike Chef and Puppet, it uses a push mechanism to make the desired changes on the servers using ssh-agent. For AWS, we can use boto SDK instead.

$ ansible --version
ansible 2.9.11
  config file = None
  configured module search path = ['/Users/kihyuckhong/.ansible/plugins/modules', '/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/local/Cellar/ansible/2.9.11/libexec/lib/python3.8/site-packages/ansible
  executable location = /usr/local/bin/ansible
  python version = 3.8.5 (default, Jul 21 2020, 10:41:41) [Clang 10.0.0 (clang-1000.11.45.5)]    




Note
In this article, we'll start by installing boto3 and then create a S3 bucket for testing. Then, we'll see two codes of creating an EC2 instance. Though they are not much different, the latter one shows how we can use role and how to add a public key on remote server's "authorized_keys" file.

Requirements
Requirements (on host that executes modules):

python 3
awscli
boto - Ansible will connect to AWS using the boto SDK. So, we need to install the boto and boto3 packages. :
$ pip3 install boto boto3

Creating an S3 bucket
Ansible uses Boto 3 which is the SDK used by AWS that allows Python code to communicate with the AWS API. So, to connect to the AWS, all we need is a hosts file that tells Ansible where it can find the remote resources we want to provision. In other words, we'll simply point Ansible to localhost and boto will handle connections behind the scenes.

Here is the hosts file:

[local]
localhost ansible_python_interpreter=/usr/local/bin/python3    

Note that we set the ansible_python_interpreter configuration option to /usr/bin/python3. The ansible_python_interpreter configuration option is usually set per-host as an inventory variable associated with a host.

We need a playbook file, here we call it as creating_an_s3_bucket.yml:



---
  - name: s3 test
    hosts: local
    connection: local

    tasks:
      - name: Creating a new bucket
        aws_s3:
          bucket: bogotobogotest91008
          mode: create
          region: us-east-1    
The tasks section describes what we want Ansible to perform: use the aws_s3 module to create a new bucket on Amazon's S3 in the us-east-1 region.


Here are our files:

.
├── creating_an_s3_bucket.yml
└── hosts    

Then, we run the playbook by calling the ansible-playbook command using -i to specify the hosts file, and then pointing to the playbook file:

$ ansible-playbook -i hosts creating_an_s3_bucket.yml

PLAY [s3 test] ***********************************************************************************************************************************************************************************************

TASK [Gathering Facts] ***************************************************************************************************************************************************************************************
ok: [localhost]

TASK [Creating a new bucket] *********************************************************************************************************************************************************************************
changed: [localhost]

PLAY RECAP ***************************************************************************************************************************************************************************************************
localhost                  : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0      

$ aws s3 ls
...
2020-11-01 21:58:01 bogotobogotest91008
...


Creating an instance - I
Here is our playbook (site.yml) to create an instance:

---
- name: Create a new Demo EC2 instance
  hosts: localhost
  gather_facts: False

  vars:
      region: us-east-1
      instance_type: t2.nano
      ami: ami-0dba2cb6798deb6d8  # Ubuntu 20.04 LTS
      keypair: einsteinish # pem file name
      subnetid: subnet-0e80c6bbb664c7138
  
  tasks:

    - name: Create an ec2 instance
      ec2:
         key_name: "{{ keypair }}"
         group: einsteinish  # security group name
         instance_type: "{{ instance_type }}"
         image: "{{ ami }}"
         wait: true
         region: "{{ region }}"
         count: 1  # default
         count_tag:
            Name: Demo
         instance_tags:
            Name: Demo
         vpc_subnet_id: "{{ subnetid }}"
         assign_public_ip: yes
      register: ec2

	  Note that when launching an EC2 instance with ansible via the ansible ec2 module, the hosts variable should point to localhost and gather_facts should be set to False.

The value of the variables will be passed when executing the playbook. The "{{ }}" is being used to evaluate the value of the variable. The statement wait: true is used to let ansible wait for the instance to come.

The statement register: ec2 registers the output in ec2 variable so that we can run the query to find out different properties of the instance.

Let's run the playbook:

$ ansible-playbook site.yml

We can see the instance is being created:

Creating an instance - II
Here is the file structure (Github source available here):

.
├── AddingKeys
│   ├── group_vars
│   │  └── all
│   ├── site.yml
│   └── users
│       ├── public_keys
│       │   └── k.pub
│       └── tasks
│           └── main.yml
├── CreatingEC2
│   ├── create
│   │   └── tasks
│   │       └── main.yml
│   ├── group_vars
│   │   └── all
│   └── site.yml
├── README.md
└── hosts    

Note that we have two folders: CreatingEC2 to create an ec2 instance and AddingKeys to add a public key on remote server's "authorized_keys". Original plan was to put them under one folder and run sequentially in one shot, but I could not make it work due to "skipping: no hosts matched" error.

The initial hosts file looks like this:

[local]
localhost

[webserver]

While we're creating a new instance, we'll add a line with it's public ip-address under [webserver], and with that information, we'll append public key to the "authorized_keys" on a remote server.

Here are the files used:





site.yml:

- name: Create AWS instance
  hosts: 127.0.0.1
  connection: local
  gather_facts: False
  remote_user: ubuntu
  roles:
    - create

create/tasks/main.yml:

```
- name: Create security group
  ec2_group:
    name: "{{ project_name }}_security_group"
    description: "{{ project_name }} security group"
    region: "{{ region }}"
    rules:
      - proto: tcp  # ssh
        from_port: 22
        to_port: 22
        cidr_ip: 0.0.0.0/0
      - proto: tcp  # http
        from_port: 80
        to_port: 80
        cidr_ip: 0.0.0.0/0
      - proto: tcp  # https
        from_port: 443
        to_port: 443
        cidr_ip: 0.0.0.0/0
    rules_egress:
      - proto: all
        cidr_ip: 0.0.0.0/0
  register: test_firewall

- name: Create an EC2 key
  ec2_key:
    name: "{{ project_name }}-{{ env }}-key"
    region: "{{ region }}"
  register: ec2_key

- name: Save private key
  copy: content="{{ ec2_key.key.private_key }}" dest="../aws-private.pem" mode=0600
  when: ec2_key.changed

- name: Create an EC2 instance
  ec2:
    key_name: "{{ project_name }}-{{ env }}-key"
    region: "{{ region }}"
    group_id: "{{ test_firewall.group_id }}"
    instance_type: "{{ instance_type }}"
    image: "{{ ami }}"
    wait: yes
    instance_tags:
        env: "{{ env }}"
    count_tag: env
    exact_count: 1
    vpc_subnet_id: subnet-0e80c6bbb664c7138
    assign_public_ip: yes
  register: ec2

- name: Add the newly created EC2 instance(s) to host group
  lineinfile: dest={{ hostpath }}
              regexp={{ item.public_ip }} 
              insertafter="[webserver]" 
              line="{{ item.public_ip }} {{hoststring}}"
              state=present
  with_items: "{{ec2.instances}}"

- wait_for: path={{ hostpath }} search_regex={{hoststring}}

- name: Wait for SSH to come up
  local_action: wait_for 
                host={{ item.public_ip }} 
                port=22 
                state=started
  with_items: "{{ec2.instances}}"

- name: Add IP to ec2_hosts group
  add_host: hostname={{ item.public_ip }} groups=ec2_hosts
  with_items: "{{ec2.instances}}"

```


group_var/all:

region: us-east-1
instance_type: t2.nano
ami: ami-0dba2cb6798deb6d8  # Ubuntu 20.04 LTS
project_name: testing
env: staging
app_code_user: "ubuntu" # remote user
hoststring: "ansible_ssh_user=ubuntu ansible_ssh_private_key_file=../aws-private.pem"
hostpath: "../hosts"

Let's create an instance:

$ cd CreatingEC2

$ ansible-playbook -i ../hosts site.yml
PLAY [Create AWS instance] ***********************************************************************************************************************************************************************************

TASK [create : Create security group] ************************************************************************************************************************************************************************
ok: [localhost]

TASK [create : Create an EC2 key] ****************************************************************************************************************************************************************************
changed: [localhost]

TASK [create : Save private key] *****************************************************************************************************************************************************************************
changed: [localhost]

TASK [create : Create an EC2 instance] ***********************************************************************************************************************************************************************
changed: [localhost]

TASK [Add the newly created EC2 instance(s) to host group] ***************************************************************************************************************************************************
changed: [localhost] => (item={'id': 'i-0e8649ae1263fda00', 'ami_launch_index': '0', 'private_ip': '172.31.87.54', 'private_dns_name': 'ip-172-31-87-54.ec2.internal', 'public_ip': '3.236.71.250', 'dns_name': 'ec2-3-236-71-250.compute-1.amazonaws.com', 'public_dns_name': 'ec2-3-236-71-250.compute-1.amazonaws.com', 'state_code': 16, 'architecture': 'x86_64', 'image_id': 'ami-0dba2cb6798deb6d8', 'key_name': 'testing-staging-key', 'placement': 'us-east-1f', 'region': 'us-east-1', 'kernel': None, 'ramdisk': None, 'launch_time': '2020-11-03T16:22:47.000Z', 'instance_type': 't2.nano', 'root_device_type': 'ebs', 'root_device_name': '/dev/sda1', 'state': 'running', 'hypervisor': 'xen', 'tags': {'env': 'staging'}, 'groups': {'sg-06581b19c9d2df1bc': 'testing_security_group'}, 'virtualization_type': 'hvm', 'ebs_optimized': False, 'block_device_mapping': {'/dev/sda1': {'status': 'attached', 'volume_id': 'vol-0ef517e0f66a2fc66', 'delete_on_termination': True}}, 'tenancy': 'default'})

TASK [create : wait_for] *************************************************************************************************************************************************************************************
ok: [localhost]

TASK [create : Wait for SSH to come up] **********************************************************************************************************************************************************************
ok: [localhost] => (item={'id': 'i-0e8649ae1263fda00', 'ami_launch_index': '0', 'private_ip': '172.31.87.54', 'private_dns_name': 'ip-172-31-87-54.ec2.internal', 'public_ip': '3.236.71.250', 'dns_name': 'ec2-3-236-71-250.compute-1.amazonaws.com', 'public_dns_name': 'ec2-3-236-71-250.compute-1.amazonaws.com', 'state_code': 16, 'architecture': 'x86_64', 'image_id': 'ami-0dba2cb6798deb6d8', 'key_name': 'testing-staging-key', 'placement': 'us-east-1f', 'region': 'us-east-1', 'kernel': None, 'ramdisk': None, 'launch_time': '2020-11-03T16:22:47.000Z', 'instance_type': 't2.nano', 'root_device_type': 'ebs', 'root_device_name': '/dev/sda1', 'state': 'running', 'hypervisor': 'xen', 'tags': {'env': 'staging'}, 'groups': {'sg-06581b19c9d2df1bc': 'testing_security_group'}, 'virtualization_type': 'hvm', 'ebs_optimized': False, 'block_device_mapping': {'/dev/sda1': {'status': 'attached', 'volume_id': 'vol-0ef517e0f66a2fc66', 'delete_on_termination': True}}, 'tenancy': 'default'})

TASK [create : Add IP to ec2_hosts group] ********************************************************************************************************************************************************************
changed: [localhost] => (item={'id': 'i-0e8649ae1263fda00', 'ami_launch_index': '0', 'private_ip': '172.31.87.54', 'private_dns_name': 'ip-172-31-87-54.ec2.internal', 'public_ip': '3.236.71.250', 'dns_name': 'ec2-3-236-71-250.compute-1.amazonaws.com', 'public_dns_name': 'ec2-3-236-71-250.compute-1.amazonaws.com', 'state_code': 16, 'architecture': 'x86_64', 'image_id': 'ami-0dba2cb6798deb6d8', 'key_name': 'testing-staging-key', 'placement': 'us-east-1f', 'region': 'us-east-1', 'kernel': None, 'ramdisk': None, 'launch_time': '2020-11-03T16:22:47.000Z', 'instance_type': 't2.nano', 'root_device_type': 'ebs', 'root_device_name': '/dev/sda1', 'state': 'running', 'hypervisor': 'xen', 'tags': {'env': 'staging'}, 'groups': {'sg-06581b19c9d2df1bc': 'testing_security_group'}, 'virtualization_type': 'hvm', 'ebs_optimized': False, 'block_device_mapping': {'/dev/sda1': {'status': 'attached', 'volume_id': 'vol-0ef517e0f66a2fc66', 'delete_on_termination': True}}, 'tenancy': 'default'})

PLAY RECAP ***************************************************************************************************************************************************************************************************
localhost                  : ok=8    changed=5    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   

.
├── AddingKeys
│   ├── group_vars
│   │   └── all
│   ├── site.yml
│   └── users
│       ├── public_keys
│       │   └── k.pub
│       └── tasks
│           └── main.yml
├── CreatingEC2
│   ├── create
│   │   └── tasks
│   │       ├── main.yml
│   │       └── main.yml.bak
│   ├── group_vars
│   │   └── all
│   └── site.yml
├── README.md
├── aws-private.pem
└── hosts    


As we can see from the picture, after the run, we have a new *.pem file under the parent folder:

$ cat aws-private.pem
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAgG0JZ3VGl64cxSQO9VgNRWjtfv1TphPyrGl969qk/okNzVdL
...
4lfg3/IehT06d8ZsU7VPBkKnGq1mVq3eSPWWXC/yGoiwlrHssP85qg==
-----END RSA PRIVATE KEY-----~    
and our hosts file has been updated like this:
[local]
localhost

[webserver]
3.236.71.250 ansible_ssh_user=ubuntu ansible_ssh_private_key_file=../aws-private.pemm





Adding additional public key
We may want to add an additional key to the "authorized_keys" on the remote server so that our developer can ssh to the instance.

We'll work with the files under AddingKeys folder. The list of keys is located in users/public_keys and currently we have only one public key is listed in the folder.

One more thing about the hosts file. We need to add the ansible_python_interpreter to the file to tell ansible which python it should use on the remote instance:

[local]
localhost

[webserver]
3.236.71.250 ansible_ssh_user=ubuntu ansible_ssh_private_key_file=../aws-private.pem ansible_python_interpreter=/usr/bin/python3   

Also, modify the ip of the instance to site.yml:

- name: Add user keys
  hosts: 3.236.71.250
  #become: true
  #become_method: sudo
  remote_user: ubuntu
  roles:
    - users    

Let's run a playbook (AddingKeys/site.yml):

$ cd AddingKeys

$ ansible-playbook -i ../hosts site.yml
PLAY [Add user keys] *****************************************************************************************************************************************************************************************

TASK [Gathering Facts] ***************************************************************************************************************************************************************************************
ok: [3.236.71.250]

TASK [users : Make sure user is on server and generate ssh key for it] ***************************************************************************************************************************************
changed: [3.236.71.250]

TASK [users : Add public keys for developers] ****************************************************************************************************************************************************************
changed: [3.236.71.250] => (item=/Users/kihyuckhong/Documents/Minikube/DOCKER/ANSIBLE/EC2-B/Ansible-101/AddingKeys/users/./public_keys/k.pub)

PLAY RECAP ***************************************************************************************************************************************************************************************************
3.236.71.250               : ok=3    changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0  

We can check if the public key has been added:

$ ssh -i aws-private.pem ubuntu@3.236.71.250
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-1024-aws x86_64)
...

ubuntu@ip-172-31-87-54:~$ cat ~/.ssh/authorized_keys
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCAbQlndUaXrhzFJA71WA1FaO1+/VOmE/KsaX3r2qT+iQ3NV0v1rhPzLcV3wNYi989JR2lLijR8y8FRFwBl7946v6yiG88J8hx4bixfkpJD+sCtaaFleh7HpyKVAOVNHyTb7wVLJFM8/d6t1ocMpQFxAtjtdG7vcPkiFH3jkCcvxg3Qx6eo8youO71kGTVazGb5Twj5CH7n8I1Kf8XJ9stq5BUTt0/lmTj2LRmutCpCAvtNRqtye9H2YBk7DFUDip2P3vPwMbTASsj0+cT3mLi5l6xrl/ZGkfMAQ4rH4D+rCF/2S6zP6vwEX/8XtntEQJXFDc4PTCBAcZwGgV/xqwIZ testing-staging-key
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC82CMkjBEO2c/Bbp4vJojTCkjSk6n66uKC5f1jay+OTlqbyDy2EuVs23w0/3xh0iX+8K1rmFt9C4I3EWbjz5A+DZuop4TH/sBHgI2h6mIklGbJ6rL3QqMHeedm5dS2RrlgsBuc0woJwP8VVqB4tnHsSEDf9YYPkJ80eD/+PaoMMhvqaH9aDLhQuzlGtco5U8bL2lmIIqXV+KNowImFxuYGzCP8TNKxgxf5EbMpLXFDSTQ0h8CVGcLxRvW7NI8TbvCraRKFvhYFdM2fbnxJDOLEcHazYfu/R2cn4JvUsTWtKYzNq2vsL2LqigI2OiEt8piITdsphnuh7rM+x2MkU2/t kihyuckhong@Kihyucks-Air.attlocal.net

Yes, we have two keys: the one initially generated pair of "aws-private.pem" and the one added from local "AddingKeys/users/public_keys/k.pub" from local.


Here are the files used for adding keys.

AddingKeys/site.yml:

- name: Add user keys
  hosts: 3.236.71.250
  #become: true
  #become_method: sudo
  remote_user: ubuntu
  roles:
    - users

AddingKeys/users/tasks/main.yml:

- name: Make sure user is on server and generate ssh key for it
  user: name={{ app_code_user }}
        generate_ssh_key=yes

- name: Add public keys for developers
  authorized_key: user={{ app_code_user }}
                  key="{{ lookup('file', item) }}"
  with_fileglob:
    - ./public_keys/*.pub

AddingKeys/group_vars/tasks/all:

app_code_user: "ubuntu" # remote user

hosts:

[local]
localhost

[webserver]
3.236.71.250 ansible_ssh_user=ubuntu ansible_ssh_private_key_file=../aws-private.pem ansible_python_interpreter=/usr/bin/python3    












