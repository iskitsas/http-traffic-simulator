const { Notification,ipcMain } = require("electron")

function notify(event,args) {
  new Notification({ title: args.title, body: args.message }).show()
}

ipcMain.on("notify", notify)
