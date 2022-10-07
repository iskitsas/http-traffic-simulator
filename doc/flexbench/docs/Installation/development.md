---
sidebar_position: 2
---
# Development
This page is dedicated to development installation for
- Desktop app
- Server app

## Desktop app
### Prerequisites
- NodeJs
- npm / yarn

To start electron development server for desktop app follow the below steps:

- Clone [Flexbench](https://github.com/flexivian/flexbench) repo 
- After cloning the repo change directory
  ```
  cd desktop-app
  ``` 
- Install dependency
  ```
  install-dep
  ```
- Start development server 

  for linux / macOS
  ```
  npm run dev
  ```
  for windows 
  ```
  npm run w-dev
  ```

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
- start production server
  ```
  npm run dev
  ```
### Docker installation

:::info
This is the suggested method for single-node installation.
:::

- start production server in docker container
  for linux / macos
  ```
  npm run docker-dev
  ```
  for windows
  ```
  npm run docker-wdev
  ```
### Kubernetes installation
:::info
This is the suggested method of installation for scalability. It can handle practically any load using the horizontal scaling features offered by Kubernetes.
:::