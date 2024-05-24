Flexbench Server
======================

Server exposing REST apis for generating simulated HTTP traffic.
  
 >   This project is configured using `microk8s`. For any other upstream Kubernetes deployment the commands or the configurations may differ. So change it accordingly.

Quick steps to start
==============

- Install `microk8s` by following the instructions from the official docs.

- After installation check if its running in the background 

        microk8s status

- If its not running start the service by - 

        microk8s start

- Change the working directory to `/microk8s` then apply the following files in the sequence given below -

1. Initialize `secrets` and `configmap` 

        microk8s.kubectl apply flexbench-secret.yml 
        microk8s.kubectl apply flexbench-configmap.yml

2. Initialize `flexbench` deployment and services

        microk8s.kubectl apply flexbench.yml

The flexbench server will now start

To verify if the configurations are initialized properly use the commands-

- To check secrets

        microk8s.kubectl get secrets

- To check configmap

        microk8s.kubectl get configmaps

- To check deployment

        microk8s.kubectl get deployments

- To check the pods and get the ip address of the pod
        microk8s.kubectl get po

    This will give show external ip of the `flexbench` pod
    Use that ip address and port `4040` for simulating

> Refer `README.md` file of server-app folder for api endpoints and payload details
