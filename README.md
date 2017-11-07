# edge-angular-electron
A demonstrator project for using IPC to communicate between an Angular 2 application hosted in Electron and a WPF C# application using IPC and Edge.js 

## Libraries used

### C# to Node communication
Edge.js
http://tjanczuk.github.io/edge/

### Node (C# process) to Electron main process
Used to communicate using IPC between Node running in C# process and Electron main process
Node-IPC
https://www.npmjs.com/package/node-ipc

### Angular to Electron integration
NGX-Electron NPM package
Used to facilitate using Electron IPC api from Angular, to allow Electron Renderer and Main process communication using Angular
https://github.com/ThorstenHans/ngx-electron

## Getting started
Requires Node and Visual Studio installations
Install Electron and Angular CLI globally using NPM
Build the Electron and Angular apps using npm and ng build --base-href .
Use Visual Studio to build the WPF project. Note that the node_modules folder is copied to the output folder of the WPF app.
Run the WPF app, it will launch Electron