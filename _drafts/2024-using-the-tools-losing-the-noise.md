---
layout: post
title:  "Use the tools, Lose the noise"
date:   2024-07-04
excerpt: "Choosing cloud provisioning platforms"
img: "blog-headers/tofu-terraform-decision-making.png"
project: true
---


Great news for the DevOps and Infrastructure as Code world – OpenTofu’s first stable release is here!

This OpenTofu tutorial includes:

What is OpenTofu?
Why OpenTofu matters in the DevOps ecosystem?
How to install OpenTofu
How to migrate from Terraform to OpenTofu
Basic OpenTofu components with examples
Key features of OpenTofu
Common problems and solutions
OpenTofu best practices
Advanced OpenTofu features
OpenTofu registry
Using OpenTofu with Spacelift

# What is OpenTofu?
OpenTofu is an open-source project that serves as a fork of the legacy MPL-licensed Terraform. It was developed as a response to a change in HashiCorp’s licensing of Terraform, from Mozilla Public License (MPL) to a Business Source License (BSL), which imposed limitations on the use of Terraform for commercial purposes. As an alternative, OpenTofu aims to offer a reliable, community-driven solution under the Linux Foundation.

# Why OpenTofu matters in the DevOps ecosystem?
OpenTofu ensures that one of the core and most popular IaC tool remains open-source. With this you not only get an open-source Terraform alternative, but this also ensures the fact that the later deployment of OpenTofu will take advantage of the community’s feedback.

In the DevOps world, OpenTofu’s significance is amplified by its capabilities of infrastructure management. It continues the legacy of Terraform by supporting infrastructure as code (IaC). This enables teams to automate and efficiently manage infrastructure deployment, crucial for enhancing operational scalability and reliability.

OpenTofu’s backward compatibility with Terraform’s infrastructure also means organizations deeply integrated with Terraform can transition without disrupting their existing workflows. This compatibility, coupled with the broad support from various organizations in the DevOps community, positions OpenTofu not just as a tool but as a potential standard in the evolving landscape of DevOps, supporting its principles of automation, collaboration, and continuous improvement.

# How to install OpenTofu
Let’s see different ways you can install OpenTofu.

# Ubuntu/Debian
To add the repositories, you will need to install some tooling, that should be mostly available on Debian systems:
```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
```
After this, you will need to ensure you have a copy of the OpenTofu GPG key.
```
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://get.opentofu.org/opentofu.gpg | sudo tee /etc/apt/keyrings/opentofu.gpg >/dev/null

curl -fsSL https://packages.opentofu.org/opentofu/tofu/gpgkey | sudo gpg --no-tty --batch --dearmor -o /etc/apt/keyrings/opentofu-repo.gpg >/dev/null

sudo chmod a+r /etc/apt/keyrings/opentofu.gpg
```
When you are done with this, create the OpenTofu source list:

```
echo \
  "deb [signed-by=/etc/apt/keyrings/opentofu.gpg,/etc/apt/keyrings/opentofu-repo.gpg] https://packages.opentofu.org/opentofu/tofu/any/ any main
deb-src [signed-by=/etc/apt/keyrings/opentofu.gpg,/etc/apt/keyrings/opentofu-repo.gpg] https://packages.opentofu.org/opentofu/tofu/any/ any main" | \
  sudo tee /etc/apt/sources.list.d/opentofu.list > /dev/null
```

Finally, you can actually install OpenTofu by running the following:

```
sudo apt-get update
sudo apt-get install -y tofu
```

