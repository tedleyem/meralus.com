---
layout: post
title:  "Cli Alias Dump"
date:   2017-10-04
excerpt: "a few shortcuts and aliases that I find helpful"
project: true
tags: [add, tags, here,]
img: "blog-headers/tux-swiss-army-knife.png"
comments: true
---

# BASH ALISES FOR DEV ENVIRONMENT
Here is a random assortment of some bash-aliases I use semi-frequently that I think other people might enjoy or find helpful.
This is a blunder of shortcuts I have created over the years and was inspired by this [reddit post](https://www.reddit.com/r/linuxquestions/comments/16tgbh9/what_are_your_favorite_aliases_to_use/). If you find this info useful let me know on [Twitter](https://twitter.com/techdadteddy)



##### USAGE
Edit your .bashrc file and make sure this if statement is added

```
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

Once done, if you already have a bash_aliases file you can create one
like this or copy the command below

```
$ touch ~/.bash_aliases

```

Next, you can copy everything below or click this [link](https://gist.github.com/tedleyem/262ea364aea8260f7d8fc1c2cfafe7a4) to grab a raw
copy of the aliases and add them to your .bash_aliases

# THE LIST

---
##### ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
##### aws-cli
alias gac='gimme-aws-creds'
##### apt pacakge manager
alias install='sudo apt install -y'
alias purge='sudo apt purge -y'
alias search='apt search'
alias update='sudo apt update'
alias upgrade='sudo apt-get upgrade -y'
alias list='dpkg -l'
##### alias shortcuts (all duplicates)
alias srcz='source ~/.bashrc'
alias update-alias='source ~/.bashrc'
alias update-bashrc='source ~/.bashrc'

##### gathering logs
alias logs='journalctl -f'
alias end-logs='journalctl -xe'
##### systemd services
alias start='systemctl start'
alias stop='systemctl stop'
alias status='systemctl status'
alias restart='systemctl restart'
##### some good stuff
alias campfire='aafire -driver curses'
alias check-moon='curl wttr.in/Moon'
alias moon='curl wttr.in/Moon'
alias check-weather='curl wttr.in'
alias weather='curl wttr.in'
alias crypto='curl rate.sx'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'
alias start-matrix='cmatrix'
alias tartar='tar -zxvf'
alias check-size='du -sh *'
alias dush='du -sh *'
alias sort-size='du -sh * | sort -h'
alias dusort='du -sh * | sort -h'
alias update-vim='vim +PluginInstall +qall'
##### python related shortcuts
alias p3='python3'
alias p3p='python3 -m pip'
alias p3pi='python3 -m pip install'
##### kubernetes shortcuts
alias k='kubectl'
alias mk='minikube'
##### Vagrant shortcuts
alias vg='vagrant'
alias vgu='vagrant up'
alias vgd='vagrant destroy'
alias vgp='vagrant up --provision'
##### Precommit shortcuts
alias precommit='pre-commit'
alias prcinit='precommit install && precommit autoupdate'

##### Terraform shortcuts
alias tf='terraform'
alias tfutils='tf-utils'
alias tfi='tf init'
alias tfp='tf plan'
alias tfa='tf apply'
alias tfd='tf destroy'
alias tfiu='tf init -upgrade'
alias tflogsd='export TF_LOG="DEBUG" '
alias tflogst='export TF_LOG="TRACE" '
alias tflogse='export TF_LOG="" '
alias rmtf='rm -rf .terraform && rm -rf .terraform.lock.hcl && echo "deleted .terraform directory and .terraform.lock.hcl"'
alias rmtfs='rm -rf terraform.tfstate && echo "deleted terraform state file"'

##### DOCKER ALIASES
alias dcps='sudo docker ps'
alias dci='sudo docker images'
alias dcvls='sudo docker volume ls'
alias dcnls='sudo docker network ls'
alias dck='docker rmi -f $(docker images -a -q)'
alias dcstop='sudo docker stop $(docker ps -a -q)'
alias dcom='docker-compose'
alias dcu='docker-compose up -d'
alias dcd='docker-compose down'
alias dcl='docker-compose logs'
alias dcb='docker-compose build'
alias dcub='docker-compose up --build'
alias dcvp='docker volume prune -f'
alias dcnp='docker network prune -f'
alias dcrmi='docker rmi -f $(docker images -a -q)'

---
##  MISC ALIAS FUNCTIONS
#####  remove spaces from files in current dir
```
clearspaces-file () {
  find . -name "* *" -type d | rename 's/ /_/g'
}
```
#####  remove spaces from directories in current dir
```
clearspaces-dir () {
  find . -name "* *" -type f | rename 's/ /_/g'
}
```


##### docker-container-clear akak docker-nuke function
```
dcc () {
  echo 'Stopping running containers (if available)...'
  docker stop $(docker ps -aq) && sleep 1
  echo 'Removing containers ..'
  docker rm $(docker ps -aq)  && sleep 1
  echo 'Removing images ...'
  docker rmi $(docker images -q)  && sleep 1
  echo 'Revoming docker container volumes (if any)'
  docker volume rm $(docker volume ls -q)  && sleep 1

}
```

##### GIT ALIASES
alias gco="git checkout $1"
alias ghauth='gh auth status'

##### update all git repo's in github dir
```
gpall () {
  cd ~/github/
  find . -mindepth 1 -maxdepth 1 -type d -print -exec git -C {} pull \;
  cd -
}

function gcm() {
  git checkout main
}
```
##### create new branch
```
gnb () {
  branchName=$1
  git checkout -b $branchName
  git push --set-upstream origin $branchName
}
```

##### delete branch
```
gdb () {
  branchName=$1
  git branch -d $branchName
  git push origin --delete $branchName
}
```

##### delete branch and return to master or main
```
gdbm () {
  local branches=$(git branch)
  local top=main
  local oldbranch=$(git rev-parse --abbrev-ref HEAD)
  if [[ $oldbranch == $top ]]; then
    echo "current branch is $top, exiting..."
    return
  fi
  git checkout $top
  git pull
  gdb $oldbranch
}
```

##### create pull request from current branch to target branch, default to master
```
gpr () {
  local currentbranch=$(git branch --show-current)
  local prstatus=$(gh pr status)
  local currentbranchstatus=$(echo $prstatus | rg -i "$currentbranch")
  if [[ $currentbranchstatus == *"Merged"* || $prstatus == *"There is no pull request associated with [$currentbranch]"* ]]; then
    echo "[ creating pull request... ]"
    gh pr create --base main --fill
    local prurl=$(getprurl $currentbranch)
    echo -n $prurl | xclip
    echo "copied to clipboard"
  else
    echo "[ pull request already exists ]"
    local prurl=$(getprurl $currentbranch)
    echo "pr url: $prurl"
    echo -n $prurl | xclip
    echo "copied to clipboard"
  fi
}
```

##### git add and commit
```
gcom () {
  local msg=${1}
  if [[ $msg == "" ]]; then
    echo "Missing commit message. Exiting..."
    return
  else
    echo "Running command: ${BLUE}git add . && git commit -m \"${YELLOW}$msg\""
    echo "[ ${BLUE}GIT ADD ]"
    git add .
    echo "[ GIT COMMIT ]"
    git commit -m "$msg"
    echo "[ GIT COMMIT STATUS ]"
    git status
  fi
}
 ```