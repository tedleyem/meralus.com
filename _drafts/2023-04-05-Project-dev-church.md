---
layout: post
title:  "Project: Containerize Wordpress with Docker Compose" 
date:   2023-04-05
excerpt: "2023 project list"
img: "blog-headers/wordpress_on_docker.jpg" 
project: true  
---

#### Wordpress portability 
WordPress in 2023 is still one of the most popular Content Management Systems (CMS's) out there. There are statistics that state WordPress runs over 30 percent of all websites in the web. Wordpress is popular, powerful, and at times, cumbersome. Deploying and setting up an instances can be time consuming wiht our without technical knowledge and experience. Recently I was introduced to an issue that an organization was having. My church had a wordpress site running under two instances on three different servers. All three servers were running on Red Hat 6 servers, which means they no longer have support. The goal was to upgrade to Ubuntu or Debian based servers to avoid new RHEL licenses and costs. A few things were needed for this migration to happen, so I figured I would share the pain points discussed, and share a solution that could work for this issue. 

###### Problems: 
* migrate the wordpress data off the old servers onto new ubuntu servers 
* make the site portable enough to move again in case a future migration is needed
* Isolate the wordpress application and the database to meet security standards 
* Confirm that functionality of the site remains the same. User account access, payment processing, and accessibility. 
* Make the site Scalable, allow more that 2 instances to be running to help offload site performance and load management. 


This is a simple docker-compose file to run Wordpress, MySQL, and phpMyAdmin services for development needs. I will write up another blog on multiple deployment methods to convert the wordpress installation to cloud environments, but for now this is a docker-compose focused blog on Deploying wordpress as a docker container and the benefits. 

### Benefits of Wordpress in Docker 

* Instant application deployment – you can create a separate container for every process and deploy an app within seconds. You can both create and destroy containers in an instant. Modularity – you can “extract” any part of the application for an update or repair without having to take down the whole app.

* Instant application deployment – you can create a separate container for every process and deploy an app within seconds. You can both create and destroy containers in an instant.

* Modularity – you can “extract” any part of the application for an update or repair without having to take down the whole app. Docker allows you to break your app down into separate microservices, each containing its own function. These services are independent and can be easily isolated from each other.

* Portability – you can pack the app and its dependencies into a single container and transfer it to another machine(s) with different hardware and OS setup without having to worry about compatibility issues.

* Layering and image version control – Docker images are made of layers; a new layer is created whenever the image changes. The layers can be reused to produce new containers, significantly speeding up the process. Furthermore, all layer iterations are reflected in the built-in container changelog. This gives you complete control over Docker images and allows you to roll back any selected changes.

* Sharing – you can simply share your containers with other developers using a remote repository.

### Getting Started 
Running WordPress in Docker requires two separate containers: a web container, running Apache and PHP, and a database container, hosting MySQL. You must also set up Docker volumes for the WordPress data directories. These store your configuration files and uploaded media so they persist across container restarts.

Make sure you’ve got Docker and Docker Compose installed before you continue. Although you can use the Docker CLI on its own, Compose makes it easier to define the two services, their dependencies, and your volumes. You’ll be able to bring up the entire stack with a single command.

##### Base Images 

    wordpress:lates – WordPress 5.7 with the latest PHP.
    phpmyadmin:latest – PHP 7.4 with the latest WordPress.
    mysql:5.7 – WordPress 5.7 with PHP 5.4.

##### Breaking down the Stack 

Shhh keep the secrets 
> .env 
 The .env file is a good way to isolate specific parameters of the deployment. 
 Database passwords, usernames, and other repeatable parameters that need to be used in multiple containers can be found in the .env file. 

 The docker-compose.yml file looks like this. Let me explain each block.

```
version: '3'
services:
  wp:
    image: wordpress:latest 
    container_name: wp
    ports:
      - 80:80 
    volumes:
      - ./config/php.conf.ini:/usr/local/etc/php/conf.d/conf.ini
      - ./wp-app:/var/www/html # Full wordpress project 
      #- wp-app:/var/www/html 
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_NAME: "${DATABASE_NAME}"
      WORDPRESS_DB_USER: "${DB_USER}"
      WORDPRESS_DB_PASSWORD: "${DB_PASSWORD}"
    depends_on:
      - db
    links:
      - db 
  
  pma:
  # https://docs.phpmyadmin.net/en/latest/setup.html
    image: phpmyadmin:latest
    container_name: pma
    environment:
      PMA_HOST: db 
      MYSQL_ROOT_PASSWORD: "${DB_PASSWORD}"
    ports:
      - 8090:80
    links:
      - db
    depends_on:
      - db 

  db:
    image: mysql:5.7
    container_name: db
    ports:
      - 3306:3306
      - 33060:33060
    command: [
        '--default_authentication_plugin=mysql_native_password',
        '--character-set-server=utf8mb4',
        '--collation-server=utf8mb4_unicode_ci'
    ]
    volumes:
      - ./wp-data:/docker-entrypoint-initdb.d
      - db_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: "${DB_ROOT_PASSWORD}"
      MYSQL_DATABASE: "${DATABASE_NAME}"
      MYSQL_USER: "${DB_USER}"
      MYSQL_PASSWORD: "${DB_PASSWORD}"  
      
volumes:
  db_data:
  #wp_app:

```


https://www.howtogeek.com/devops/how-to-quickly-deploy-wordpress-as-a-docker-container/

https://www.cloudsigma.com/how-to-deploy-wordpress-with-docker-containers-on-ubuntu-20-04/