---
layout: post
title:  "Postgres Cheat Sheet"
date:   2021-12-07
excerpt: "Postgres Cheat Sheet"
img: "blog-headers/postgres.png"
comments: true
---

Here is a quick PostgresDB cheat sheet for navigating throught a Postgresql Database
I use it frequently and figured others might find it useful.

### Helpful Docs
* [PGDUMP](https://www.postgresql.org/docs/9.2/app-pgdump.html)
* [PG_DUMPALL](https://www.postgresql.org/docs/9.2/app-pg-dumpall.html)
* [CREATEDB](https://www.postgresql.org/docs/9.1/app-createdb.html)


## QUICK COMMANDS 

| Syntax | Description |
| ----------- | ----------- |
| \c <table-name> | Switch between databases |
| \dt | list tables|
| \dt+ | list tables|
| \dt *.* | List tables from all schemas |
| \dn | list table names and owners |
| createdb demo | create a database named demo |  

 
## BACKUP COMMANDS 
 
| Syntax | Description |
| ----------- | ----------- |
| pg_dumpall -h localhost -p 5432 -U postgres -v --globals-only > /path/to/your/file/db.sql | To only dump global options from all databases |
| pg_dumpall > /path/to/your/file/db.sql | To dump all databases to a file called db.sql |
| psql -f /path/to/your/file/db.sql postgres | To reload database(s) from a file named db.sql |
| pg_dumpall -h localhost -p 5432 -U postgres -v --roles-only -f "/path/to/your/file/db.sql" | Postgres 8.3 introduced the -f option to denote the file name and -r to only  backup roles which makes things a bit more predictable how they behave  from OS to OS. |
| pg_dumpall -h localhost -p 5432 -U postgres -v --globals-only -f "/path/to/your/file/db.sql" | If you want to backup all globals which includes tables spaces and user accounts |
| psql -h localhost -d postgres -U postgres -f "/path/to/useraccts.sql" | To restore the accounts on the new server, open up the useraccts.sql file  generated and delete all the accounts and stuff you don't want to bring  over |


## RESTORE  COMMANDS 
 
| Syntax | Description |
| ----------- | ----------- |
| psql -d demo -f /path/to/your/file/db.sql | Load db.sql into (freshly created) database named demo |
| psql -f /path/to/your/file/db.sql | Restore db.sql databases |
| $ pg_restore -d db_name /path/to/your/file/db.sql -c -U db_user | Restore from custom archive backup file named db.sql |

 
