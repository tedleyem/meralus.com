#!/bin/bash
# setup jekyll site locally 
# Install Ruby
brew install ruby-build #ruby-bundler ruby-dev
# Configure Bundler Install Path
bundle config set --local path 'vendor/bundle'
# Install bundle
bundle install
#Add Jekyll
bundle add jekyll
#Create A Jekyll Scaffold
#bundle exec jekyll new --force --skip-bundle .

#Spring up website on localhost
bundle exec jekyll serve --livereload