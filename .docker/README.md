Dockerize
=========

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
docker build --tag=kube-cockpit -f .docker/prod.dockerfile . 
```

### Run
```bash
docker run -it --env AUTH_BASE_URL=http://keycloak:8080 -p 80:8080  kube-cockpit
```

The app will be available at http://localhost:80

You can tweak the nginx config  ```nginx.conf.tmpl``` for your specific needs.

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
# docker tag kube-cockpit myRegistry.com/myImage`
docker tag kube-cockpit xmlking/kube-cockpit:0.1.2-SNAPSHOT
docker push xmlking/kube-cockpit:0.1.2-SNAPSHOT

# also tag `latest` and push
docker tag xmlking/kube-cockpit:0.1.2-SNAPSHOT  xmlking/kube-cockpit:latest
docker push xmlking/kube-cockpit:latest
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
