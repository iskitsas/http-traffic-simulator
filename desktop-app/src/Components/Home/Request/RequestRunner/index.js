import { useContext, useEffect, useState } from "react";
import { ACTION } from "../../../../constants";
import { runRequest } from "../../../../renderer-process/Request/request.renderer";
import { StateContext } from "../../../../store";

import RequestBar from "./RequestBar"
import RequestEditor from "./RequestEditor";

import './style.css'

const RequestRunner = () => {
  const { currentDocument, unsavedChanges, scenarios, dispatch } = useContext(StateContext)
  const [request, setRequest] = useState({})

  const sendRequest = async () => {
    const id = request._id
    dispatch(ACTION.SET_RESPONSE, { running: true, response: {}, _id: id })
    let scenarioConfig
    scenarioConfig = unsavedChanges.filter(scenario => scenario._id === request.scenarioId)[0]
    if (scenarioConfig.length === 0)
      scenarioConfig = scenarios.filter(scenario => scenario._id === request.scenarioId)[0]
      
    const config = {
      scenario: scenarioConfig,
      request: request
    }
    const result = await runRequest(config)
    dispatch(ACTION.SET_RESPONSE, { running: false, response: result, _id: id })
  }

  const requestconfigchange = (key, value) => {
    switch (key) {
      case "method":
        setRequest({ ...request, method: value })
        break;
      case "host":
        setRequest({ ...request, host: value })
        break;
      case "path":
        setRequest({ ...request, path: value })
        break;
      case "port":
        setRequest({ ...request, port: value })
        break;
      case "url":
        setRequest({ ...request, path: value.path, host: value.host })
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    dispatch(ACTION.SET_UNSAVED_CHANGE, request)
  }, [request])

  useEffect(() => {
    if (request._id !== currentDocument._id) {
      const newrequest = unsavedChanges.filter(doc => doc._id === currentDocument._id)[0]
      setRequest(newrequest)
    }
  }, [unsavedChanges, currentDocument])

  return (
    <div id='request-container'>
      <RequestBar request={request} onchange={requestconfigchange} onRun={sendRequest} />
      <RequestEditor request={request} onchange={requestconfigchange} />
    </div>
  )
}
export default RequestRunner;