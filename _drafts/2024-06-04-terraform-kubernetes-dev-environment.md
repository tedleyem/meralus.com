---
layout: post
title:  "Using Terraform/Open Tofu to spin up Minikube Locally"
date:   2024-06-04
excerpt: "container based app workloads"
img: "blog-headers/vr-movie.jpg"
project: true
---

https://dev.to/chefgs/deploy-kubernetes-resources-in-minikube-cluster-using-terraform-1p8o



Deploy Kubernetes Resources in Minikube cluster using Terraform

 

Introduction
Container based application workloads can be managed using Kubernetes(or k8s in short) and there are multiple methods available to create kubernetes clusters.
Cloud based k8s solutions like EKS, GKE and AKS can be used to deploy production grade clusters.

We can use minikube for Creating local k8s clusters for Simple POCs and learning purposes. For more details on minikube, refer docs

minikube quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows. We proudly focus on helping application developers and new Kubernetes users.

There are multiple ways to automate the cluster creation in minikube and Terraform automation can also be used for k8s automation in minikube

First things first
Install minikube using the steps mentioned in docs
Install Terraform CLI from the documentation
You can also refer my other blog to know more about setting up minikube in your workstation.

K8s Concepts used in this demo
namespace is a logical grouping of different k8s workloads, secrets, etc. For example: we can group dev environment and prod environment configuration in different namespaces.
deployment is a kubernetes config declaration, in which we can declare different workloads and related configuration for the workload. Also we can create deployment under a namespace to logically differentiate the set of resources needed.
kube config file is created when we install the minikube and it has the information needed for creating local k8s clusters. Kube config contains the different clusters and contexts. minikube will be one of the context, which refers to the minikube cluster in kube config file
context refers to a set of parameters that contains information of Kubernetes cluster, a user, and a namespace

Sample kube config for the minikube context and cluster info
```
apiVersion: v1
contexts:
- context:
    cluster: minikube
    extensions:
    - extension:
        last-update: Mon, 20 Jun 2022 08:51:10 IST
        provider: minikube.sigs.k8s.io
        version: v1.24.0
      name: context_info
    namespace: default
    user: minikube
  name: minikube
clusters:
- cluster:
    certificate-authority: $USERHOME_DIR/.minikube/ca.crt
    extensions:
    - extension:
        last-update: Mon, 20 Jun 2022 08:51:10 IST
        provider: minikube.sigs.k8s.io
        version: v1.24.0
      name: cluster_info
    server: https://192.168.49.2:8443
  name: minikube
```

### Steps to automate k8s deployment in minikube

### Step 1 Start minikube
Use the command minikube start to start the local k8s minikube cluster

