# TMA-Dashboard
 
This is a decision support tool, more precisely a dashboard developed as a web page, which allows to:
-   Create and visualize TMA’s metrics, quality models and configuration profiles;
-   Plot probed data from monitored systems;
-   Plot calculated metric values by Analyze for monitored systems (and optionally the ids of applied plans alongside);
-   Export charts as images;
-   Export charts configurations;
-   Manage charts in a homepage;
-   Simulate metrics values;
-   Manage adaptation rules;

# Index

 -   [Installation](#Installation)
 -   [Properties](#API-communication-setup)
 -   [Implementation Details](#Implementation-Details)

# Installation

To build the container image hosting the webpage server, you should run the following command on the Worker node:

```
sh build.sh
```

To deploy the image built in the previous step as a pod in the kubernetes cluster, you should run the following command on the master node:

```
kubectl create -f tma-dashboard-deployment.yaml
```

With TMA Admin correctly deployed and running, it is accessible through the IP of Kubernetes Master machine in port 32026. 

# API communication setup

The IP address and port of TMA's API, where requests from this tool will be sent to, are configured in [Configurations.js file](tma-dashboard/src/configurations/Configurations.js), under the following directory:

```
...\tma-dashboard\src\configurations\
```

##Implementation Details

This webpage was created in the form of a SPA (Single Page Application) using React, and Semantic UI for styling. Its functioning is based on performing requests to TMA's API (URL_API_TMA) whenever it needs data. Additionally, requests related to adaptation rules are redirected to and from TMA's Planning API (URL_PLANNING). Whenever requests sent from the webpage involve timestamps, they are converted to UTC before arriving at the API.

## Authors
* João Ribeiro