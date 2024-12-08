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
      if (!request.port && request.protocol) {
        if (request.protocol.toString() === "https")
          request.port = 443
        else
          request.port = 80
        onRun(config)
      } else
        setShowInvalid(true)
  }

  const parseUrl = (url = "") => {
    setUrl(url)
    let temp = ""
    let temp_host_port_path = ""
    let temp_port_path = ""
    let temp_host = ""
    let temp_path = ""
    let temp_protocol = ""
    let temp_port = ""

    temp = url.replace("http://", "")
    temp = temp.replace("https://", "")
    temp = temp.replace("http:/", "")
    temp = temp.replace("https:/", "")
    temp = temp.replace("http:", "")
    temp = temp.replace("https:", "")
    temp_host_port_path = temp;
    temp = ""

    if (url.includes("http:") || url.includes("http:/") || url.includes("http://")) {
      temp_protocol = "http"
    } else if (url.includes("https:") || url.includes("https:/") || url.includes("https://")) {
      temp_protocol = "https"
    }


    temp = temp_host_port_path.split(":");
    temp_host = temp[0] || "";

    if (temp[1])
      if (temp_host_port_path.includes(":"))
        temp_port_path = `:${temp[1] || ""}`;
      else
        temp_port_path = temp[1] || "";
    else if (temp_host_port_path.includes(":"))
      temp_host = temp_host + ":"

    temp = temp_port_path.split("/")
    if (temp[0] === ":")
      temp_port = ":"
    else
      temp_port = temp[0].replace(":", "") || ""

    if (temp_port_path.includes("/") && temp[1] !== "/")
      temp_path = `/${temp[1] || ""}`
    else
      temp_path = temp[1] || ""

    if (temp_host.includes("/")) {
      let tmp = temp_host.split("/")
      temp_host = tmp[0]
      temp_path = `/${tmp[1] || ''}`
    }
    onchange("url", { url: url, protocol: temp_protocol, host: temp_host, path: temp_path, port: temp_port })
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

  const generateurl = () => {
    let temp_protocol = request.protocol
    if (request.url.includes("http://") || request.url.includes("https://"))
      temp_protocol = temp_protocol + "://"
    else if (request.url.includes("http:/") || request.url.includes("https:/"))
      temp_protocol = temp_protocol + ":/"
    else if (request.url.includes("http:") || request.url.includes("https:"))
      temp_protocol = temp_protocol + ":"

    let temp_host = request.host ? request.host : ""
    let temp_port = ""
    if (request.port === ":")
      temp_port = ":"
    else
      temp_port = request.port ? ":" + request.port : ""
    let temp_path = request.path ? request.path : ""
    let new_url = temp_protocol + temp_host + temp_port + temp_path
    if (new_url !== Url)
      setUrl(new_url || "")
  }

  useEffect(() => {
    if (request.url)
      generateurl()
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