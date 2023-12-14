import './style.css'
import welcomeImage from "../../../assets/images/welcome.png"
const WelcomeMessage = ({ onNext }) => {
  return (
    <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "row", backgroundColor: "#282828" }}>
      <div style={{ padding: "0px 10px", height: "100%", width: "50%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ color: "#05ccb1", fontSize: 38 }}>Welcome to Flexbench</h2>
        <p style={{ color: "#05ccb1", fontSize: 28, textAlign: "center", width: "70%" }}>Start testing your server traffic load by creating your first project</p>
        <button onClick={onNext} style={{ cursor: "pointer", fontSize: 19, color: "#ffffff", backgroundColor: "#2a454e", border: "none", width: "25%", height: "45px", borderRadius: "5px" }}>Let's go</button>
      </div>
      <div id='welcome-message-right' style={{ }}>
        <img id='welcome-img' src={welcomeImage} />
      </div>
    </div>
  );
}
export default WelcomeMessage;