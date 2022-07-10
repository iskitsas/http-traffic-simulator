//images
import folderIcon from '../../../assets/images/folderIcon.png'
import arrowIcon from '../../../assets/images/arrowIcon.png'
import editMenu from '../../../assets/images/editMenu.svg'
import requestAdd from '../../../assets/images/requestIcon.png'

//functions
import { useContext, useEffect, useState } from 'react'
import { getBg } from '../../../utils/helper'

//components
import RequestCard from './RequestCard'
import { addRequest, getRequests } from '../../../renderer-process/Request/request.renderer'
import TempRequest from './TempRequest'
import { StateContext } from '../../../store'
import { ACTION } from '../../../constants'

const ScenarioCard = ({ scenario, onSelect, openMenu }) => {
  const { dispatch, currentDocument = {}, requests = [] } = useContext(StateContext)
  const [requestss, setRequests] = useState([])
  const [tempRequest, setTempReq] = useState([])
  const [state, setState] = useState(0)

  const fetchAllRequest = async () => {
    const respo = await getRequests(scenario._id);
    if (respo.length !== 0)
      dispatch(ACTION.SET_REQUESTS, respo)
  }

  const toggleFile = () => {
    onSelect(scenario)
    setState(!state)
  }

  const setRequestName = (value) => {
    setTempReq([{ requestname: value }])
  }

  //handel add request button click
  const addNewRequest = (e) => {
    e.stopPropagation()
    onSelect(scenario)
    setTempReq([{}])
    setState(1)
  }

  const editScenario = (e) => {
    e.stopPropagation()
    openMenu(e)
    onSelect(scenario)
  }

  //handel request creation and delete temprequest card
  const handelTempReq = async (e) => {
    if (e.target.className !== "filenavigation-add-request" && e.target.className !== "tempreq-input") {
      if (tempRequest[0]?.requestname) {
        tempRequest[0].method = "GET" //setting default data as GET
        tempRequest[0].host = "" //setting default data as blank
        tempRequest[0].port = "" //setting default data as blank
        tempRequest[0].path = "" //setting default data as /
        const response = await addRequest({ requests: tempRequest, scenarioId: scenario._id })
        dispatch(ACTION.PUSH_DOCUMENT, response[0])
        fetchAllRequest();
      }
      setTempReq([]);
    }
  }

  useEffect(()=>{//this will handle the opening of acordian if the current request opened is belongs to this scenario
    if(currentDocument?.scenarioId && currentDocument?.scenarioId===scenario._id){
      setState(1);
    }
  },[currentDocument])

  useEffect(() => {
    const req = requests?.filter(request => {
      if (request.scenarioId === scenario._id) {
        return request.requests
      }
    })
    setRequests(req[0]?.requests || [])
  }, [requests])

  useEffect(() => {
    fetchAllRequest();
    setRequests([])
    setState(0)
  }, [scenario])

  useEffect(() => {
    window.addEventListener("click", handelTempReq)
    return () => {
      window.removeEventListener('click', handelTempReq);
    };
  }, [tempRequest])

  return (
    <div className='sidebar-scenario-card-container'>
      <div className='sidebar-scenario-card card-hover' onClick={toggleFile} style={{ backgroundColor: getBg(scenario._id, currentDocument._id), borderLeft: currentDocument._id === scenario._id ? "5px solid #0e4fbe" : "5px solid transparent" }}>
        <img className={(state ? "fileOpenArrorw" : "fileCloseArrorw") + " fileStateIcon"} src={arrowIcon} />
        <img src={folderIcon} style={{ userSelect: "none", width: "2.0vw", height: "2.0vw", marginRight: "5px" }} />
        <p title={scenario.scenarioname} style={{ userSelect: "none", margin: "0px", width: "70%", fontSize: "1.8vh", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{scenario.scenarioname}</p>
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
          tempRequest.map(tempReq => <TempRequest currentDocument={currentDocument} request={tempReq} onchange={setRequestName} />)
        }
        {
          state ? (requestss.map(request => <RequestCard openMenu={openMenu} onSelect={onSelect} currentDocument={currentDocument} request={request} />)) : <></>
        }
      </div>
    </div>
  );
}
export default ScenarioCard;