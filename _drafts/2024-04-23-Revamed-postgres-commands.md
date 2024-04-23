---
layout: post
title:  "Revamped Postgres commands"
date:   2024-04-23
excerpt: "postgres quick commands"
img: "blog-headers/postgresql-db-backup.jpg" 
project: true  
---

While testing a new application im build with python and postgres I tend to reference [the cheat.sh site](http://cheat.sh/postgresql) for a quick reminder 
of postgres commands. That works sometimes, but having them in a blog post allows me to retain the information in the event that site goes down or documentation on the internet disappears. So this is a brain dump of postgres commands. 

## Options for dumping data:

##### Binary mode
```
pg_dump -Fc -U $POSTGRES_USER $POSTGRES_DB > dump-`date '+%Y_%m_%d__%H_%M_%S'`.psql
```

##### SQL mode
```
pg_dump -U $POSTGRES_USER $POSTGRES_DB > dump-`date '+%Y_%m_%d__%H_%M_%S'`.sql
```

##### Docker and SQL mode
```
docker exec -it -u postgres <container_name> sh -c 'pg_dump -U $POSTGRES_USER $POSTGRES_DB' > dump-`date '+%Y_%m_%d__%H_%M_%S'`.sql
```

##### Kubernetes and SQL mode (vulnerable to networking failures)
```
kubectl -n <namespace> exec deploy/postgres -- sh -c 'pg_dump -U $POSTGRES_USER $POSTGRES_DB' > dump-`date '+%Y_%m_%d__%H_%M_%S'`.sql
```

## Options for restoring data:

##### Binary mode
```
pg_restore -O -U $POSTGRES_USER -c -x -n public -d $POSTGRES_DB public_dump.psql
```

##### SQL mode
```
psql -d $POSTGRES_DB -a -f /backups/dump.sql
```

If you’re using Docker, you can also place dump files on /docker-entrypoint-initdb.d and those will be imported on the first run. Accepted files types are *.sql, *.sql.gz, and *.sh.


## Other Basic shortcuts for navigating PostgreSQL
```
psql -U $POSTGRES_USER $POSTGRES_DB
\du  # list all users
\l # list databases
\c # select a database
\d # list tables
\d+ <table_name> # describe table
```


### PostgreSQL database administration

##### check connection to a database on host `localhost` and port `5432`
```
pg_isready -h localhost -p 5432
```

##### backup database named `anitya`, add CREATE statement
```
sudo -u postgres pg_dump -C anitya > anitya.dump
```

##### restore database
```
sudo -u postgres pqsql -f anitya.dump
```

##### create a database
```
sudo -u postgres psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE kaizen;"
```

##### delete a database
```
sudo -u postgres psql -h localhost -p 5432 -U postgres -c "DROP DATABASE kaizen;"
```

##### Run a postgres docker container with persistent volume
```code
docker pull postgres
mkdir -p ~/docker/volumes/postgres
docker run --rm  --name pg-docker -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
```

 
## BACKUP COMMAND TABLE
 
| Syntax | Description |
| ----------- | ----------- |
| pg_dumpall -h localhost -p 5432 -U postgres -v --globals-only > /path/to/your/file/db.sql | To only dump global options from all databases |
| pg_dumpall > /path/to/your/file/db.sql | To dump all databases to a file called db.sql |
| psql -f /path/to/your/file/db.sql postgres | To reload database(s) from a file named db.sql |
| pg_dumpall -h localhost -p 5432 -U postgres -v --roles-only -f "/path/to/your/file/db.sql" | Postgres 8.3 introduced the -f option to denote the file name and -r to only  backup roles which makes things a bit more predictable how they behave  from OS to OS. |
| pg_dumpall -h localhost -p 5432 -U postgres -v --globals-only -f "/path/to/your/file/db.sql" | If you want to backup all globals which includes tables spaces and user accounts |
| psql -h localhost -d postgres -U postgres -f "/path/to/useraccts.sql" | To restore the accounts on the new server, open up the useraccts.sql file  generated and delete all the accounts and stuff you don't want to bring  over |


## RESTORE COMMAND TABLE
 
| Syntax | Description |
| ----------- | ----------- |
| psql -d demo -f /path/to/your/file/db.sql | Load db.sql into (freshly created) database named demo |
| psql -f /path/to/your/file/db.sql | Restore db.sql databases |
| $ pg_restore -d db_name /path/to/your/file/db.sql -c -U db_user | Restore from custom archive backup file named db.sql |

