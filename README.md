## Ted's Time Capsule and Blog site


### Inspired by
(Flexible-Jekyll is a simple and clean theme for Jekyll)[https://github.com/artemsheludko/flexible-jekyll)


### Deploying to github pages
The steps were followed to allow github actions to automatically update
this blog when you push to the main branch. No local actions are needed.

### For Testing the site locally
$ bundle exec jekyll serve

### Jekyll Blog Dev steps
 (Setting up Jekyll in a dev env)[https://jekyllrb.com/tutorials/using-jekyll-with-bundler/]


Install Ruby
```
$ apt install ruby ruby-bundler
```

Configure Bundler Install Path
```
$ bundle config set --local path 'vendor/bundle'
```

Add Jekyll
```
$ bundle add jekyll
```

Create A Jekyll Scaffold
```
$ bundle exec jekyll new --force --skip-bundle .
$ bundle install
```

Spring up website on localhost
```
$ bundle exec jekyll serve --livereload
```


### Resources
[Github Pages Deploment](https://github.com/actions/deploy-pages/tree/main)

Fork the ``template`` branch and follow the [Jekyll Installation Documentation](https://jekyllrb.com/docs/installation/).

## License

GNU General Public License v3.0

## Resources
 [Relative Links plugin](https://github.com/benbalter/jekyll-relative-links)
 