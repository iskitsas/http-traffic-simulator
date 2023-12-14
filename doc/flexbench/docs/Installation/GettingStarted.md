---
sidebar_position: 1
---
# Getting Started
This page is an overview of the flexbench installation

Flexbench can be deployed with different options and configurations. 

## Installing standalone script

### npm installation

For using flexbench as a standalone script use npm to install flexbench node package 

```
npm i flexbench
```
or 
```
npm install flexbench
```

## Installing desktop app

It is offered in 2 ways to install desktop app


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

#### Production
- Build executable

  To build the executable files (unpacked) and installer run the command-
  ```
  npm run electron:build
  ```

The executables and installer can be found in the `/dist`

After installing the executables you can delete the `repo`

## Installing server app

### Plain installation 

- Clone [Flexbench](https://github.com/flexivian/flexbench) repo 
- After cloning the repo change directory
  ```
  cd server-app
  ``` 
- start development server
  ```
  npm run dev
  ```
### Docker installation

- Clone [Flexbench](https://github.com/flexivian/flexbench) repo 
- After cloning the repo change directory
  ```
  cd server-app
  ``` 
#### Development

- start docker container

  For windows
  ```
  npm run docker-wdev
  ```
  For linux / macos
  ```
  npm run docker-dev
  ```

#### Production
- start docker container

  For windows
  ```
  npm run docker-wprod
  ```
  For linux / macos
  ```
  npm run docker-prod
  ```

### Kubernates installation

- Change directory to microk8s

Apply the following commands

    microk8s.kubectl apply flexbench-secret.yml
    microk8s.kubectl apply flexbench-configmap.yml
    microk8s.kubectl apply flexbench.yml
