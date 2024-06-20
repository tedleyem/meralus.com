---
layout: post
title:  "A talk about terraform workspaces"
date:   2024-06-21
excerpt: "Managing IAC with terraform and multiple workspaces"
img: "blog-headers/terraform_office_space.png"
project: true
---

# MANAGING TERRAFORM ENVIORNMENTS WITH WORKSPACES
https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-using-workspaces-98680d89a03e

This is part 1 of the How to manage multiple environments with Terraform blog post series. In this post, I’ll show you how to manage multiple environments with Terraform using workspaces:

* Setting up environments using workspaces
* Switching between environments
* Using different configurations in each environment
* Using different backends in each environment
* Using different versions in each environment
* Working with multiple modules
* Advantages of workspaces
* Drawbacks of workspaces
* Conclusion

Note: Terraform Cloud and Terraform Enterprise also support a concept called workspaces, which is not the same as the CLI workspaces concept discussed in this post, but it’s similar, and has many of the same trade-offs.
Setting up environments using workspaces

Let’s say you have the following Terraform configuration:

provider "aws" {
  region = "us-east-2"
}resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "t2.micro"  tags = {
    Name = "example-server"
  }
}

This code deploys a single virtual server, called an EC2 instance, in AWS in the us-east-2 (Ohio) region and gives it the name tag example-server.

Now, imagine you want to deploy this server in three environments: dev, stage, prod. To do this using workspaces, you first create a workspace called dev using the terraform workspace new command:

$ terraform workspace new devCreated and switched to workspace "dev"!You're now on a new, empty workspace. Workspaces isolate their state, so if you run "terraform plan" Terraform will not see any existing state for this configuration.

And now you can deploy the server in dev using terraform apply:

$ terraform applyTerraform will perform the following actions:  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      + ami                          = "ami-0fb653ca2d3203ac1"
      + instance_type                = "t2.micro"
      (...)
    }Plan: 1 to add, 0 to change, 0 to destroy.Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.  Enter a value:

The plan output shows Terraform will deploy a new EC2 instance, which is exactly what you want, so you enter yes, and Terraform will deploy your server.

To deploy to staging, you create a new workspace called stage:

$ terraform workspace new stageCreated and switched to workspace "stage"!You're now on a new, empty workspace. Workspaces isolate their state, so if you run "terraform plan" Terraform will not see any existing state for this configuration.

And run apply again:

$ terraform applyTerraform will perform the following actions:  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      + ami                          = "ami-0fb653ca2d3203ac1"
      + instance_type                = "t2.micro"
      (...)
    }Plan: 1 to add, 0 to change, 0 to destroy.Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.  Enter a value:

Even though you just deployed an EC2 instance in dev, the plan output shows Terraform wants to deploy a totally new EC2 instance. That’s because you’re now in the stage workspace, so Terraform is using a separate state file, and knows nothing about the instance already deployed in dev. Enter yes and Terraform will deploy the new instance in stage.

Repeat this process one more time for the prod environment:

$ terraform workspace new prod
$ terraform apply

At this point, you have three environments (three workspaces), with one EC2 instance deployed in each one, and exactly one copy of your Terraform code to manage it all.
Switching between environments

To switch between environments, you need to switch between workspaces using CLI commands. You can see all your workspaces using the terraform workspace list command:

$ terraform workspace list
  default
  dev
  stage
* prod

You can switch to a different workspace using the terraform workspace select command:

$ terraform workspace select dev
Switched to workspace "dev".

Now, any command you run on this code (e.g., terraform apply) will run against the dev workspace.

Note that if you use workspaces to manage environments, navigating your environments and understanding what’s deployed is hard. That’s because you can’t see the environments in the code itself, but only from the terraform workspace CLI commands, which you have to run on one module at a time. So if you have your infrastructure defined across many small modules (see: large modules are considered harmful), and you’re using workspaces, it’s hard to answer questions like “What’s deployed in my dev environment?” and “What are the differences between dev and prod?”
Using different configurations in each environment

