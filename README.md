This project is an application skeleton for a typical [Node.js](https://nodejs.org/) web app.

[![Build Status](https://travis-ci.org/FortechRomania/node-starter.svg?branch=master)](https://travis-ci.org/FortechRomania/node-starter)

## Getting Started
To get you started you can simply clone the node-seed repository and install the dependencies:

### Prerequisites
You need git to clone the node-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

A number of node.js tools is necessary to initialize and test node-seed. You must have node.js and its package manager (npm) installed. You can get them from  [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express, mongodb and mongoose.

#### MongoDB
The project uses MongoDB as a database. If you are on Mac and using Homebrew package manager the installation is as simple as `brew install mongodb`.

#### Apidoc
To install run `npm install apidoc -g`.


### Clone node-seed
Clone the node-seed repository using [git][git]:

    git clone "path from git"

### Install node-seed project dependencies

    npm install

### Start the MongoDB server
First we need to create the `db` directory where the database files will live in. In your terminal navigate to the `root` of your system by doing `cd ..` until you reach the top directory. You can create the directory by running `sudo mkdir -p /data/db`. Now open a different tab in your terminal and run `mongod` to start the Mongo server.

### Run the Application

The project is preconfigured with a simple development web server. The simplest way to start this server is:

    npm start

### Generate API documentation

    npm run doc

The command will generate a /doc folder that will contain an index.html file. Open it in any browser. The file contains information about API routes.

### Project Structure

The project contains two main folders.
The first is called /app and has the following subfolders:

 * config - folder that contains: express and mongoose setup, API routes and configurations for development and production environments.
 * controllers - folder that will contain all controllers involved in the app
 * models - folder with the models considered
 * middlewares - folder with functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle
 * utilities - folder with functions that can be used in app to avoid repetitive code

The second folder is called /doc and contains API route documentation generated with apidoc ( see above how to re-generate the index.html )
