Keyclock
========

Deploying Keyclock on OpenShift Origin
> check `keycloak.yml` for secrets

### Deploy
> first time deployment
```bash
# login with ms id
oc login https://console.starter-us-west-1.openshift.com
# create app
oc new-app -f keycloak.yml -p NAMESPACE=cockpit

# follow next steps if you want completely delete and deploy.
# delete only deploymentConfig
oc delete dc keycloak -n cockpit

# delete fully
oc delete all,configmap,secret -l app=keycloak
```


### Export 
> if you change keycloak config via UI, 
> you may want to export changes and check-in in Git for automated deployment next time.
```bash
# get keycloak pod name
oc get pods
# ssh to pod
oc rsh <pod-name>
# in the shell , run
/bin/sh /opt/jboss/keycloak/bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir  -Dkeycloak.migration.dir=/tmp/sumo
# copy files back to codebase
oc rsync <pod-name>:/tmp/sumo  /Developer/Work/SPA/kube-cockpit/.docker/keycloak
```
