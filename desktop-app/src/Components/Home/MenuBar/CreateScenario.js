import { useContext, useState } from "react";
import { ACTION } from "../../../constants";
import { addScenario, getScenarios } from "../../../renderer-process/Scenario/scenario.renderer";
import { StateContext } from "../../../store";

const CreateScenario = ({ onClose }) => {
  const { projects, dispatch, currentProject } = useContext(StateContext);
  const [selectedproject, setProject] = useState("");//_id of selected project
  const [scenarioConfig, setConfig] = useState({ scenarioname: "", duration: "", workers: "", totalclients: "", throttling: "", delay: "" });
  const statechange = (e) => {
    setConfig({ ...scenarioConfig, [e.target.name]: e.target.value })
  }
  const savescenario = async (e) => {
    e.preventDefault();
    const response = await addScenario(scenarioConfig, selectedproject);
    if (currentProject._id === selectedproject) {
      const scenariosResponse = await getScenarios(selectedproject);
      dispatch(ACTION.SET_SCENARIOS, scenariosResponse);
      dispatch("PUSH_DOCUMENT", response)
    }
    onClose();
  }
  return (
    <form className="create-form" onSubmit={savescenario}>
      <label >Selete project</label>
      <select value={selectedproject} onChange={(e) => setProject(e.target.value)} required>
        <option value="">Selete Project</option>
        {
          projects?.map(project => <option value={project._id} key={project._id}>{project.projectName}</option>)
        }
      </select>
      <label >Enter scenario name</label>
      <input required value={scenarioConfig.scenarioname} name="scenarioname" onChange={statechange} placeholder="Ex: Scenario 1" />

      <label title="test duration">Total duration</label>
      <input required value={scenarioConfig.duration} name="duration" onChange={statechange} placeholder="Ex: 5 (-1 for infinite)" />

      <label title="test duration">Number of workers</label>
      <input required value={scenarioConfig.workers} name="workers" onChange={statechange} placeholder="Ex: 4" />

      <label title="test duration">Number of clients</label>
      <input required value={scenarioConfig.totalclients} name="totalclients" onChange={statechange} placeholder="Ex: 10" />

      <label title="test duration">Throttling per request in bps</label>
      <input required value={scenarioConfig.throttling} name="throttling" onChange={statechange} placeholder="Ex: 50000 (-1 for no throttling)" />

      <label title="test duration">Delay between requests</label>
      <input required value={scenarioConfig.delay} name="delay" onChange={statechange} placeholder="Ex: 0.5-1.5" />
      <button type="submit">Save</button>
    </form>
  );
}
export default CreateScenario;