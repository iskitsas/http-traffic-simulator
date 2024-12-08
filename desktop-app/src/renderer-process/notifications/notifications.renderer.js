module.exports = {
  emitNotification:(title,message)=>{
    global.ipcRenderer.send("notify",{title:title,message:message})
    return
  }
}