# RHEL/Suse/Fedora
For rpm based systems, you will first need to create the repo:
Save the following to /etc/yum.repos.d/opentofu.repo
```
[opentofu]
name=opentofu
baseurl=https://packages.opentofu.org/opentofu/tofu/rpm_any/rpm_any/\$basearch
repo_gpgcheck=0
gpgcheck=1
enabled=1
gpgkey=https://get.opentofu.org/opentofu.gpg
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300

[opentofu-source]
name=opentofu-source
baseurl=https://packages.opentofu.org/opentofu/tofu/rpm_any/rpm_any/SRPMS
repo_gpgcheck=0
gpgcheck=1
enabled=1
gpgkey=https://get.opentofu.org/opentofu.gpg
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

After creating the repo, run the following commands:

# yum
sudo yum install -y tofu


# MacOS
The OpenTofu package is available in [Homebrew](https://opentofu.org/docs/intro/install/homebrew/) so you can install it by running the following command:
```
brew install opentofu
```

Manual Binary Install Script - Linux/MacOS

```
#!/bin/sh
set -e
TOFU_VERSION="1.6.0"
OS="$(uname | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m | sed -e 's/aarch64/arm64/' -e 's/x86_64/amd64/')"
TEMPDIR="$(mktemp -d)"
pushd "${TEMPDIR}" >/dev/null
wget "https://github.com/opentofu/opentofu/releases/download/v${TOFU_VERSION}/tofu_${TOFU_VERSION}_${OS}_${ARCH}.zip"
unzip "tofu_${TOFU_VERSION}_${OS}_${ARCH}.zip"
sudo mv tofu /usr/local/bin/tofu
popd >/dev/null
rm -rf "${TEMPDIR}"
echo "OpenTofu is now available at /usr/local/bin/tofu."
```

# How to migrate from Terraform to OpenTofu
Migrating from Terraform to OpenTofu. At the moment of writing, OpenTofu acts as a drop-in replace for Terraform.

What you need to do to perform the migration is simply install OpenTofu using one of the methods mentioned above that works for your operating system, and after that run:

tofu init -upgrade
This will ensure that you will use the OpenTofu registry for your OpenTofu providers.

After that, all of the Terraform commands that you love and use can be performed using the tofu binary.

Basic OpenTofu components with examples
As OpenTofu was created as a Terraform fork and has backward compatibility with Terraform versions up to 1.6, it has the same basic components.

Provider
OpenTofu providers are essentially plugins enabling OpenTofu to interact with various infrastructure resources. They serve as a bridge, translating OpenTofu configurations into corresponding API calls, thereby allowing OpenTofu to effectively manage a diverse range of resources in different environments. These providers come equipped with their own unique resources and data sources, which can be managed and set up through OpenTofu.

A common misconception about OpenTofu providers is that they are exclusive to cloud service providers like Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), or Oracle Cloud Infrastructure (OCI). However, this is not the case. OpenTofu providers extend beyond these cloud vendors to include others such as Template, Kubernetes, Helm, Spacelift, Artifactory, VSphere, and Aviatrix, among others.

Each provider is tailored with its specific resources and data sources. For instance, the AWS provider includes resources to handle EC2 instances, EBS volumes, and ELB load balancers, all manageable via OpenTofu.

Example Oracle Cloud Provider

provider "oci" {
  tenancy_ocid       = "tenancy_ocid"
  user_ocid            = "user_ocid"
  fingerprint            = "fingerprint"
  private_key_path = "private_key_path"
  region                  = "region"
}
Resource
Resources in OpenTofu refer to the infrastructure elements that OpenTofu can manage. This includes, but is not limited to, virtual machines, virtual networks, DNS entries, and pods. Each of these resources is defined by a specific type, such as “aws_instance,” “google_dns_record,” “kubernetes_pod,” or “oci_core_vcn.” Additionally, these resources come with a range of configurable properties like instance size or VCN CIDR.

OpenTofu facilitates creating, updating, and deleting these resources. It automatically manages the dependencies among them to ensure they are established in the appropriate sequence. Furthermore, if desired, you can introduce explicit dependencies between certain resources using the “depends_on” feature. This capability underscores OpenTofu’s flexibility and control in handling complex infrastructure setups.

Example resource

resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}
Datasource
A data source in OpenTofu is a configuration element designed to fetch data from an external source. This data can then be utilized as a parameter within resources during their provisioning. When we mention external sources, we are encompassing a variety of origins such as infrastructure set up manually, and resources established through other OpenTofu configurations, among others.

These data sources are specified within the providers relevant to OpenTofu and are referenced using a distinct block called data. The structure and documentation for a data source closely resemble those of a resource. Therefore, if you’re already proficient with resource configuration in OpenTofu, adapting to using data sources should be straightforward.

For example, consider a data source that retrieves information about an existing AWS VPC (Virtual Private Cloud). You can define this data source in OpenTofu to gather details such as the VPC’s ID or CIDR block, which can then be used to configure related AWS resources like subnets or security groups within your OpenTofu configuration. This allows for seamless integration and management of both existing and new infrastructure components.

Example Datasource

data "aws_vpc" "example" {
  id = "vpc-id"
}

resource "aws_subnet" "example" {
  vpc_id     = data.aws_vpc.example.id
  cidr_block = "10.0.1.0/24"
  …
}
Output
An output in OpenTofu is a feature that enables you to conveniently view the value of a specific data source, resource, local, or variable after OpenTofu has executed changes to the infrastructure. This output is defined in the OpenTofu configuration file and can be accessed using the opentofu output command, but only after an opentofu apply has been executed. Additionally, outputs can be employed to share various resources within a module.

Outputs don’t rely on any specific provider – they are a unique type of block that operates independently. The key parameters that an output supports include value, where you define what you want to display, and description (which is optional), where you explain the output’s purpose.

Example Output

output "vpc_id" {
  value       = aws_vpc.example.id
  description = "The VPC ID"
}
Variable
OpenTofu variables provide a way to parameterize configuration files, thereby enhancing their flexibility and reusability. These variables are declared in OpenTofu configurations and can be used to input diverse values without modifying the core configuration. For instance, a variable might be used to define the size of a virtual machine, the name of a resource, or the region in which a resource is deployed.

As in all programming languages, when we are defining a variable, we have to assign it a type, or in some cases, it automatically infers a type.

Supported variable types in OpenTofu:

Primitive
– String

– Number

– Bool

Complex
– List

– Set

– Map

– Object

Null – Represents absence
There is also the any type, which represents any type of resource, but its usage is not recommended as it will make your code harder to maintain.

Example variables

variable "cidr_block" {
  type        = string
  description = "The VPC CIDR block"
  default     = "10.0.0.0/16"
}

variable "vpc_details" {
  type        = map(string)
  description = "The VPC details"
  default     = {
    "name" = "vpc1"
    "cidr" = "10.0.0.0/16"
  }
}
Local
Local variables in OpenTofu are a convenient way of assigning a value to an expression. They are defined into a locals block, and are referenced by prefixing them with a “local”.

Expanding on this, locals in OpenTofu act as an intermediary layer in your configurations, helping to simplify and clarify expressions. They can be particularly useful for reducing repetition and making your code more readable and maintainable. This capability to define and manipulate a wide range of attributes and operations through locals is essential for crafting efficient and streamlined infrastructure code. It ensures that OpenTofu configurations remain not just functional but also organized and easy to understand, an important consideration in the evolving landscape of infrastructure management.

Example Local

locals {
  cidr_block = "10.0.0.0/16"
  name       = "vpc1"
}
Provisioners
OpenTofu provisioners are distinct from providers and serve a different purpose. They allow you to execute various commands or scripts either on your local machine or on a remote machine. Additionally, they enable the transfer of files from your local machine to a remote one. These provisioners are contained within a resource, meaning that to utilize one, you simply need to insert a provisioner block into the specific resource in your OpenTofu configuration.

Provisioners are generally viewed as a measure of last resort within OpenTofu, as they step outside the tool’s declarative model. This model typically focuses on defining the desired end-state of infrastructure, whereas provisioners perform imperative actions.

OpenTofu includes three main types of provisioners:

local-exec: Executes commands on the local machine.
file: Used for file transfers, typically in conjunction with a connection block for specifying details of the remote machine.
remote-exec: Executes commands on a remote machine, also usually used with a connection block for remote access details.
Example provisioner

resource "null_resource" "this" {
  provisioner "local-exec" {
    command = "echo Hello World!"
  }
}
Key Features of OpenTofu
OpenTofu is a valuable tool in the IaC world. It brings several features designed to offer flexibility, efficiency, and a community-driven approach to infrastructure management.

Open source and community-driven
One of the foundational aspects of OpenTofu is its open-source nature, ensuring it is freely available and easy to change. This fosters a community-driven development process, where contributions and improvements are sourced from a diverse group of users and organizations. Having OpenTofu under the Linux Foundation umbrella brings several benefits to the product’s well-being and ensures steady development.

Provider ecosystem
Similar to Terraform, OpenTofu works with a range of providers that extend its functionality to different technologies and services, including major cloud platforms, databases, and more.

Execution plans
Once the infrastructure is defined by the user, OpenTofu generates an execution plan. This plan outlines the actions that OpenTofu will undertake and seeks the user’s confirmation before proceeding with any modifications to the infrastructure. This critical step allows for a thorough review of the proposed changes, providing an opportunity to confirm or adjust them before OpenTofu executes any operations, such as creation, modification, or deletion of infrastructure components.

State management
OpenTofu keeps track of the state of managed infrastructure, ensuring that changes are applied incrementally and consistently. This state management is key to understanding current and past configurations and to planning future changes.

Modular design
Giving the ability to organize code as modules promotes reusability, and maintainability, making OpenTofu manage large scale and complex infrastructure easier.

💡 You might also like:

Why DevOps Engineers Recommend Spacelift
SaaS not an Option? Install Spacelift Self-Hosted on AWS
Common Infrastructure Challenges and How to Solve Them
Common problems and solutions
As with Terraform, you will face some common challenges with OpenTofu, too.

Problem Name	Problem Description	Solution
State file issues	OpenTofu state file, which tracks infrastructure state, can become out of sync or corrupted	Regularly back up your state file. Utilize OpenTofu’s state management commands for troubleshooting. Consider a remote state backend with state locking for team use
Complex dependency management	Managing complex dependencies in OpenTofu, especially implicit ones, can be challenging	Explicitly define dependencies with depends_on. Break down large configurations into smaller modules to manage dependencies more effectively
Version incompatibility	Incompatibilities can occur when using different versions of OpenTofu or provider versions	Standardize a specific version of OpenTofu across your team. Pin specific versions of providers to ensure consistency.
Configuration drift	The actual infrastructure state may drift from what’s defined in OpenTofu configurations	Frequently run tofu plan to detect drifts. Apply changes as needed and implement policies to restrict manual changes to infrastructure. Use OpenTofu with Spacelift and do advanced drift detection.
Multi-env management	Managing OpenTofu configurations across multiple environments (development, staging, production) can be complex	Use separate state files or OpenTofu workspaces for each environment. Parameterize configurations with variables for different environments. Use OpenTofu with Spacelift to facilitate your multi-env management by using different stacks and implementing stack dependencies.
OpenTofu best practices
Being the successor of Terraform, OpenTofu inherits many best practices from it, such as:

Limit manual changes – Once you use IaC, you should ensure that you limit manual changes, as these changes may incur costly drifts in the future
Modularize your code – Make your code DRY, ensure you can reuse it and maintain a clean an organized structure for your OpenTofu projects
Use remote state – Take advantage of remote state to enhance collaboration between your team members and ensure that there are no parallel operation happening on the same configuration
Use version control – This helps with ensuring that you use a vcs for the source of truth of your code and simplifies tracking changes, collaboration, and reverting to an older version if required
Use variables and outputs – Parametrize your configuration to promote reusability and flexibility. By also leveraging outputs, you can share information about your resources, and even export configurations from modules
Take advantage of loops and conditional – Loops and conditional ensure your code can encompass multiple use cases, and enhance reusability
Advanced OpenTofu features
Import block
With OpenTofu, importing existing resources is easier than ever. Starting from Terraform 1.5.0, the option of importing resources through an import block has become possible.

The import block requires two parameters: the ID of the resource to be imported and the HCL address for the new resource block. Here’s a simplified example for an Amazon VPC:

import {
  id = "vpc-abcd1234"  # Resource ID in the cloud
  to = aws_vpc.example # Resource address in OpenTofu configuration
}
After adding the import block, you can execute a plan for generating the code for the resource. This is done by using:

tofu plan -generate-config-out=generated_resources.tf
This generated code can be reviewed and adjusted if necessary, followed by a standard apply operation to complete the import into the state.

Loops/Conditionals
Loops and conditional statements are a crucial feature of OpenTofu. Without this capability, OpenTofu, wouldn’t be one of the best solutions on the market for IaC management.

There are essentially two types of loops you can use directly on a resource:

for_each
count
Both achieve the same behavior, but essentially, for_each is looping on a set or a map, and count creates the same resource multiple times, but using a number.

If you are using count on a variable list, you will face a potential problem: if the list has many elements and you decide, for whatever reason, do delete an element from the middle of the list, every other resource from the middle to the end will get recreated because it changes its index. This is something that can be easily avoided with for_each, as you won’t face any issues with indexes

Example for_each

locals {
  vpcs = {
    vpc1 = {
      cidr = "10.0.0.0/16"
    }
    vpc2 = {
      cidr = "11.0.0.0/16"
    }
  }
}

resource "aws_vpc" "this" {
  for_each   = local.vpcs
  cidr_block = each.value.cidr
}
Example count

resource "aws_vpc" "count_vpc" {
  count      = 3
  cidr_block = "10.0.0.0/16"
}
You can also use for loops when you are building different expressions and you also have the possibility of using if blocks inside of them:

locals {
  list_of_even_numbers = [for i in [1, 2, 3, 4, 5, 6] : i if i % 2 == 0]
}
In the above expression, we are cycling through a list of numbers using a for loop, and we are building a list with all of the even numbers by checking if the remainder of the division by two is equal to 0.

Ternary operators are also available in Terraform.

locals {
  enable_vpc = true
}

resource "aws_vpc" "this" {
  count      = local.enable_vpc ? 1 : 0
  cidr_block = "10.0.0.0/16"
}
In the above example, we are using a local boolean variable “enable_vpc” and based on it, we will conditionally create vpcs. We are checking if “enable_vpc” is equal to true, and if it is we will create 1 vpc, otherwise we won’t create any vpcs.

Sensitive/Nonsensitive
In OpenTofu, the concepts of sensitive and nonsensitive data are used to handle the exposure of potentially confidential or sensitive information in outputs or logs.

You have the option to either use the sensitive parameter on a variable or an output, and you even have two functions available that will mark your data as sensitive or nonsensitive.

variable "password" {
  description = "Log in password"
  type        = string
  sensitive   = true
}
The sensitive function takes any value and marks it as sensitive. OpenTofu then treats this value with confidentiality, ensuring it does not appear in logs or output. It is particularly useful when a sensitive value arises from within your module, such as data loaded from a file:

locals {
  sensitive_content = sensitive(file("${path.module}/sensitive.txt"))
}
The nonsensitive function takes a sensitive value and returns a copy of it with the sensitive marking removed. This is useful when you’ve derived a non-sensitive result from a sensitive value and wish to expose it in your output. However, caution is advised since using this function can expose sensitive values if not used appropriately:

output "sensitive_example_hash" {
  value = nonsensitive(sha256(var.sensitive_example))
}
Testing capabilities
The tofu test command in OpenTofu is designed to facilitate integration testing for your OpenTofu configurations.

How it works in a nutshell:

Create a testing suite –  Defining a test suite through reading *.tftest.hcl files. These files contain the test definitions
Reading Global Input Variables – It reads all global input variables applicable to the entire test suite
Execution Order – The test files are sorted alphabetically to establish an execution order
Executing Test File –  Each test file in the suite is executed sequentially. Within each test file:
– The run configurations are prepared and validated

– The tofu plan+apply or tofu apply operations are performed

– It checks for expected failures

– Assertion conditions are verified

– The suite status is updated after each run

# Summary and Cleanup –
After executing the tests, OpenTofu prints out summaries for each test file and for each run. It then attempts to destroy the resources provisioned by each run in reverse order, ensuring clean-up of the testing infrastructure.
Termination Status – The command exits with a status code 0 if all tests passed or 1 if any tests failed​
Read more on how to define tests here.

# OpenTofu registry
OpenTofu has its own registry for providers and modules. The provider registry protocol and the module registry protocol are systems used by OpenTofu to discover details and install providers and modules.

Providers are uniquely identified by addresses formatted as hostname/namespace/type. This protocol supports versioning, where each provider address is associated with multiple versions following Semantic Versioning conventions. Service discovery begins with the OpenTofu CLI querying a hostname to locate providers, which is essential for ensuring compatibility with specific OpenTofu versions and platforms. The protocol also outlines the necessary steps for listing available versions of a provider and retrieving provider packages, including download URLs and necessary metadata like checksums and signing keys, so make sure to check it out to view some usage examples.

Modules, on the other hand,  are identified by a specific address format (hostname/namespace/name/system), with each address containing multiple versions following Semantic Versioning. The protocol includes steps for listing available module versions and retrieving specific module versions for download as in the provider case. You will also need to check the documentation to view some usage examples. It also provides a service discovery mechanism, where the CLI uses a hostname to locate modules. This approach facilitates the management and distribution of modules in a structured and efficient manner.


Key points
OpenTofu’s first stable release is here. You can easily install it and the migration from Terraform in a pretty straightforward manner. With OpenTofu you get all the advantages that Terraform offers, and judging by the fact that it is open source and under the Linux Foundation umbrella, you get what Terraform never had – a community-first development approach.

Terraform and OpenTofu are on feature parity right now, but that will probably change in the near future, and you will have to choose the IaC tool to use.

If you want to take your OpenTofu workflow you can find all that [here](https://opentofu.org/). Or, if you plan on staying with Terraform, hashicorp has a plethora of tools to use. Either way, you should consider why the tool is being used and what its being used for. Understanding the purpose, not only of the tool at hand, but its place in your environment, will help weed out the noise.