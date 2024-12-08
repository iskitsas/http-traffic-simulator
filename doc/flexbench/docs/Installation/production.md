---
sidebar_position: 3
---
# Production
This page is dedicated to production installation for
- Desktop app
- Server app

## Desktop app
### Prerequisites
- NodeJs
- npm / yarn

To build production app follow the below steps:

- Clone [Flexbench](https://github.com/flexivian/flexbench) repo 
- After cloning the repo change directory
  ```
  cd desktop-app
  ``` 
- Install dependencies
  ```
  npm run install-dep
  ```
- Build the executable files (unpacked) and installer
  ```
  npm run electron:build
  ```

The executables and installer can be found in the `/dist`

After installing the executables you can delete the `repo`

## Server app
### Prerequisites
- NodeJs
- npm / yarn
- MongoDB
- Docker (only if using the docker to start server)
- docker-compose
:::info
Make sure MongoDB server is running in the background.
:::

There are three ways to start production server 

Below three steps are common for all
- Clone [Flexbench](https://github.com/flexivian/flexbench) repo 
- After cloning the repo change directory
  ```
  cd server-app
  ``` 
- Install dependencies
  ```
  npm i 
  ```
  or
  ```
  yarn install
  ```

### Plain installation

:::caution
This method is discouraged because it can cause a lot of issues with other packages and is deprived of all the advantages that a Docker installation would offer.
:::

- start production server
  ```
  npm run start
  ```
### Docker installation

:::info
This is the suggested method for single-node installation.
:::

- start production server in docker container
  for linux / macos
  ```
  npm run docker-prod
  ```
  for windows
  ```
  npm run docker-wprod
  ```
### Kubernetes installation

:::info
This is the suggested method of installation for scalability. It can handle practically any load using the horizontal scaling features offered by Kubernetes.
:::

- Change directory to microk8s

Apply the following commands

    microk8s.kubectl apply flexbench-secret.yml
    microk8s.kubectl apply flexbench-configmap.yml
    microk8s.kubectl apply flexbench.yml

> Install microk8s and make sure the microk8s service is running berfore using the above commands