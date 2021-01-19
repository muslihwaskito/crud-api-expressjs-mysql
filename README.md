# CRUD API with nodejs in express and MySql
A restfull API with token-based authentication. CRUD operation using Node.js Express api on Mysql database locally.

## Initial Setup
``` bash
# initial dependencies
npm install
```
## initial requirment
if you haven't installed [db-migrate](https://www.npmjs.com/package/db-migrate) and [db-migrate-mysql](https://www.npmjs.com/package/db-migrate) globally, please install it first.

## Configure
Copy file `.env.example` to `.env`

Global variables such as server port or token secret or credential database can be set in `.env`

## Start the app
``` bash
# start the server
npm start
```

## Features
### Initial database migration
Before running the application, you can perform a database migration automatically with the command below:

``` bash
db-migrate up
```
### Restful API
An api with the following routes
* /
* /post
* /category
* /users

### Token authentication
An authentication system is included using the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library. 
* `/authentication` generates a token if valid `email` and `password` are provided via Post
* `/users, /post and /category` is protected by the token authentication system