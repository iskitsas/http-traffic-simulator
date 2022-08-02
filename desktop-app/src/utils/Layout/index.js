import './style.css'
import icon from '../../assets/icons/icon.png'
import { quitApp } from '../../renderer-process/Layout/Layout.renderer';
import { useEffect, useState } from 'react';
const Layout = (props) => {
  const [showBar,setShowBar] = useState(true)

  const closeApp = () => {
    quitApp();
  }

  // const handleKeyPress = (e) =>{
  //   if(e.code === "F11"){
  //     // setShowBar(!showBar)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyPress);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [handleKeyPress]);

  return (
    <div style={{height:"100vh",width:"100vw",overflow:"hidden"}} >
      <div id="app-header" style={{display: showBar?"flex":"none"}} >
        <img style={{borderRadius:"3px",marginRight:"5px",height:"25px",width:"23px"}} src={icon}/>
        <h1 style={{ textAlign: 'center', fontFamily: "monospace", fontSize: 20,fontWeight:"500" }}>Flexbench</h1>
        <button id="closeBtn" onClick={closeApp} >X</button>
      </div>
      {props.children}
    </div>
  );
}
export default Layout;