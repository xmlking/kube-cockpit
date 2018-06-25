MongoDB
=======

deploying MongoDB on OpenShift Origin

> check `mongodb.yml` for secrets

* admin: cockpit321 database: admin
* mdbuser: cockpit123 database: cockpit

### Deploy
> first time deployment
> add storage 50GB  with name: mongo-data
```bash
# login with ms id
oc login https://console.starter-us-west-1.openshift.com
# create app
oc create -f mongodb.yml mongodb-svc.yml


# delete fully (when you want to redeploy cleanly)
oc delete all -l app=mongodb
```

### Release

> when you need new version of MongoDB, follow above Deployment process with new docker image in  `mongodb.yml`
```bash
```

### Use

#### Prerequisite 

1. mongo shell
```bash
brew update
# install mongodb locally, required to use mongo shell
brew install mongodb
```
2. install IntelliJ mongodb plugin
```bash
# port forward so that you can connect local dev tools to MongoDB
# get mongodb pod name with `oc get pods`
oc port-forward <pod-name> 27017:27017
```

3. with-in this project, configure mongo connetion with IntelliJ Mongo Plugin 
```
Path to Mongo Shell : /usr/local/bin/mongo
Label : cockpit-on-openshift
server url : localhost:27017
user database : cockpit
Authentication
  username: mdbuser
  password: cockpit123
  auth databse:  cockpit
  auth mechanisum: SCRAM-SHA-1

Then test connection
```

#### Commands
 
```bash
# get pod name
oc get pods -n cockpit
# ssh to pod
oc rsh  mongodb-1-zkgrw  
# or port forward
oc port-forward <pod-name> 27017:27017
# connect locally either with admin or mdbuser user
mongo -u "admin" -p "cockpit321" --authenticationDatabase "admin"
mongo -u "mdbuser" -p "cockpit123" --authenticationDatabase "cockpit"

# example commands 
use admin
show users
show roles
show dbs

use cockpit
show users
show roles
show dbs
show collections
```


### Ref:
* https://access.redhat.com/articles/1752723
* https://docs.openshift.org/latest/using_images/db_images/mongodb.html

