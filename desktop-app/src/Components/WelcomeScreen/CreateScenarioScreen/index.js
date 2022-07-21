import './style.css'
import welcomeImage from '../../../assets/images/welcome-form.png'
import { useNavigate } from 'react-router-dom'
import ScenarioConfiguration from './ScenarioConfiguration';
import RequestConfiguration from './RequestConfiguration';
import { useState } from 'react';
import { addRequest } from '../../../renderer-process/Request/request.renderer';
import { addScenario } from '../../../renderer-process/Scenario/scenario.renderer';
const WelcomeScenarioScreen = ({ onBack, onNext, project }) => {
  const navigate = useNavigate();
  const [scenarioConfig, setScenario] = useState({});
  const [requestsConfig, setRequests] = useState([]);

  const createScenario = (e) => {
    e.preventDefault();
    const projectId = project._id;
    addScenario(scenarioConfig, projectId).then(savedScenario => {
      addRequest({ requests: requestsConfig, scenarioId: savedScenario._id }).then(() => {
        navigate("/");
      })
    });
  }

  const setConfiguration = (configName, configData) => {
    if (configName === "request") {
      setRequests(configData)
    } else {
      setScenario(configData)
    }
  }
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: "#282828" }}>
      <div id='welcome-scenario-container'>
        <button style={{backgroundColor:"transparent",border:"none",color:"#ffffff",fontSize:"1.5vw",alignSelf:"flex-start",cursor:"pointer"}} onClick={onBack}>&lt;</button>
        <p style={{ margin: 0, fontSize: "1.8vw", width: "85%", marginBottom: 5,color:"#ffffff" }}>Create scenario under {project.projectName} </p>
        <form onSubmit={createScenario} id="welcome-scenario-form" style={{ backgroundColor: "#686868", padding: 5, height: "85%", width: "95%", borderRadius: 5, marginBottom: 30, overflowY: "auto" }}>
          <ScenarioConfiguration onSet={setConfiguration} />
          <RequestConfiguration onSet={setConfiguration} />
        </form>
      </div>
      <div style={{ height: "100%", width: "40%", display: "flex", alignItems: "center",backgroundColor:"transparent" }}>
        <img id='welcome-img' src={welcomeImage} />
      </div>
    </div>
  );
}
export default WelcomeScenarioScreen;