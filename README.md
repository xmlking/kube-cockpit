Kubernetes Cockpit
==================
A Multi-tenant UI for kubernetes

### Goals
* Single sign-on, Single sign-out
* Account Management
  * Profile, Settings, Delegations 

#### Tenant Dashboard Goals
* List/Create/Update/Delete kubernetes resources
* Manage local [RBAC roles](https://github.com/kubernetes/dashboard/blob/master/docs/design/access-control.md)
* Metering and Billing
  * Usage Metrics / Reports
* Helm Charts [AppStore](https://hub.kubeapps.com/)
  * List, search charts
  * Install charts to the cluster
  * Add and manage chart repositories

#### Admin Dashboard Goals
* Provision Namespaces
* User Provisioning with RBAC roles
* Manage cluster and namespace level RBAC roles


### Development

#### Install

```bash
git clone https://github.com/xmlking/kube-cockpit 
cd kube-cockpit
npm install 
```

#### Run

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start:mock` for a mock server.

Expose k8s API on localhost with [kubectl proxy](https://kubernetes-v1-4.github.io/docs/user-guide/kubectl/kubectl_proxy/)
```bash
# switch appropriate context 
kctx docker-for-desktop
# run local proxy to your k8s API
kubectl proxy --api-prefix=/k8s
# test and make sure k8s proxy is working.
curl http://localhost:8001/k8s/api/v1/namespaces
curl http://localhost:8001/k8s/api/v1/namespaces/kube-system/pods
```
Run `npm run start -- --proxy-config proxy.conf.js` to start with proxy

#### Generate
> scaffolding angular artifacts <br/>
> For more details checkout [playbook](./PLAYBOOK.md)    

```bash
# check of nest installed
ng -v

# generate components for `Breadcrumbs` Module
ng g lib Breadcrumbs --prefix=ngx --tags=public-module --publishable=true
ng g component breadcrumbs --project=breadcrumbs --module=breadcrumbs --flat --dry-run
ng g service  breadcrumbs --project=breadcrumbs --module=breadcrumbs --dry-run
```

#### Build

Run `npm run build:prod` to build the project. The build artifacts will be stored in the `dist/` directory.

To serve built files and proxy k8s API together, run:
```bash
kubectl proxy --port=4200 --www=./dist/apps/webapp --www-prefix=/ --api-prefix=/k8s
```

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

#### Docs

Run `npm run doc:build` to build docs.
Run `npm run doc:serve` to serve docs.

#### Deploy

Run `npm run deploy:mock` to deploy demo app to gp-pages.

Analyzing bundle size `npm run bundle-report`


### Alternative Projects
1. Kubernetes Operational View
    * https://github.com/hjacobs/kube-ops-view  
2. **Kubit** - Angular Material Electron based client for Kubernetes
    * https://github.com/sandipchitale/kubit
3. **Kuill** - A multitenant UI for kubernetes
    * https://github.com/matt-deboer/kuill
4. **Kubernetes Custom Dashboard**
    * https://github.com/jdeskins/k8s-custom-dashboard
5. **Fabric8 UI**
    * https://github.com/fabric8-ui/fabric8-ui
6. **ElasticKube** - open source management platform for Kubernetes
    * https://github.com/ElasticBox/elastickube
7. **gangway**
    * https://github.com/heptiolabs/gangway
8. **Helm Catalog**
    * https://github.com/cnpst/zcp-catalog-ui
    * https://github.com/kubernetes-helm/monocular
    * https://github.com/kubeapps/hub https://hub.kubeapps.com/
9. **hsd-devops** - kubernetes dashboard with angular
    * https://github.com/getfirstcn/hsd-devops
10. **CI/CD pipeline** 
    * https://github.com/banzaicloud/pipeline
