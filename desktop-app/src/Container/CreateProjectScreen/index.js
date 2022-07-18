import './style.css'
import welcomeImage from '../../assets/images/welcome-form.jpg'
import {Link} from 'react-router-dom'
const WelcomeProjectScreen = () => {
  return (
    <div style={{ width: "100%", height: "100%",display:"flex" }}>
      <div style={{ height: "100%", width: "50%", display: "flex",justifyContent:"center",flexDirection:"column", alignItems: "center" }} >
        <p style={{ color: "#000000",width:"75%",fontSize:35}}>Create project</p>
        <div id='welcome-create-project'>
          <textarea style={{fontSize:20,resize:"none", border:"none",width:"90%",height:"20%",borderRadius:5,padding:5,outline:"none"}} placeholder="Project name" />
          <textarea style={{fontSize:20,resize:"none",border:"none",width:"90%",height:"45%",borderRadius:5,padding:5,outline:"none"}} placeholder="Project description..." />
          <Link to="/welcome-project-scenario" style={{width:"25%"}}><button id='create-project-btn'>Create</button></Link>
        </div>
      </div>
      <div style={{ height: "100%", width: "50%", display: "flex", alignItems: "center" }}>
        <img id='welcome-img' src={welcomeImage} />
      </div>
    </div>
  );
}
export default WelcomeProjectScreen;