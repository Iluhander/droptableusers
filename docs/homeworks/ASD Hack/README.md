# Web-editor for reproducible pipelines
A micro-frontend application for editing experiments yaml files built by the "; drop table users; team.

## Development
The lib app distributes all the project dependencies. Please, run it before starting some another microfrontend.
```
npm i
npm run build
npm run serve
```

(will start on the port 3000)

## Deployment
Check the k8s directory for deployment.yaml and services.yaml files with the k8s configs.
Specify the following env varibles (with services urls, e.g. http://198.126.40.21:3000 may be the url for the main app)
  - MAIN_URL
  - LIB_APP_URL
  - WEB_EDITOR_URL
  - VISUALIZER_URL