Within your Terraform code, you can look up the name of the current workspace using terraform.workspace. This allows you to configure your infrastructure differently in each environment:

resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = terraform.workspace == "prod"
                  ? "m4.large"
                  : "t2.micro"  tags = {
    Name = "example-server-${terraform.workspace}"
  }
}

This code configures the name tag to include the workspace name (so it’s example-server-dev in the dev environment, example-server-stage in the stage environment, etc.) and the instance type to use different server types in different environments, so that in production, you run a larger server (e.g., to handle more traffic), whereas in other environments, you run a smaller server (e.g., to save money).

Note that the preceding code uses ternary notation (CONDTION ? TRUEVAL : FALSEVAL) to pick an instance type, which works fine if there are two options to choose from, but gets messy for more than that: e.g., if you had 10 environments and 10 different instance types, the syntax for 10 if-else-if-else-if… statements becomes unusable. An alternative that scales to more than two options is to create a map, where the keys are the environment names and the values are the values to use in that environment, and to look up terraform.workspace in that map, as follows:

locals {
  instance_types = {
    dev   = "t2.micro"
    stage = "t2.small"
    prod  = "m4.large"
  }
}resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = local.instance_types[terraform.workspace]  tags = {
    Name = "example-server-${terraform.workspace}"
  }
}

Using different backends in each environment

It’s a good idea to keep each environment completely isolated: e.g., you’ll want to deploy dev into one AWS account, with one S3 bucket for a backend, and prod into a totally separate AWS account, with a totally separate S3 bucket as a backend. This reduces the risk from attacks (an attacker who manages to get access to your dev environment still won’t have any access to prod) and the risk from mistakes (if dev and prod are totally separate accounts, you’ll need to authenticate to them separately, so you’re less likely to accidentally make a change in prod which was actually intended for dev).

Unfortunately, Terraform workspaces only support using a single backend for all your workspaces. For example, to use S3 as a backend to store your Terraform state, you would add the following configuration to your Terraform code:

terraform {
  backend "s3" {
    bucket = "example-bucket"
    region = "us-east-2"
    key    = "example/terraform.tfstate"
  }
}

This code tells Terraform to store state in an S3 bucket called example-bucket. To use a different S3 bucket as your backend in production, you’d probably be tempted to do the following:

terraform {
  backend "s3" {
    // THIS CODE WILL NOT WORK!!!!
    bucket = (
      terraform.workspace == "prod"
      ? "prod-bucket"
      : "example-bucket"
    )
    // THIS CODE WILL NOT WORK!!!!    region = "us-east-2"
    key    = "example/terraform.tfstate"
  }
}

Unfortunately, the backend block does not allow you to use any variables, interpolation, or references, so the preceding code will not work. That means that, with workspaces, you can only have a single, hard-coded value for bucket, so all of your state for all of your environments ends up in the same bucket. This is one of the reasons that even HashiCorp’s own documentation does not recommend using Terraform workspaces for managing environments:

    Workspaces alone are not a suitable tool for system decomposition, because each subsystem should have its own separate configuration and backend, and will thus have its own distinct set of workspaces. In particular, organizations commonly want to create a strong separation between multiple deployments of the same infrastructure serving different development stages (e.g. staging vs. production) or different internal teams. In this case, the backend used for each deployment often belongs to that deployment, with different credentials and access controls. Named workspaces are not a suitable isolation mechanism for this scenario.

Using different versions in each environment

Imagine your company took the EC2 instance code above and turned it into a Terraform module called ec2-instance that captures all your internal requirements (security, compliance, scalability, etc.) for running a server. It’s a good idea to follow immutable infrastructure practices, where you create immutable, versioned artifacts of your code that you carefully promote from environment to environment. For example, you could release v1.0.0 of the ec2-instance module, and deploy it in each of your environments (dev, stage, prod) as follows:

module "server" {
  source = "github.com/org/repo//modules/ec2-instance?ref=v1.0.0"  # (... some params ...)
}

