import './style.css'
import welcomeImage from '../../../assets/images/welcome-form.png'
import { useNavigate } from 'react-router-dom'
import ScenarioConfiguration from './ScenarioConfiguration';
import RequestConfiguration from './RequestConfiguration';
import { useState } from 'react';
import { addRequest } from '../../../renderer-process/Request/request.renderer';
import { addScenario } from '../../../renderer-process/Scenario/scenario.renderer';
import arrow from "../../../assets/images/arrowIcon.png"
const WelcomeScenarioScreen = ({ onBack, onNext, project }) => {
  const navigate = useNavigate();
  const [scenarioConfig, setScenario] = useState({});
  const [requestsConfig, setRequests] = useState([]);

  const refineRequests = () => {//seperating protocol from host
    requestsConfig.map((request, index) => {
      request.host = request.host.replace("https://", "")
      request.host = request.host.replace("http://", "")
      request.protocol = request.port.toString() === "443" ? "https" : "http"
      request.url =  `${request.protocol}://${request.host}:${request.port}${request.path}`
    })
  }

  const createScenario = (e) => {
    e.preventDefault();
    refineRequests()
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
    <div style={{ width: "100%", height: "100vh", display: "flex", backgroundColor: "#282828" }}>
      <div id='welcome-scenario-left'>
        <img id='welcome-img' src={welcomeImage} />
      </div>
      <div id='welcome-scenario-container'>
        <button style={{ backgroundColor: "transparent", border: "none", color: "#ffffff", fontSize: "1.5vw", alignSelf: "flex-start", cursor: "pointer" }} onClick={onBack}>
          <img id='backArrow-welcome-screen' src={arrow} />
        </button>
        <p style={{ margin: 0, fontSize: "2.8vw", width: "85%", marginBottom: 5, color: "#25bba4", fontWeight: "bold", fontFamily: "sans-serif", }}>Create scenario under {project.projectName} </p>
        <form onSubmit={createScenario} id="welcome-scenario-form" style={{ padding: 5, height: "85%", width: "95%", borderRadius: 5, marginBottom: 30, overflowY: "auto" }}>
          <ScenarioConfiguration onSet={setConfiguration} />
          <RequestConfiguration onSet={setConfiguration} />
        </form>
      </div>
    </div>
  );
}
export default WelcomeScenarioScreen;