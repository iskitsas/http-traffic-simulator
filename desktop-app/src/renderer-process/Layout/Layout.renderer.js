module.exports={
  quitApp:()=>{
    global.ipcRenderer.send("app:quit")
  }
}