Now, imagine later on, you released v2.0.0 of the ec2-instance module. You would first deploy v2.0.0 in dev, and start testing. If all the tests pass, you’d then you’d promote v2.0.0 to stage and test there. If all the tests pass, you’d finally promote v2.0.0 to prod. But if you hit any issues while testing in dev or stage, those would have no effect on production, as it would still be running v1.0.0, and you’d be able to fix the issues, release v2.0.1, and carefully start the promotion process all over again.

Unfortunately, Terraform workspaces do not support running different versions of your code in different environments. That’s because Terraform does not allow you to use any variables, interpolation, or references in a source URL, so the following code, which attempts to keep production on v1.0.0, while using v2.0.0 in all other environments, will not work:

module "server" {
  // THIS CODE WILL NOT WORK!!!!
  source = (
    terraform.workspace == "prod"
    ? "github.com/org/repo//modules/ec2-instance?ref=v1.0.0"
    : "github.com/org/repo//modules/ec2-instance?ref=v2.0.0"
  )
  // THIS CODE WILL NOT WORK!!!!  # (... some params ...)
}

Terraform requires you to hard-code the source URL, so as soon as you change it, the change will affect all environments on their next apply. For example, if you updated the source URL to v2.0.0, as soon as you check that change in, if anyone happens to run apply in prod, they will accidentally deploy 2.0.0 to prod, perhaps before you’ve had a chance to test it in dev.

You’ll hit the same issue if you try to use different versions of different Terraform providers (in a required_providers block) or different versions of Terraform itself (via the required_version parameter): none of these support any sort of variables, interpolation, or references, so with workspaces, you’re stuck on a single version across all environments, with no easy way to update that version one environment at a time.
Working with multiple modules

Most of the time, you’ll be working not with just one module, but multiple small modules (again, see large modules are considered harmful): for example, you might have an ec2-instance module to deploy a server and a separate mysql module to deploy a MySQL database:

.
├── ec2-instance
│   ├── main.tf
│   ├── outputs.tf
│   └── variables.tf
└── mysql
    ├── main.tf
    ├── outputs.tf
    └── variables.tf

Each of these modules is deployed separately: that is, with separate calls to terraform apply and with separate state files. One question that comes up is, How do you share data between the two modules? For example, if the ec2-instance module needs the database address from the mysql module, and they are each deployed separately, how do you share that data?

When using workspaces, you primarily have to rely on the terraform_remote_state data source. For example, imagine the mysql module had the following output variable with the database address:

output "db_address" {
  value = aws_instance.db.endpoint
}

And let’s say the mysql module configured its backend as follows:

terraform {
  backend "s3" {
    bucket = "example-bucket"
    key    = "mysql/terraform.tfstate"
    region = "us-east-2"
  }
}

The ec2-instance module could use the terraform_remote_state data source to read the state file from this exact same location as follows:

data "terraform_remote_state" "mysql" {
  backend = "s3"
  config  = {
    bucket = "example-bucket"
    key    = "mysql/terraform.tfstate"
    region = "us-east-2"
  }
}

And then the ec2-instance module could extract the value of the database address output variable as follows:

data.terraform_remote_state.mysql.outputs.db_address

The drawback to using terraform_remote_state is that it couples your modules together: for example, the ec2-instance has to know exactly how the mysql module stores state. That makes the ec2-instance less flexible and harder to test.

Moreover, there’s no tooling to manage multiple modules: you have to deploy them all manually, one at a time, and manually ensure you do it in the right order. For example, you have to manually deploy the mysql module first, then manually deploy the ec2-instance module, and if you do it in the wrong order, you get a confusing error message from the terraform_remote_state data source.
Advantages of workspaces

    A native, built-in feature of Terraform, so no extra tooling is required.
    Works with Terraform Cloud and Terraform Enterprise.
    Exactly one copy of your code, so duplication is minimized.
    You can configure environments differently using terraform.workspace.

Drawbacks of workspaces

    Hard to navigate environments and understand what’s deployed where.
    One backend for all workspaces, so no isolation between environments.
    One version for all workspaces, so no immutable infrastructure.
    Can only share data between modules using terraform_remote_state, which makes the modules tightly coupled and hard to reuse and test.
    Working with multiple modules is manual and error-prone.

