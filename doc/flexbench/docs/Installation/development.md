---
sidebar_position: 2
---
# Development
This page is dedicated to development installation for
- Desktop app
- Server app

## Desktop app
There are two ways to start development server of desktop app

### Plain installation

#### Development

- Clone [Flexbench](https://github.com/flexivian/flexbench) repo 
- After cloning the repo change directory
  ```
  cd desktop-app
  ``` 
- Install dependency 
  ```
  npm run install-dep
  ```

#### Development
- Start development server 

  for linux-mac 
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

- start development server
  ```
  npm run dev
  ```

### Docker installation

- start production server in docker container
  for linux / macos
  ```
  npm run docker-dev
  ```
  for windows
  ```
  npm run docker-wdev
  ```