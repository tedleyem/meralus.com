---
layout: post
title:  "Github Actionns Reactions"
date:   2024-10-06
excerpt: "Deploy React App using GitHub Actions"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

In this post, we will see to how to deploy react application using GitHub Actions to GitHub Pages

We will be deploying todolist, a react app we have create in an earlier post

# Step 1: Add homepage to package.json

"homepage": "https://<githubusername>.github.io/<app>"

For todolist, this would be

"homepage": "https://achukka.github.io/todolist"

# Step 2: Enable GitHub Pages

Create a branch to deploy from (ex: gh-pages)

    This helps use keep our source code separate from the static website

Set your source branch (Example: gh-pages) in Settings -> Pages section

GitHub Pages
# Step 3: Create SSH Deploy Key

Generate your deploy key

ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f "<your-deploy-branch>" -N ""

You should get two files 1) <deploy-branch>.pub (public key) and <deploy-branch> (private key)

# Step 4: Add Keys to GitHub

Add public key to Settings -> Deploy Keys section and Enable Write Access

Public Key ACTIONS_DEPLOY_KEY

Add private key as ACTIONS_DEPLOY_KEY to Settings -> Secret Keys.

# Step 5: Create workflow for deploy

Create a workflow similar to Build And Test workflow we created in the previous post

Add a step to deploy to gh-pages

- name: deploy to gh-pages
- uses: peaceiris/actions-gh-pages@v3
with:
    deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
    publish_dir: ./build

The above step, The GitHub Action peaceiris/actions-gh-pages uses deploy_key (which we created earlier) to publish files from publish_dir to github pages.

    Repo linked here

The complete yaml would look like below

name: Deploy React Application

# Controls when the action will run. 
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  build_test:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x] # We will deploy with only one version of node  

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: npm ci, build and test
        run: |
          npm ci
          npm run build --if-present
          npm test      
      - name: deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          publish_dir: ./build          

# Step 6: Commit your changes

    Commit your changes to a new branch
    Create a PR onto main branch

Please check this commit for cumulative changes.

If the GithHub Action run successfully ✔️

    You should see A commit to your deploy branch (Ex: `gh-pages)

gh-pages commit

    Your React app should be hosted on your homepage

Hosted App

Congratulations 👏. You have now setup a workflow to deploy your react application 👍.

    Merge your PR if everything looks good 😉

Thanks for reading through the entire article. Please reach out with questions, comments and/or feedback.