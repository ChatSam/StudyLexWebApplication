# A Cleanslate for developing our app

Hey, I tried to make a blank project (with some small samples) to get us started. 
I want to make sure we have a good foundation so we can kickstart our development. 

Included here:

1. node.js - server written in js
2. npm - node package manager
3. Angular - js client side framework
4. Angular UI router - client side routing
5. Express - node server framework
6. Lodash - js utility library (successor of underscore)

Thing's we still need to add:

- Webpack - bundling
- 


## 1. Node

Node is javascript runtime environment. The primary use of node is as a webserver, 
but you can use it for any kind of script (I have data transformation scripts that
I run for my [personal project](http://github.com/ryanechternacht/witches-data) 
that all run in node. 

server.js is the file that node runs to build the server. You can see that it 
imports some libraries, sets some stuff up, then listens on a port. The reference
to env.PORT is so that when deployed to Azure, it listens to whatever port Azure
wants.

## 2. NPM

npm is the primary package manager used by Node. It also has some additional 
features for task scripting. 

To install a package (e.g. lodash), you'd do the following

    npm install lodash --save

The save flag tells it to add this entry to your package.json file (more on that 
later). 

Sometimes, if you're installing a package that isn't specific to a project, but a 
more general utility (e.g. Azure-cli), you'll use

    npm install -g azure-cli

The g flag tells npm to install it globally (vs. in this package)

Additionally, npm has some simple scripting ability. Most projects (including this 
one), are kicked off with 

    npm start

To understand what controls this, you'll need to open up package.json. In here, you
can see which scripts are configured and which packages npm will try to install. 


config set strict-ssl false