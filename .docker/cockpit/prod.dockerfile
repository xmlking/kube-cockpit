### STAGE 1: Build ###

FROM node:10 as builder
#FROM node:10-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --project=webapp -c=production

### STAGE 2: Setup ###

FROM xmlking/openshift-nginx:1.14-alpine
LABEL maintainer="Sumanth <xmlking@gmail.com>"

## Remove default nginx website, make default.conf writable by OpenShift's user
RUN set -x \
	&& rm -rf /usr/share/nginx/html/* \
	&& chmod go+w /etc/nginx/conf.d/default.conf

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist/apps/webapp  /usr/share/nginx/html

EXPOSE 8080

#HEALTHCHECK --interval=5m --timeout=3s CMD curl --fail localhost:8080 -O /dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]

