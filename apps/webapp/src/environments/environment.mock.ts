import sharedEnvironment from './base';

export const environment = {
  ...sharedEnvironment,
  production: true,
  envName: 'mock',

  API_BASE_URL: 'http://localhost:3000/api',
  K8S_API_BASE_URL: '/k8s',
  auth: {
    clientId: 'is360ui',
    // issuer: 'https://myroute-is360.a3c1.starter-us-west-1.openshiftapps.com/auth/realms/is360'
    issuer: 'https://keycloak-is360.7e14.starter-us-west-2.openshiftapps.com/auth/realms/is360'
  }
};
