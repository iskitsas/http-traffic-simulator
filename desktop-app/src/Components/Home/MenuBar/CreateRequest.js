import { useContext, useEffect, useState } from "react";
import { ACTION } from "../../../constants";
import { addRequest, getRequests } from "../../../renderer-process/Request/request.renderer";
import { getScenarios } from "../../../renderer-process/Scenario/scenario.renderer";
import { StateContext } from "../../../store";

const CreateRequest = ({ onClose }) => {
  const { projects, dispatch, currentProject } = useContext(StateContext);
  const [selectedproject, setProject] = useState("");//_id of selected project
  const [selectedScenario, setScenario] = useState("");//_id of selected scenario
  const [scenarios, setScenarios] = useState([])
  const [requestConfig, setConfig] = useState({ method: "GET", path: "", port: "", url: "", protocol: "", host: "", requestName: "" })

  const generateUrl = (config) => {
    //checking if user provides protocol or not
    requestConfig.host = config.host.replace("https://", "")
    requestConfig.host = config.host.replace("http://", "")
    requestConfig.protocol = config.port.toString() === "443" ? "https" : "http"

    return `${config.protocol}://${config.host}:${config.port}${config.path}`
  }

  const saverequest = async (e) => {
    e.preventDefault();
    requestConfig.url = generateUrl(requestConfig);
    const response = await addRequest({ requests: requestConfig, scenarioId: selectedScenario });
    if (currentProject._id === selectedproject) {
      const requests = await getRequests(selectedScenario);
      dispatch(ACTION.SET_REQUESTS, { requests: requests, scenarioId: selectedScenario });
      dispatch("PUSH_DOCUMENT", response)
    }
    onClose();
  }

  const statechange = (e) => {
    setConfig({ ...requestConfig, [e.target.name]: e.target.value })
  }

  const getscenarios = async () => {
    const response = await getScenarios(selectedproject)
    setScenarios(response)
  }

  useEffect(() => {
    if (selectedproject !== "")
      getscenarios();
  }, [selectedproject])

  return (
    <form onSubmit={saverequest} className="create-form">
      <label >Selete project</label>
      <select value={selectedproject} onChange={(e) => setProject(e.target.value)} required>
        <option value="">Selete Project</option>
        {
          projects?.map(project => <option value={project._id} key={project._id}>{project.projectName}</option>)
        }
      </select>
      <label >Selete Scenario</label>
      <select value={selectedScenario} onChange={(e) => setScenario(e.target.value)} required>
        <option value="">Selete scenario</option>
        {
          scenarios?.map(scenarios => <option value={scenarios._id} key={scenarios._id}>{scenarios.scenarioname}</option>)
        }
      </select>
      <label >Request name</label>
      <input value={requestConfig.requestName} name="requestName" onChange={statechange} placeholder="Ex: get all cases" required />
      <label >Host</label>
      <input value={requestConfig.host} name="host" onChange={statechange} placeholder="Ex: www.example.com" required />
      <label >Port</label>
      <input value={requestConfig.port} name="port" onChange={statechange} placeholder="Ex: 80 or 443" required />
      <label >Path</label>
      <input value={requestConfig.path} name="path" onChange={statechange} placeholder="Ex: /" required />
      <label >Method</label>
      <select value={requestConfig.method} name="method" onChange={statechange} required>
        <option value="">Select method</option>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PATCH">PATCH</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <button>Save</button>
    </form>
  );
}
export default CreateRequest;