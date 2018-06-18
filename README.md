Kubernetes Cockpit
==================
A Multi-tenant UI for kubernetes

### Goals

* Single sign-on, Single sign-out
* Account Management
  * Profile, Settings, Delegations
#### Tenant Dashboard
* List/Create/Update/Delete kubernetes resources
* Manage local [RBAC roles](https://github.com/kubernetes/dashboard/blob/master/docs/design/access-control.md)
* Metering and Billing
* Helm Charts Catalog
  * List, search charts
  * Install charts to the cluster
  * Add and manage chart repositories


#### Admin Dashboard
* Provision Namespaces
* User Provisioning with RBAC roles
* Manage cluster and namespace level RBAC roles

### Development
#### Run

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start:mock` for a mock server.

> expose local k8s API `kubectl proxy`
Run `npm run start -- --proxy-config proxy.conf.js` to start with proxy

#### Build

Run `npm run build:prod` to build the project. The build artifacts will be stored in the `dist/` directory.

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
