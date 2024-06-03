---
layout: post
title:  "Testing terraform with Linode and saving money"
date:   2024-02-01
excerpt: "Run from the rain clouds"
img: "blog-headers/vr-movie.jpg"
project: true
---

# Use Terraform to Provision Infrastructure on Linode
When trying to learn new things I stick with the mantra that "knowledge, like air, should be free". So when I am learning a new technolgy or skill, like Terraform, its important to be able to test things locally or test things in an environment that wont leave me with a large bill at the end of the month. Time and time again  I talk to friends who are intimidated by AWS or Azure because of costs that they have never directly been affected by or the horror stories of the [$900 AWS bill](https://www.reddit.com/r/aws/comments/eq08s9/youve_heard_it_before_outrageous_bill_on_accident/) from testing lambda functions in AWS. I hear them and understand. What most people don't know is that you can use other cloud providers to test your cloud tools that your learning about. I have been a fan of Linode via podcast osmosis from the guys over at [Linux Unplugged](https://linuxunplugged.com/). They mention it so much that I decided to use them for testing out Terraform and spinning up Terraform resources. Linode had this great [blog post]{https://www.linode.com/docs/guides/how-to-build-your-infrastructure-using-terraform-and-linode/) with instructions on how to do that which I thought was cool. So for anyone reading this that may want to look at a cheaper option (testing in the cloud comes with a cost that I havent found a way to avoid yet), this may be a valid solution.



