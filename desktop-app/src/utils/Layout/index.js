import './style.css'
import icon from '../../assets/icons/win/icon.ico'
const { ipcRenderer } = window.require("electron");
const Layout = (props) => {
  const closeApp = () => {
    console.log("calling quit...")
    ipcRenderer.send("app:quit")
  }
  return (
    <div style={{height:"100vh",width:"100vw",overflow:"hidden"}} >
      <div id="app-header">
        <img style={{borderRadius:"3px",marginRight:"5px",height:"25px",width:"23px"}} src={icon}/>
        <h1 style={{ textAlign: 'center', fontFamily: "monospace", fontSize: 20,fontWeight:"500" }}>Flexbench</h1>
        <button id="closeBtn" onClick={closeApp} >X</button>
      </div>
      {props.children}
    </div>
  );
}
export default Layout;