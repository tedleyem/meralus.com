---
layout: post
title:  "Deploy wordpress on AWS with Terraform"
date:   2023-11-26
excerpt: "a very simple wordpress project for aws"
project: true
img: "blog-headers/wordpress-terraform-aws.png"
---


# Deploying a Wordpress site in the cloud.
I have been using wordpress since 2013 and be cause 30% of the internet runs on wordpress I tend to use it as my go-to platform when learning or testing someting new in my studies. So, I've looked at a few ways to run Wordpress on AWS and how I can spin up wordpress using Infrastructure as Code. Most options appear as services with hosted plans that cost money, and as an advocate of the FREE part of FOSS, or Free and Open Source Software I tend to lead towards solutions that allow me to learn something new without little to know overhead.

Devops Tools and IAC management has transformed so much over the years that sometimes picking a tool to use can lead to learning a new foreign language just to find out reinventing the wheel isn't needed. I wanted to find something that allows me to setup wordpress and not have to do much changes in the AWS console, or on a server. Spinning things up in the cloud to be used at scale shouldnt require much stand-alone troublehsooting required.

##### Why use AWS
Why not! AWS is the cloud platform of choice because, like Ubuntu, it has a huge presences, tons of documentation and support, and most companies use it or are moving towards aws. It is my platform of choice because I can spin up and down my resources with ease.

##### Why use Terraform
Terraform allows me to use a popular IAC tool that is easy to understand and use to provision software in the cloud.
With the similarities it was with ansible in terms of the folder structure, modular simplicity, and ease of use, it felt like a no brainer to pick up and learn.

This blog post, for what its worth, is intended to allow me to do the following:


* Explain how to use Terraform to install Wordpress on AWS.
* Create security groups and ec2 instances in AWS
* Use terraform to manage the development and deployment
* Share something that someone might use in the future.


#### Stateless vs Stateful Deployment
There are a few different ways to deploy Wordpress that I considered. I thought it would be nice if it can be stateless, using tools like docker, AWS ECS, and AWS Fargate to spin up containers an deploy wordpress in a more stateless fasion where it reads the current state of all the files present and possibly make it easier to make udpates locally, however, there is more to be discussed with that process. I then decided wordpress makes sense as a stateful application. A quick breakdown of [Stateful vs Stateless applications](https://stackoverflow.com/questions/5329618/stateless-vs-stateful) can be read here.


#### Getting Started
A little disclaimer here. Im not going to go too deep into how to use Terraform or all the intricacies of Wordpress. This solution is a very simple, bare-bone solution to getting a wordpress instance working properly. There are definietly endless ways to use wordpress in a stateless fashion or load balance it in a better way. This solution should be used for spinning up wordpress for possibly creating a proof of concept website or a small business possibly. Im sure you can use this for large scale ecommerce sites or anything of the sort, but you should use it with caution.

Before getting started you should also sign up for AWS and sign up for a free support plan to access the AWS Console.

Required Software:
* Terraform
* AWS Account (web)
* aws-cli

Once you have your environment setup yor first step should be to clone this repository:

 $ git clone https://github.com/tedleyem/terraform-wordpress-aws-ec2.git

Now that you have the repo, you can start updating the 'tf' files, which will hold all of the relevant Terraform configuration. In some cases I have encapsulated all the files into one large main.tf file to make things easier. However,  as you start working in teams and start reading more about terraform you'll understand how breaking down the different components of resources into different tf files will make managing the project much easier. So I broke down the structure
to represent each aws resource.



#### The Structure
The structure of the repository is:
```
alb.tf            - AWS Application and Network Load Balancer
asg.tf            - AWS Auto Scaling Group (ASG)
cloudflare.tf     - Cloudflare Provider (for ssl certs)
efs.tf            - Elastic File System (EFS) File System resource
output.tf         - Terraform Output Values
rds.tf            - AWS RDS
security_group.tf - AWS EC2-VPC Security Group
vpc.tf            - AWS VPC
variables.tf      - all variables used in this Terraform project.
provider.tf       - AWS and Hashicorp API provider information
```

#### S3 Storage and remote state
An S3 bucket is created to be used as a remote store for our Terraform state. This helps with allowing multiple users to work with one set of Infrastructure as Code without causing conflicts.

The code can be found in provider.tf and looks like this.
IMPORTANT: create the s3 bucket before running terraform init

```
backend "s3" {
    bucket         = "wp-dev-bucket"
    key            = "wp-dev-com.tfstate"
    region         = "us-east-1"
    encrypt        = "true"
    dynamodb_table = "ecs-terraform-remote-state-dynamodb"
  }
```

However, to make future changes a bit easier I have set the s3 bucket variables in variables.tf

#### S3 Variables
Change these s3 bucket variables

```
variable "s3-bucket-name" {
  description = "aws s3 bucket name"
  default     = "ecs-terraform-examplecom-state"
}

variable "s3-bucket-key" {
  description = "aws s3 bucket key"
  default     = "wpdev.com.tfstate"
}

variable "s3-bucket-region" {
  description = "S3 bucket aws region"
  default     = "us-east-1"
}

```


#### Other Variables
You can then change the variables according to your needs in
variables.tf

A few important onces to look at and change are things like like the work environment, domain, ASG scaling sizes, and any other variables you see fit.

```
variable "asg_min_size" {
  description = "AutoScaling Group Min Size "
  default     = 1
}

variable "asg_max_size" {
  description = "AutoScaling Group Max Size "
  default     = 2
}

variable "asg_desired_capacity" {
  description = "AutoScaling Group Desired Capacity"
  default     = 1
}

variable "rds_engine" {
  description = "RDS engine"
  default     = "mariadb"
}

variable "rds_engine_version" {
  description = "RDS engine version"
  default     = "10.6.7"
}

variable "rds_instance_class" {
  description = "RDS instance class"
  default     = "db.t3.micro"
}

variable "site_domain" {
  description = "Domain"
  default     = "devmastersite.com"
}

```

#### Running with Terraform
Once all the changes you need are made you can run terraform to test, review and apply to AWS.

    Run terraform init
    Run terraform plan and review
    Run terraform apply

##### OUTPUTS
There is an outputs.ft file that will present varables after they have been provisioned in aws for you.
You can take the "ec2_ssh_ip" and put it in your browser to see the Wordpress Installation screen and get started.

If you get to the Installation screen.... SUCCESS!!! You can now have fun with your
new project...If you don't see that screen, you may have to double-check the steps you followed here.

##### DESTROY
To save money you can destroy the WordPress instance by running the following:
terraform plan -destroy
terraform destroy  --force


#### Conclusion
This is a very simple idea and look at how to deploy a wordpress website on aws using Terraform. A database was created, mutiple aws resources were used and provisioned, and now you can consider yourself the king or queen of learning! Hopefully this brought you some insight on Terraform and AWS or some interest in cloud development.

If you needed further assistance or want ot chat about this feel free to contact me or follow these resources.

## RESOURCES

* [Stateful vs. Stateless Web App Design](https://blog.dreamfactory.com/stateful-vs-stateless-web-app-design/)
* [Terraform Docs](https://terraform-docs.io/)