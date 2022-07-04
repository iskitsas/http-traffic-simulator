//images
import folderIcon from '../../../assets/images/folderIcon.png'
import arrowIcon from '../../../assets/images/arrowIcon.png'
import editMenu from '../../../assets/images/editMenu.svg'
import requestAdd from '../../../assets/images/requestIcon.png'

//functions
import { useEffect, useState } from 'react'
import { getBg } from '../../../utils/helper'

//components
import RequestCard from './RequestCard'
import { addRequest, getRequests } from '../../../renderer-process/Request/request.renderer'
import TempRequest from './TempRequest'

const ScenarioCard = ({scenario, currentDocument={}, onSelect }) => {
  const [requests, setRequests] = useState([])
  const [tempRequest,setTempReq] =useState([])
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

  const setRequestName = (value) => {
    setTempReq([{requestname:value}])
  }

  const addNewRequest =(e)=>{
    e.stopPropagation()
    onSelect(scenario)
    setTempReq([{}])
  }
  const editScenario = (e) =>{
    e.stopPropagation()
    onSelect(scenario)

  }

  const handelTempReq = (e) =>{
    if (e.target.className !== "filenavigation-add-request" && e.target.className !== "tempreq-input") {
      if (tempRequest[0]?.requestname) {
        addRequest({ requests: tempRequest, scenarioId: scenario._id })
        fetchAllRequest();
      }
      setTempReq([]);
    }
  }

  useEffect(()=>{
    setRequests([])
    setState(0)
  },[scenario])

  useEffect(()=>{
    window.addEventListener("click", handelTempReq)
    return () => {
      window.removeEventListener('click', handelTempReq);
    };
  },[tempRequest])

  return (
    <div className='sidebar-scenario-card-container'>
      <div className='sidebar-scenario-card card-hover' onClick={toggleFile} style={{ backgroundColor: getBg(scenario._id, currentDocument._id), borderLeft: currentDocument._id === scenario._id ? "5px solid #0e4fbe" : "5px solid transparent" }}>
        <img className={(state ? "fileOpenArrorw" : "fileCloseArrorw") + " fileStateIcon"} src={arrowIcon} />
        <img src={folderIcon} style={{ userSelect: "none", width: "2.0vw", height: "2.0vw", marginRight: "5px" }} />
        <p title={scenario.scenarioname} style={{ userSelect: "none", margin: "0px",width:"70%", fontSize: "1.8vh",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden" }}>{scenario.scenarioname}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={addNewRequest} className='filenavigation-add-request' title='add request'>
            <img style={{ height: "2.5vh" }} src={requestAdd} />
          </button>
          <button onClick={editScenario} className='filenavigation-edit-scenario' title='edit scenario'>
            <img className='filenavigation-edit-scenario-icon' style={{ height: "2vh" }} src={editMenu} />
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {
          tempRequest.map(tempReq=><TempRequest currentDocument={currentDocument} request={tempReq} onchange={setRequestName} />)
        }
        {
          state ? (requests.map(request => <RequestCard onSelect={onSelect} currentDocument={currentDocument} request={request} />)) : <></>
        }
      </div>
    </div>
  );
}
export default ScenarioCard;