---
layout: post
title:  "Deploy React App with Github Pages"
date:   2024-06-09
excerpt: "steps on using github pages to host react apps"
img: "blog-headers/react-gh-pages.png" 
project: true  
---

# GitHub Pages

    Note: this feature is available with react-scripts@0.2.0 and higher.

# Step 1: Add homepage to package.json

The step below is important!

If you skip it, your app will not deploy correctly.

Open your package.json and add a homepage field for your project:
```
  "homepage": "https://myusername.github.io/my-app",
```
or for a GitHub user page:
```
  "homepage": "https://myusername.github.io",
```
or for a custom domain page:
```
  "homepage": "https://mywebsite.com",
```
Create React App uses the homepage field to determine the root URL in the built HTML file.


# Step 2: Install gh-pages and add deploy to scripts in package.json

Now, whenever you run npm run build, you will see a cheat sheet with instructions on how to deploy to GitHub Pages.

To publish it at https://myusername.github.io/my-app, run:
```
npm install --save gh-pages
```
Alternatively you may use yarn:
```
yarn add gh-pages
```
Add the following scripts in your package.json:
```
  "scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
```
The predeploy script will run automatically before deploy is run.

If you are deploying to a GitHub user page instead of a project page you'll need to make one additional modification:

    Tweak your package.json scripts to push deployments to master:
```
  "scripts": {
    "predeploy": "npm run build",
-   "deploy": "gh-pages -d build",
+   "deploy": "gh-pages -b master -d build",
```
# Step 3: Deploy the site by running npm run deploy

Then run:
```
npm run deploy
```
# Step 4: For a project page, ensure your project’s settings use gh-pages
Finally, make sure GitHub Pages option in your GitHub project settings is set to use the gh-pages branch:

![gh-pages-branch](/assets/img/blog/deploy-react-gh-pages/gh-pages-branch.png)


# Step 5: Optionally, configure the domain

You can configure a custom domain with GitHub Pages by adding a CNAME file to the public/ folder.

Your CNAME file should look like this:

mywebsite.com

Notes on client-side routing

GitHub Pages doesn’t support routers that use the HTML5 pushState history API under the hood (for example, React Router using browserHistory). This is because when there is a fresh page load for a url like http://user.github.io/todomvc/todos/42, where /todos/42 is a frontend route, the GitHub Pages server returns 404 because it knows nothing of /todos/42. If you want to add a router to a project hosted on GitHub Pages, here are a couple of solutions:

    You could switch from using HTML5 history API to routing with hashes. If you use React Router, you can switch to hashHistory for this effect, but the URL will be longer and more verbose (for example, http://user.github.io/todomvc/#/todos/42?_k=yknaj). Read more about different history implementations in React Router.
    Alternatively, you can use a trick to teach GitHub Pages to handle 404s by redirecting to your index.html page with a custom redirect parameter. You would need to add a 404.html file with the redirection code to the build folder before deploying your project, and you’ll need to add code handling the redirect parameter to index.html. You can find a detailed explanation of this technique in this guide.


# Troubleshooting
"/dev/tty: No such a device or address"

If, when deploying, you get /dev/tty: No such a device or address or a similar error, try the following:

    Create a new Personal Access Token
    git remote set-url origin https://<user>:<token>@github.com/<user>/<repo> .
    Try npm run deploy again

"Cannot read property 'email' of null"

If, when deploying, you get Cannot read property 'email' of null, try the following:

    git config --global user.name '<your_name>'
    git config --global user.email '<your_email>'
    Try npm run deploy again