```
$ minikube start
😄  minikube v1.24.0 on Ubuntu 21.04
    ▪ KUBECONFIG=$USERHOME/.kube/config
🎉  minikube 1.26.0 is available! Download it: https://github.com/kubernetes/minikube/releases/tag/v1.26.0
💡  To disable this notice, run: 'minikube config set WantUpdateNotification false'

✨  Using the docker driver based on existing profile
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
🔄  Restarting existing docker container for "minikube" ...
🐳  Preparing Kubernetes v1.22.3 on Docker 20.10.8 ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: default-storageclass, storage-provisioner

❗  /snap/bin/kubectl is version 1.24.2, which may have incompatibilites with Kubernetes 1.22.3.
    ▪ Want kubectl v1.22.3? Try 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

### Step 2 Create Terraform code
The terraform code used in this demo can be found here

In terraform, we can split the different terraform building blocks in various files, as part of best practice.

We have two files, as part of k8s minikube automation

### providers.tf
This file contains the details regarding the terraform hashicorp provider modules we will be using to automate in required_providers section
Also in the provider section, we need to declare the kube config file path and (minikube) context we will be using for our automation.
terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
      version = "2.11.0"
    }
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "minikube"
}

### k8s.tf
k8s.tf is the main file, in which we will be declaring our new namespace and deployment
Kubernetes provider module in Terraform supports the same kubernetes configuration declaration arguments and parameters like metadata, spec etc.
So if you're aware of creating kube config yaml, it will be easy for you to create terraform code using the config yaml experience. Otherwise, there will be a little bit learning curve is there, to create the kubernetes configuration

namespace will be defined as below,
```
resource "kubernetes_namespace" "example" {
  metadata {
    name = "k8s-ns-by-tf"
  }
}
```
* deployment will be defined as below, and it is getting created under the new namespace we are creating
```
resource "kubernetes_deployment" "example" {
  metadata {
    name = "terraform-example"
    labels = {
      test = "MyExampleApp"
    }
    namespace = "k8s-ns-by-tf"
  }
```

* In the deployment we are declaring a spec and it contains the replica definition and deployment template definition.
* In this automation example, we are creating deployment for nginx application
* Here's the sample config snippet showing the spec definition,
```
  spec {
    replicas = 2

    selector {
      match_labels = {
        test = "MyExampleApp"
      }
    }

    template {
      metadata {
        labels = {
          test = "MyExampleApp"
        }
      }

      spec {
        container {
          image = "nginx:1.21.6"
          name  = "example"

      .....
      .....
      .....
   }
```

* Refer the k8s.tf file in the repo to see the complete config


### Step 3 Run Terraform Code to Create Resources
* We will be running the terraform commands to spin up the k8s deployment in minikube

```
terraform init
```
```
$ terraform init

Initializing the backend...

Initializing provider plugins...
- Reusing previous version of hashicorp/kubernetes from the dependency lock file
- Using previously-installed hashicorp/kubernetes v2.11.0

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

* terraform plan

```
$ terraform plan

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # kubernetes_deployment.example will be created
  + resource "kubernetes_deployment" "example" {
      + id               = (known after apply)
      + wait_for_rollout = true

      + metadata {
          + generation       = (known after apply)
          + labels           = {
              + "test" = "MyExampleApp"
            }
          + name             = "terraform-example"
          + namespace        = "k8s-ns-by-tf"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }

      + spec {
      .....

      .....

      .....
      }
   }

  # kubernetes_namespace.example will be created
  + resource "kubernetes_namespace" "example" {
      + id = (known after apply)

      + metadata {
          + generation       = (known after apply)
          + name             = "k8s-ns-by-tf"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }
    }
```

* terraform apply

```
$ terraform apply

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # kubernetes_deployment.example will be created
  + resource "kubernetes_deployment" "example" {
}
  # kubernetes_namespace.example will be created
  + resource "kubernetes_namespace" "example" {
}

Plan: 2 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

kubernetes_namespace.example: Creating...
kubernetes_namespace.example: Creation complete after 0s [id=k8s-ns-by-tf]
kubernetes_deployment.example: Creating...
kubernetes_deployment.example: Creation complete after 3s [id=k8s-ns-by-tf/terraform-example]
```


## Step 4 Verify the Kubernetes Resources
* We need the kubectl command to verify the kubernetes resources. It can installed from here
* We can verify the kubernetes resources using the commands below,
* List namespace using - kubectl get ns

```
$ kubectl get ns k8s-ns-by-tf
NAME           STATUS   AGE
k8s-ns-by-tf   Active   3m52s
```

* View deployments using - kubectl get deployment -n k8s-ns-by-tf

```
$ kubectl get deployment -n k8s-ns-by-tf
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
terraform-example   2/2     2            2           4m14s
```

* Get the deployed pods using - kubectl get pods -n k8s-ns-by-tf
* Since we mentioned 2 replicas, we can see two pods deployed in the namespace

```
$ kubectl get pods -n k8s-ns-by-tf
NAME                                 READY   STATUS    RESTARTS   AGE
terraform-example-67ddfbc845-9dx4r   1/1     Running   0          9m4s
terraform-example-67ddfbc845-d68bw   1/1     Running   0          9m4s
```

### Clear up demo resources
* Once we are done with the demo, we can clear down the deployed resources using terraform destroy command,

```
$ terraform destroy
kubernetes_namespace.example: Refreshing state... [id=k8s-ns-by-tf]
kubernetes_deployment.example: Refreshing state... [id=k8s-ns-by-tf/terraform-example]

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  - destroy

Terraform will perform the following actions:
  # kubernetes_deployment.example will be destroyed
  - resource "kubernetes_deployment" "example" {
}
  # kubernetes_namespace.example will be destroyed
  - resource "kubernetes_namespace" "example" {
}

Plan: 0 to add, 0 to change, 2 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: yes

kubernetes_namespace.example: Destroying... [id=k8s-ns-by-tf]
kubernetes_deployment.example: Destroying... [id=k8s-ns-by-tf/terraform-example]
kubernetes_deployment.example: Destruction complete after 0s
kubernetes_namespace.example: Destruction complete after 6s

Destroy complete! Resources: 2 destroyed.
```

## Conclusion
In this blog, we gone through some basics k8s concepts and creating k8s resource automation in minikube

---
### References
[OpenTofu Kubernetes Backend](https://opentofu.org/docs/language/settings/backends/kubernetes/)
[Terraform Kubernetes Provider docs](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs)
[Terraform Kubernetes Deployment docs](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs/resources/deployment)
[Kubernetes Deployment Docs](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

