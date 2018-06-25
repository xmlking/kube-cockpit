Dockerize API
=============

Dockerize Cockpit API


### Build
```bash
# build app docker image
docker build --tag=cockpit-api -f .docker/cockpit-api/prod.dockerfile . 
```

### Run
```bash
docker run -it --env TYPEORM_HOST=localhost -p 3000:3000  cockpit-api
```

The app will be available at http://localhost:3000
```bash
# test
curl -v -X GET \
  http://localhost:3000/myapi/tenant \
| jq .
```

### SSH
```bash
# SSH to the running container (CONTAINER ID from `docker ps` command)
docker exec -it <CONTAINER ID> sh
# if you started via docker-compose
docker-compose exec api sh
```

### Deploy

#### Docker Push
```bash 
# login to hub.docker.com to push docker image
docker login  

# docker tag cockpit-api myRegistry.com/myImage:version`
docker tag cockpit-api xmlking/cockpit-api:0.1.0-SNAPSHOT
docker push xmlking/cockpit-api:0.1.0-SNAPSHOT
 
# also tag `latest` and push
docker tag xmlking/cockpit-api:0.1.0-SNAPSHOT  xmlking/cockpit-api:latest
docker push xmlking/cockpit-api:latest
```

#### OpenShift Push

```bash
# login to your openShift or k8s provider
oc login https://console.starter-us-west-1.openshift.com
oc project cockpit
cd .docker/cockpit-api
oc create -f cockpit-api.yml
oc create -f cockpit-api-svc.yml
```

> Update Env via web console if needed: 
```md
TYPEORM_HOST: mongodb
TYPEORM_DATABASE: cockpit
TYPEORM_USERNAME: mdbuser
TYPEORM_PASSWORD: 
```
> test
```bash
https://cockpit-api.7e14.starter-us-west-1.openshiftapps.com/myapi/projects
```


#### Redeploy to OpenShift
```bash
oc login https://console.starter-us-west-1.openshift.com
oc project cockpit

# Caution: delete fully (when you want to redeploy cleanly)
oc delete all,configmap,secret -l app=cockpit-api
# redeploy latest image
oc import-image cockpit-api:latest --all=false
```

###Maintenance
```bash
docker container prune
docker image prune
```

###k8s
kubectl get services
kubectl get pods
kubectl logs -f  cockpit-api-1-6derda


### Ref
* If you get 137 error
  * https://samwize.com/2016/05/19/docker-error-returned-a-non-zero-code-137/
  * https://docs.docker.com/docker-for-mac/#advanced
