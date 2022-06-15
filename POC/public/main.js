const { Worker } = require('worker_threads')
const path = require('path');
const url = require('url')
const { app, BrowserWindow, ipcMain } = require('electron');
// const runTest= require("../../example")
const isDev = require('electron-is-dev');
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );



  if (isDev) {
    win.webContents.openDevTools();
    // win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//renderer processlistner
ipcMain.on("run:simpleTest", (event, args) => {
  const worker = new Worker(path.join(__dirname, '../example/simple-request'), {});
  worker.once("message", stats => {
    win.webContents.send('result', stats);
  });
})
//quit app
ipcMain.on("app:quit", (event, args) => {
  console.log("closing...")
  app.quit()
})