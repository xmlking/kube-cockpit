import sharedEnvironment from './base';

export const environment = {
  ...sharedEnvironment,
  production: true,
  envName: 'prod',

  API_BASE_URL: 'http://localhost:3000/api',
  K8S_API_BASE_URL: '/k8s',
  auth: {
    clientId: 'is360ui',
    issuer: 'http://localhost:8080/auth/realms/is360'
  }
};
