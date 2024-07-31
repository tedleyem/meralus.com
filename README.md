## Ted's Time Capsule and Blog site

```
> Color theme
> gray color code  #25262a
> green color code #4dba87
```

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

 ### Adding Icons
Icons are powered by the free and open-source icon framework [Iconify](https://github.com/iconify), offering a selection of over 150,000 icons. Visit the [Iconify icon sets website](https://icon-sets.iconify.design/) to search for your preferred icon. Once you find your desired icon, copy its name and use it in the respective fields.

### Adding Social Media Links
Edit the [social.yml](_data/social.yml) file in the [_data](_data) folder to add your social media profiles, along with your preferred icons and colors.