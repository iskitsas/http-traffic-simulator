import { useContext, useEffect, useState } from "react";
import { ACTION } from "../../../../constants";
import { getRequests, updateRequest } from "../../../../renderer-process/Request/request.renderer";
import { StateContext } from "../../../../store";
import InvalidRequest from "./InvalidRequest";

const RequestBar = ({ request, onchange, onRun }) => {
  const { currentDocument, dispatch, unsavedChanges, scenarios } = useContext(StateContext)
  const [Url, setUrl] = useState("")
  const [showSaveBtn, setSaveBtn] = useState(false)
  const [showInvalid, setShowInvalid] = useState(false)
  const [request_scenario, setRequestScenario] = useState({})

  const checkBeforeRun = () => {
    let scenario = {};
    scenario = unsavedChanges.filter(scenario => scenario._id === request.scenarioId)
    setRequestScenario(scenario)
    if (scenario.length === 0)
      scenario = scenarios.filter(scenario => scenario._id === request.scenarioId)
    scenario = scenario[0]
    const config = {
      scenario: scenario,
      request: request
    }
    if (request.path && request.port && request.host && request.method && scenario?.duration && scenario?.totalclients && scenario?.throttling && scenario?.delay)
      onRun(config)
    else
      setShowInvalid(true)
  }

  const parseUrl = (url) => {
    setUrl(url)
    let array = url.split(/^(([^@:\/\s]+):\/?)?\/?(([^@:\/\s]+)(:([^@:\/\s]+))?@)?([^@:\/\s]+)(:(\d+))?(((\/\w+)*\/)([\w\-\.]+[^#?\s]*)?(.*)?(#[\w\-]+)?)?$/)
    if (array.length > 1) {
      let path = array[10] || ""
      let hostname = (array[1] ? array[1] + "/" : "") + array[7]
      console.log(array)
      onchange("url", { host: hostname, path: path })
    }
    // let array = url.split(/^(([^@:\/\s]+):\/?)?\/?(([^@:\/\s]+)(:([^@:\/\s]+))?@)?([^@:\/\s]+)(:(\d+))?(((\/\w+)*\/)([\w\-\.]+[^#?\s]*)?(.*)?(#[\w\-]+)?)?$/)
    /*
    array[2] = protocol
    array[7] = hostname
    array[9] = port
    array[10] = parth+params
    array[11]+array[13] = path

     */
  }

  const stateChange = (e) => {
    switch (e.target.name) {
      case "method":
        onchange("method", e.target.value)
        break;
      default:
        parseUrl(e.target.value)
        break;
    }
  }

  const saverequest = async () => {
    await updateRequest(request);
    const requests = await getRequests(request.scenarioId);
    dispatch(ACTION.SET_REQUESTS, { requests: requests, scenarioId: request.scenarioId })
    dispatch(ACTION.UPDATE_OPEN_DOCUMENTS, request)
    dispatch(ACTION.SET_CURRENT_DOCUMENT, request)
  }

  useEffect(() => {
    if (JSON.stringify(request) !== JSON.stringify(currentDocument)) {
      setSaveBtn(true)
    } else {
      setSaveBtn(false)
    }
  }, [currentDocument, request])

  useEffect(() => {
    setUrl((request.host + request.path) || "")
  }, [request])

  return (
    <div id='request-container-header'>
      <div id='request-url-container'>
        <select name="method" value={request.method} onChange={stateChange} id='request-method-select'>
          <option value="GET" >GET</option>
          <option value="POST" >POST</option>
          <option value="PUT" >PUT</option>
          <option value="PATCH" >PATCH</option>
          <option value="DELETE" >DELETE</option>
        </select>
        <input name="url" id='request-url-input' placeholder="www.example.com"
          value={Url} onChange={stateChange} />
      </div>
      <button onClick={checkBeforeRun} id='request-run-btn'>Run</button>
      <button disabled={!showSaveBtn} onClick={saverequest} id='request-save-btn' style={{ backgroundColor: showSaveBtn ? "#636d77" : "#aebac5", cursor: showSaveBtn ? "pointer" : "not-allowed" }} >Save</button>
      {
        showInvalid &&
        <InvalidRequest onClose={() => setShowInvalid(false)} scenario={request_scenario} request={request} />
      }
    </div>
  );
}
export default RequestBar;