const path = require('path');
const { Worker } = require('worker_threads');
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const isDev = require('electron-is-dev');
const icontype = process.platform === "darwin" ? "icon.icns" : "icon.png"

let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(__dirname, "../src/assets/icons/" + icontype),
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
      contextIsolation: false
    },
    fullscreenable: true,
  });
  win.maximize();
  win.removeMenu()
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  win.on("ready-to-show", win.show)
  globalShortcut.register('F11', () => {
    win.setFullScreen(!win.isFullScreen())
  })
  globalShortcut.register("shift+ctrl+r", () => {
    win.reload()
  })
  globalShortcut.register("F12", () => {
    if (isDev) {
      win.webContents.openDevTools();
    }
  })
  if (isDev) {
    win.webContents.openDevTools();
  }
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  // Create win, load the rest of the app, etc...
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
}

//renderer processlistner
ipcMain.on("run:simpleTest", (event, args) => {
  const worker = new Worker(path.join(__dirname, '../tests/simple-request.js'), {});
  worker.once("message", stats => {
    win.webContents.send('result', stats);
  });
})

//quit app
ipcMain.on("app:quit", (event, args) => {
  app.quit()
})

module.exports = { win }