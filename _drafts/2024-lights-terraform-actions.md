---
layout: post
title:  "Lights, Terraform, Actions"
date:   2024-02-01
excerpt: "automating aws infrastructure with terraform"
img: "blog-headers/vr-movie.jpg"
project: true
---

Lights, Camera, Terraform! No. Action! No wait.... lets automate AWS.  infrastructure with Terraform and Github Actions.

In this article, I will guide you with the steps on how to provision an instance (VM) in AWS Cloud by using Terraform code and a CICD pipeline that is GitHub Action. But before proceeding further, let me give you a brief overview of Terraform and GitHub Action.

# What is Terraform

Terraform is an open-source Infrastructure as Code (IaC) tool developed by HashiCorp. It allows users to define and provision infrastructure using a high-level configuration language. Key features of Terraform include:

Declarative Configuration: Users define what the infrastructure should look like, and Terraform handles the provisioning.
Provider Plugins: Supports various providers (AWS, Azure, Google Cloud, etc.), enabling management of a wide range of services.
State Management: Maintains the state of the infrastructure to track resource changes over time.
Execution Plans: Creates execution plans to preview changes before applying them, ensuring infrastructure consistency.
Resource Graph: Constructs a dependency graph to determine the correct order for resource creation, modification, or destruction.

# What are GitHub Actions

GitHub Actions is a CI/CD (Continuous Integration and Continuous Deployment) platform that allows users to automate their software development workflows directly from their GitHub repositories. Key features of GitHub Actions include:

Workflow Automation: Automates tasks like code testing, building, and deployment.
Customizable Workflows: Users can create custom workflows using YAML configuration files.
Triggers: Workflows can be triggered by events such as push, pull requests, and issues.
Integration with GitHub: Deep integration with GitHub, providing seamless interaction with repositories.
Marketplace: Access to a wide range of pre-built actions in the GitHub Marketplace to extend and enhance workflows.
Matrix Builds: Supports running jobs in parallel on different environments and configurations.
Together, Terraform and GitHub Actions can be used to automate the provisioning and management of infrastructure, ensuring consistent and repeatable deployments. By combining Terraform’s powerful IaC capabilities with GitHub Actions’ flexible automation workflows, teams can streamline their DevOps processes and improve overall efficiency.


# Now that we have the actors in place lets roll film

Setting up a GitHub Actions workflow to provision a virtual machine in AWS using Terraform involves several steps. Here’s a basic outline of what you need to do:

Access your AWS Console and locate the AMI ID that matches your OS and architecture on AWS
Create a GitHub repository for your Terraform configuration.
Write your Terraform script to provision the virtual machine.
Set up GitHub Actions with a workflow file.
Use GitHub Secrets to keep your AWS credentials (such as AWS Access Key and AWS Secret Key) safe. If you do not have these keys, you can create them by following this AWS IAM guide link: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
Create the workflow file to execute the Terraform script.


Step-by-Step Guide

Step 1: Find the AMI ID of your OS and architecture on AWS

To provision the desired OS and architecture of VM in AWS using Terraform, you need to find and get the AMI ID for your choice of OS and architecture. To do this, log in to AWS Console, go to EC2 under compute services, and select AMI catalog under images:





Step 2: Create a GitHub Repository

Go to GitHub and create a new repository for your Terraform project.

Example Refer my GitHub link: https://github.com/cjcheema/demo-terra-aws



Step 3: Write Your Terraform Script

Create a main.tf file in your repository with the Terraform configuration. Below is an example of a simple Terraform script to provision an EC2 instance in AWS:



terraform {

required_providers {

aws = {

source = “hashicorp/aws”

version = “5.57.0” # Use the latest provider version refer: https://registry.terraform.io/providers/hashicorp/aws/latest/docs

}

}

}



provider “aws” {

region = “ap-south-1”  # Provide your desire AWS region here

}



resource “aws_instance” “demo-linux” {

ami           = “ami-01376101673c89611”  # Replace with a valid AMI ID

instance_type = “t2.micro”  # Provide the desire AWS instance type



tags = {

Name = “cj-demo-linux” # Provide identical instance name here

}

}



Step 4: Set Up GitHub Actions with a Workflow File

Create a directory .github/workflows in your repository and inside it, create a file named terraform.yml.



Step 5: Store Your AWS Credentials in GitHub Secrets

Go to your GitHub repository’s settings, then to Secrets and variables under Security, and under Action add the following secrets under repository secretes:

– `AWS_ACCESS_KEY_ID`

– `AWS_SECRET_ACCESS_KEY`









Step 6: Create the Workflow File

Here is an example of a GitHub Actions workflow file terraform.yml to run Terraform:



name: Terraform



on:

push:

branches:

– main

pull_request:

branches:

– main



jobs:

terraform:

runs-on: ubuntu-latest



steps:

– name: Checkout code

uses: actions/checkout@v2



– name: Setup Terraform

uses: hashicorp/setup-terraform@v1



– name: Terraform Init

run: terraform init



– name: Terraform Plan

run: terraform plan

env:

AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}

AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}



– name: Terraform Apply

if: github.ref == ‘refs/heads/main’

run: terraform apply -auto-approve

env:

AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}

AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}



Explanation:

Checkout code: Uses the actions/checkout action to check out the code from your repository.
Setup Terraform: Uses the hashicorp/setup-terraform action to set up Terraform CLI in the workflow environment.
Terraform Init: Initializes the Terraform working directory.
Terraform Plan: Creates an execution plan for Terraform.
Terraform Apply: Applies the Terraform plan to provision the resources, only on the main branch.


Final Steps

Commit and push your changes to GitHub.
On every push or pull request to the main branch, GitHub Actions will trigger the workflow to run Terraform and provision the VM in AWS. You can see the workflow action under your GitHub repository’s Action:


By clicking on ongoing or completed action you can see detailed information of action which is either being performed or completed:





Once GitHub Action completes it action you can see the provisioned VM in AWS Cloud console:






Wrap up!

This setup ensures that your Terraform configuration is automatically applied whenever changes are pushed to the repository. Combining Terraform and GitHub Actions allows for efficient, automated provisioning of cloud infrastructure. Terraform’s declarative configuration and robust state management ensure consistent and repeatable deployments, while GitHub Actions automates the entire workflow from code changes to infrastructure deployment.

## note;
# Issues with terraform and M1 macbook
https://discuss.hashicorp.com/t/template-v2-2-0-does-not-have-a-package-available-mac-m1/35099/7