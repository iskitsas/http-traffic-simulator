import './style.css'
import welcomeImage from '../../../assets/images/welcome-form.jpg'
import { useNavigate } from 'react-router-dom'
import ScenarioConfiguration from './ScenarioConfiguration';
import RequestConfiguration from './RequestConfiguration';
import { useState } from 'react';
import { addRequest } from '../../../renderer-process/Request/request.renderer';
import { addScenario } from '../../../renderer-process/Scenario/scenario.renderer';
const WelcomeScenarioScreen = ({onBack, onNext, project}) => {
  const navigate= useNavigate();
  const [scenarioConfig, setScenario] = useState({});
  const [requestsConfig, setRequests] = useState([]);

  const createScenario = (e) => {
    e.preventDefault();
    const projectId=project._id;
    const configs = {
      scenario:scenarioConfig,
      requests:requestsConfig,
      projectId:projectId
    }
    addScenario({...configs.scenario,projectId}).then(savedScenario=>{
      addRequest({requests:configs.requests,scenarioId:savedScenario._id}).then(()=>{
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
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div id='welcome-scenario-container'>
      <button onClick={onBack}>go back</button>
        <p style={{ margin: 0, fontSize: "2.2vw", width: "85%", marginBottom: 5 }}>Create scenario under {project.projectName} </p>
        <form onSubmit={createScenario} id="welcome-scenario-form" style={{ backgroundColor: "#d6d6d6", padding: 5, height: "85%", width: "95%", borderRadius: 5, marginBottom: 30, overflowY: "auto" }}>
          <ScenarioConfiguration onSet={setConfiguration} />
          <RequestConfiguration onSet={setConfiguration} />
        </form>
      </div>
      <div style={{ height: "100%", width: "40%", display: "flex", alignItems: "center" }}>
        <img id='welcome-img' src={welcomeImage} />
      </div>
    </div>
  );
}
export default WelcomeScenarioScreen;