Conclusion

You’ve now seen how to manage multiple environments with Terraform by using workspaces. Let’s now move on to part 2 of the series, where you’ll learn how to manage multiple environments with Terraform using branches.



 # MANAGEMENT WORKSPACES WITH BRANCHES
 https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-using-branches-875d1a2ee647


 This is part 2 of the How to manage multiple environments with Terraform blog post series. In the first part of the series, you saw how to use workspaces to manage multiple environments with Terraform. In this post, I’ll show you how to manage multiple environments with Terraform using branches in your version control system (we’ll focus on Git in this blog post):

    Setting up environments using branches
    Switching between environments
    Using different configurations in each environment
    Using different backends in each environment
    Using different versions in each environment
    Working with multiple modules
    Advantages of branches
    Drawbacks of branches
    Conclusion

Setting up environments using branches

Let’s start with the same EC2 instance code as in the workspaces example in part 1 of this series:

provider "aws" {
  region = "us-east-2"
}resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "t2.micro"  tags = {
    Name = "example-server"
  }
}

To deploy this code in the dev environment, the first step is to create a dev branch:

$ git checkout -b devSwitched to a new branch 'dev'

Now you’re ready to deploy by running apply:

$ terraform applyTerraform will perform the following actions:  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      + ami                          = "ami-0fb653ca2d3203ac1"
      + instance_type                = "t2.micro"
      (...)
    }Plan: 1 to add, 0 to change, 0 to destroy.Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.  Enter a value:

If everything looks good, enter yes, and Terraform will deploy the server. Commit your changes to the dev branch:

$ git add .
$ git commit -m "Set up dev environment"
$ git push origin dev

OK, now it’s time to work on the staging environment. First, create a new branch:

$ git checkout -b stageSwitched to a new branch 'stage'

Run apply to deploy:

$ terraform apply

And then commit your changes to the stage branch:

$ git add .
$ git commit -m "Set up stage environment"
$ git push origin stage

Finally, repeat the entire process for production: use git checkout to create the prod branch, run apply, and then use git to add, commit, and push your changes to the prod branch.

At this point, you have three environments (three branches), with one EC2 instance deployed in each one. Unfortunately, those three branches mean you now have three full copies of your Terraform code that you have to manage: that’s effectively 100% code duplication for each environment you add, which can be a significant maintenance challenge.
Switching between environments

To switch between environments, you need to switch between branches using CLI commands. You can see all your branches using the git branch command:

$ git branch
  main
  dev
  stage
* prod

You can switch to a different branch using the git checkout command:

$ git checkout dev
Switched to branch 'dev'

Now, any command you run on this code (e.g., terraform apply) will run against the dev branch.

Note that with branches, it’s easier to see what’s deployed in each environment than with workspaces, as each environment is in its own branch. That said, browsing or making changes across multiple environments is still a bit tedious, as you have to repeatedly switch branches.
Using different configurations in each environment

When you use branches, there is no native mechanism built into Terraform to tell you what branch you’re on (there’s no terraform.workspace equivalent for branches). That means you have to use a workaround. There are a variety of options.

One option is to change the code in each branch. For example, in the dev branch, you might update the code to include -dev in the name tag:

resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "t2.micro"  tags = {
    Name = "example-server-dev"
  }
}

Whereas on the prod branch, you might update the code to include -prod in the name tag and change the instance_type to m4.large:

resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = "m4.large"  tags = {
    Name = "example-server-prod"
  }
}

This is an easy approach to use at first, but if your Terraform configurations are slightly different on every branch, then porting changes across those branches becomes much more difficult: e.g., if you refactored the aws_instance code in dev, doing the same refactoring in stage and prod without accidentally losing some of the custom changes in stage and prod will be tricky and error prone.

A better approach is to externalize the environment-specific changes to separate files. For example, you could add two input variables to your code:

variable "instance_type" {
  description = "The instance type to use"
  type        = string
}variable "instance_name" {
  description = "The name to use for the instance"
  type        = string
}

