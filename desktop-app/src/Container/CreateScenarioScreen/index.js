import './style.css'
import welcomeImage from '../../assets/images/welcome-form.jpg'
import { Link } from 'react-router-dom'
import ScenarioConfiguration from './ScenarioConfiguration';
import RequestConfiguration from './RequestConfiguration';

const WelcomeScenarioScreen = () => {
  return (
    <div style={{width:"100%",height:"100%",display:"flex"}}>
      <div id='welcome-scenario-container'> 
        <p style={{margin:0,fontSize:"2.2vw",width:"85%",marginBottom:5}}>Create scenario under project1</p>
        <div id="welcome-scenario-form" style={{backgroundColor:"#d6d6d6",padding:5,height:"85%",width:"95%",borderRadius:5,marginBottom:30,overflowY:"auto"}}>
          <ScenarioConfiguration/>
          <RequestConfiguration/>
        </div>
      </div>
      <div style={{ height: "100%", width: "40%", display: "flex", alignItems: "center" }}>
        <img id='welcome-img' src={welcomeImage} />
      </div>
    </div>
  );
}
export default WelcomeScenarioScreen;