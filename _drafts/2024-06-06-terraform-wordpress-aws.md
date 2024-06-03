---
layout: post
title:  "NEW TITLE"
date:   2024-02-01
excerpt: "lorem ipsum"
img: "blog-headers/vr-movie.jpg"
project: true
---
https://dev.to/aws-builders/aws-terraform-wordpress-step-by-step-guide-example-3p6d

AWS, Terraform ,WordPress. Step-by-Step Guide Example
#
aws
#
terraform
#
wordpress
#
tutorial
Image description

I've looked at many ways to run Wordpress on AWS but they are all expensive or unstable for me. So I decided to make a stable version of Wordpress installation that suited me.

Infrastructure management has changed a lot over the years. So much so that the traditional system administrator managed a rack full of servers. In many cases, the initial setup required manual intervention at the console.

Why AWS for WordPress might be a great choice
To begin with, AWS is a big deal. It's the cloud hosting provider with the largest market share. AWS is such a successful platform that it accounts for half of Amazon's operating income, which is in the billions of dollars.

AWS offers high scalability, making it ideal for sites with thousands of daily visitors. The platform also allows for any server configuration. This is ideal for high-performance sites such as online stores.

In this article, I will show you how to use Terraform to install Wordpress on AWS.

Our objectives

Create a ‘tf’ files which will hold all of our relevant configuration information (main.tf, …)

Define which provider we will be using in the Terraform config. (aws, cloudflare)

Certificate handling (AWS Certificate Manager)

Define security group rules and names.

Define the EC2 instances we want to create. (AWS Auto Scaling Group)

Run Terraform to plan and apply our configuration.

Before you get started, you’ll need to sign up for AWS. During the process, you’ll need to verify your account using a credit card – onto which they’ll charge $1 – and receive a verification code via SMS.
When you’re ready, select the Free support plan and you’ll get access to your console, which is where the magic happens

So, let's start creating our wordpress in AWS

I will assume that you have already configured all the necessary tools to run such as Terraform, aws-cli

The first thing you need to do is clone the repository:
$ git clone https://github.com/timurgaleev/wordpress-ec2-rds-alb-vpc.git

Once you've taken the templates from the repository, you now need to configure the 'tf' files, which will hold all of the relevant Terraform configuration. You can encapsulate it in one file, but for simplicity and convenience we will work within multiple files.

The structure of the repository is as follows:

acm.tf - AWS Certificate Manager Terraform module
alb.tf - AWS Application and Network Load Balancer Terraform module
asg.tf - AWS Auto Scaling Group (ASG) Terraform module
cloudflare.tf - Cloudflare Provider
efs.tf - Provides an Elastic File System (EFS) File System resource
output.tf - Terraform Output Values
rds.tf - AWS RDS Terraform module
security_group.tf - AWS EC2-VPC Security Group Terraform module
vpc.tf - AWS VPC Terraform module
variables.tf - variables used in Terraform.

Prerequisites needed for creating a envirenment
provider.tf you will need a change.
backend "s3" {
    bucket         = "ecs-terraform-examplecom-state"
    key            = "example/com.tfstate"
    region         = "eu-west-1"
    encrypt        = "true"
    dynamodb_table = "ecs-terraform-remote-state-dynamodb"
  }
It will also use an S3 bucket that will be used as a remote store for our Terraform state. This allows multiple users to work with one set of Infrastructure as Code without causing conflicts.

Then change the variables according to your needs.
variables.tf like environment, Domain, Cloudflare API Token
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
  default     = "example.com"
}

variable "cloudflare_zone" {
  description = "cloudflare Zone Id"
}

variable "dns_ttl" {
  description = "cloudflare for dns = 1 is automatic."
  default     = 1
}

variable "dns_allow_overwrite_records" {
  description = "cloudflare allow overwrite records."
  default     = true
}

variable "cloudflare_api_token" {
  description = "cloudflare api token"
}

variable "ssh_key_name" {
  description = "SSH Key"
}
Now we can run our WordPress.

Run terraform init
Run terraform plan and review
Run terraform apply
Now enter your server domain, and you'll see the following WordPress installation screen. If that's the case, great job! If you don't see that screen, you may need to double-check the steps you followed.

You can destroy this WordPress by running:
terraform plan -destroy
terraform destroy  --force
Conclusion
We've only had a superficial look at how Terraform can be used in AWS, but I think a simple introduction is the best part! We created a database in RDS and plugged it into Wordpress as well as created and wired the necessary data into Cloudflare.