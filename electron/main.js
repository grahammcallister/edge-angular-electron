const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const nodeipc = require('node-ipc');

let win = null;

app.on('ready', function () {
    
    win = new BrowserWindow({width: 1000, height: 600});
    
    var openLoc = url.format({
        pathname: path.join(__dirname,'/angular-app/dist/index.html'),
        protocol:'file:'
        })

   
    win.loadURL(openLoc);
    
    win.webContents.openDevTools();

    win.on('closed', function () {
        win = null;
    });
});
    
app.on('activate',
    () => {
        if (win === null) {
            createWindow();
        }
    });
    
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

console.log('Node IPC: ' + nodeipc);
console.log('IPC Renderer: ' + ipcMain);
// Hook into Wpf messaging to forward and receive events to and from C#
nodeipc.connectTo('wpf-app', function(){ console.log('## connectTo wpf-app ' + JSON.stringify(nodeipc.options)); });

var onMessageFromWpf = function(event, data){
    console.log('## Electron main received message from WPF: ' + JSON.stringify(data));
    // Forward messages to Renderer
    ipcMain.emit('wpf-app', data);
};
nodeipc.of['wpf-app'].on('wpf-app', onMessageFromWpf);

// Hook into Electron messaging to forward and receive events to and from Renderer
var onMessageFromRenderer = function(event, data){
    console.log('## Electron main received message from Renderer: ' + JSON.stringify(data));
    // Forward messages to Edge IPC
    nodeipc.of['wpf-app'].emit('wpf-app', data);
};
ipcMain.addListener('wpf-app', onMessageFromRenderer);