const PROXY_CONFIG = {
  "/auth/realms": {
    "target": "https://myroute-is360.a3c1.starter-us-west-1.openshiftapps.com",
    "secure": false,
    "logLevel": "debug",
    // "changeOrigin": true,
  },
  "/get": {
    "target": "https://httpbin.org",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  },
  "/k8s": {
    "target": "http://localhost:8001",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  }
};

module.exports = PROXY_CONFIG;
