import './style.css'
import icon from '../../assets/icons/win/icon.ico'
import { quitApp } from '../../renderer-process/Layout/Layout.renderer';
const Layout = (props) => {
  const closeApp = () => {
    quitApp();
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