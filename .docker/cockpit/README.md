Dockerize SPA
=============

Dockerize Angular App (with Angular CLI)

### Build and publish custom nginx image for OpenShift (One time only)
```bash
docker build -t openshift-nginx -f .docker/nginx.dockerfile .
docker tag openshift-nginx xmlking/openshift-nginx:1.14-alpine
docker push xmlking/openshift-nginx

# also tag as `latest` and push
docker tag xmlking/openshift-nginx:1.14-alpine xmlking/openshift-nginx:latest
docker push xmlking/openshift-nginx:latest
```

### Build
```bash
# build app docker image
docker build --tag=cockpit -f .docker/cockpit/prod.dockerfile . 
```

### Run
```bash
docker run -it  -p 80:8080  cockpit
```

The app will be available at http://localhost:80

You can tweak the nginx config  ```nginx.conf``` for your specific needs.

### SSH
```bash
# SSH to the running container (CONTAINER ID from `docker ps` command)
docker exec -it <CONTAINER ID> sh
# if you started via docker-compose
docker-compose exec web sh
```

### Deploy

#### Docker Push

```bash
# login to hub.docker.com to push docker image
docker login 

# docker tag cockpit myRegistry.com/myImage`
docker tag cockpit xmlking/cockpit:0.1.0-SNAPSHOT
docker push xmlking/cockpit:0.1.0-SNAPSHOT

# also tag `latest` and push
docker tag xmlking/cockpit:0.1.0-SNAPSHOT  xmlking/cockpit:latest
docker push xmlking/cockpit:latest
```

#### OpenShift Push

```bash
# login to your openShift or k8s provider
oc login https://console.starter-us-west-1.openshift.com
oc project cockpit
cd .docker/cockpit

# create app (first time)
oc new-app -f cockpit.yml -p NAMESPACE=cockpit
```

#### Redeploy to OpenShift
```bash
# delete cockpit (if needed for clean full redeployment)
oc delete all,configmap,secret -l app=cockpit
# redeploy
oc import-image cockpit:latest --all=false
```

###Maintenance
```bash
docker container prune
docker image prune
```

### OpenShift Commands 
```bash
# see deployment config
$ oc get dc
# get deployment config
oc get -o yaml dc/keycloak-server >> docs/keycloak.yml
```


###Maintenance
```bash
docker container prune
docker image prune
```

###k8s
kubectl get services
kubectl get pods
kubectl logs -f  keycloak-server-6-grfmg


### Ref
* If you get 137 error
  * https://samwize.com/2016/05/19/docker-error-returned-a-non-zero-code-137/
  * https://docs.docker.com/docker-for-mac/#advanced
