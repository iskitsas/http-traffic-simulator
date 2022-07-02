//images
import folderIcon from '../../../assets/images/folderIcon.png'
import arrowIcon from '../../../assets/images/arrowIcon.png'

//functions
import { useEffect, useState } from 'react'
import { getBg } from '../../../utils/helper'

//components
import RequestCard from './RequestCard'
import { getRequests } from '../../../renderer-process/Request/request.renderer'

const ScenarioCard = ({scenario, currentDocument={}, onSelect }) => {
  const [requests, setRequests] = useState([])
  const [state, setState] = useState(0)

  const fetchAllRequest =async ()=>{
   const respo = await getRequests(scenario._id);
   setRequests(respo)
  }

  const toggleFile = () => {
    if(!requests.length){
      fetchAllRequest()
    }
    onSelect(scenario)
    setState(!state)
  }
  useEffect(()=>{
    setRequests([])
    setState(0)
  },[scenario])
  return (
    <div className='sidebar-scenario-card-container'>
      <div className='sidebar-scenario-card card-hover' onClick={toggleFile} style={{ backgroundColor: getBg(scenario._id, currentDocument._id), borderLeft: currentDocument._id === scenario._id ? "5px solid #0e4fbe" : "5px solid transparent" }}>
        <img className={(state ? "fileOpenArrorw" : "fileCloseArrorw") + " fileStateIcon"} src={arrowIcon} />
        <img src={folderIcon} style={{ userSelect: "none", width: "2.0vw", height: "2.0vw", marginRight: "5px" }} />
        <p title={scenario.scenarioname} style={{ userSelect: "none", margin: "0px",width:"70%", fontSize: "1.8vh",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden" }}>{scenario.scenarioname}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {
          state ? (requests.map(request => <RequestCard onSelect={onSelect} currentDocument={currentDocument} request={request} />)) : <></>
        }
      </div>
    </div>
  );
}
export default ScenarioCard;