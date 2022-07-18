import { Link } from 'react-router-dom';
import welcomeImage from '../../assets/images/welcome.jpg'
import './style.css'
const WelcomeScreen = () => {
  return (
    <div id='welcome-container'>
      <div style={{ padding: "0px 10px", height: "100%", width: "50%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ color: "#2a454e", fontSize: 38 }}>Welcome to Flexbench</h2>
        <p style={{ color: "#2a454e", fontSize: 28, textAlign: "center", width: "70%" }}>Start testing your server traffic load by creating your first project</p>
        <Link to="/welcome-project" style={{ width: "25%" }}><button style={{ cursor: "pointer", fontSize: 19, color: "#ffffff", backgroundColor: "#2a454e", border: "none", width: "100%", height: "45px", borderRadius: "5px" }}>Let's go</button></Link>
      </div>
      <div style={{ height: "100%", width: "50%", display: "flex", alignItems: "center" }}>
        <img id='welcome-img' src={welcomeImage} />
      </div>
    </div>
  );
}
export default WelcomeScreen;