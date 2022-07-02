import { useContext, useEffect, useState } from 'react';
import ScenarioCard from './SecnarioCard';
import './style.css'
import './scenarioCard.css'
import './requestcard.css'
import { StateContext } from '../../../store';
import { getScenarios } from '../../../renderer-process/Scenario/scenario.renderer';

const FilesNavigation = () => {
  const { currentDocument, dispatch, currentProject } = useContext(StateContext)
  const [scenarios, setScenarios] = useState([]);

  const setcurrentdocument = (document) => {
    dispatch("PUSH_DOCUMENT", document)
  }

  const getAllScenarios = async () => {
    const scenariosResponse = await getScenarios(currentProject._id);
    setScenarios(scenariosResponse)
    dispatch("SET_SCENARIOS", scenariosResponse)
  }
  useEffect(() => {
    if (currentProject._id) {
      getAllScenarios()
    }
  }, [currentProject])
  return (
    <div id='sidebar-container' style={{ display: "flex", borderRight: "1px solid rgb(66, 66, 66)", flexDirection: "column", justifyContent: "space-between", height: "91.3vh", width: "25vw" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10%", borderBottom: "1px solid rgb(66, 66, 66)" }}>
        <input id='search-files-input' placeholder="Search scenario"
          style={{
            padding: 5, justifyContent: "center",
            alignItems: "center", display: "flex",
            border: "1px solid rgb(66, 66, 66)", borderRadius: "5px", height: "30%", outline: "none", width: "80%"
          }} />
      </div>
      <div id='sidebar-scenarios-cards-container' style={{ padding: "0px 3px", height: "auto", overflowX: "hidden", overflowY: "auto", flex: 1 }}>
        {
          scenarios.map(scenario => <ScenarioCard scenario={scenario} currentDocument={currentDocument} onSelect={setcurrentdocument} />)
        }
      </div>
    </div>
  );
}
export default FilesNavigation;