And update the code to use these variables:

resource "aws_instance" "example" {
  ami           = "ami-0fb653ca2d3203ac1"
  instance_type = var.instance_type  tags = {
    Name = var.instance_name
  }
}

Now you can add a variable definition file called terraform.tfvars with different values in each branch. For example, in dev, terraform.tfvars could contain the following:

instance_type = "t2.micro"
instance_name = "example-server-dev"

And in prod, terraform.tfvars could contain the following:

instance_type = "m4.large"
instance_name = "example-server-prod"

This gives you a way to configure the code differently in different environments, while keeping the underlying Terraform code (.tf files) mostly the same across branches.
Using different backends in each environment

To configure the backend differently in each environment, you can configure the backend block differently in each branch. For example, in the dev branch, you could configure the the S3 bucket dev-example-bucket as a backend as follows:

terraform {
  backend "s3" {
    bucket = "dev-example-bucket"
    key    = "mysql/terraform.tfstate"
    region = "us-east-2"
  }
}

And in the stage branch, you could configure the S3 bucket stage-example-bucket as a backend as follows:

terraform {
  backend "s3" {
    bucket = "stage-example-bucket"
    key    = "mysql/terraform.tfstate"
    region = "us-east-2"
  }
}

Typically, your best bet is to put the backend configuration in its own file — e.g., backend.tf—so that it’s externalized from the rest of your Terraform code (similar to how you externalized variable changes to a terraform.tfvars file), making it clearer which files should be different between branches and which ones should be the same.
Using different versions in each environment

As with the workspaces example in part 1 of this series, imagine your company took your EC2 instance code and put it into an ec2-instance module that you used as follows:

module "server" {
  source = "github.com/org/repo//modules/ec2-instance?ref=v1.0.0"  # (... some params ...)
}

If you wanted to use different versions of this module in different environments, since source URLs don’t support variables, interpolations, or references, the only option is to hard-code the source URL in each branch to a different value. For example, in dev, you could set the ref parameter to v2.0.0 to test out a new version:

module "server" {
  source = "github.com/org/repo//modules/ec2-instance?ref=v2.0.0"  # (... some params ...)
}

Whereas in prod, you’d keep it at v1.0.0 until the testing in dev was done:

module "server" {
  source = "github.com/org/repo//modules/ec2-instance?ref=v1.0.0"  # (... some params ...)
}

Although you could externalize variable changes (terraform.tfvars) and backend changes (backend.tf), there’s no way to externalize version changes to a separate file, as source URLs do not support any variables, interpolation, or references. The same is true if you wanted to use different versions of different Terraform providers (in a required_providers block) or different versions of Terraform itself (via the required_version parameter) in different environments: none of these support any sort of variables, interpolation, or references, so the only option is to change the Terraform code (.tf files) directly. This makes it tricky and error prone to port changes from one environment to another (from one branch to another).
Working with multiple modules

Working with multiple modules with branches is exactly the same as with workspaces: the options for sharing data between modules or deploying multiple modules concurrently are very limited. See Working with multiple modules in part 1 of this series for the details.
Advantages of branches

    A native, built-in feature of version control, so no extra tooling is required.
    Works with Terraform Cloud and Terraform Enterprise.
    Configure environments differently using terraform.tfvars files.
    Navigating environments and understanding what’s deployed is easier.
    Configure separate backends for each branch to isolate environments.
    Configure different versions in different environments.

Drawbacks of branches

    A huge amount of code duplication makes maintenance a nightmare.
    Propagating major changes across environments is tricky and error prone, especially if you don’t externalize differences between branches into separate files (note: version differences cannot be externalized) .
    Can only share data between modules using terraform_remote_state, which makes the modules tightly coupled and hard to test and reuse.
    Working with multiple modules is manual and error-prone.

Conclusion

You’ve now seen how to manage multiple environments with Terraform by using branches. Let’s now move on to part 3of the series, where you’ll learn how to manage multiple environments with Terraform using Terragrunt.
