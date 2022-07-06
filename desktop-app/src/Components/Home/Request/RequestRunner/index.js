import { useContext, useEffect, useState } from "react";
import { runRequest } from "../../../../renderer-process/Request/request.renderer";
import { StateContext } from "../../../../store";

import RequestBar from "./RequestBar"
import RequestEditor from "./RequestEditor";

import './style.css'

const RequestRunner = () => {
  const { currentDocument, unsavedChanges, scenarios, dispatch } = useContext(StateContext)
  const [currentRequest, setCurrentRequest] = useState({})
  const [combinedString, setCombinedString] = useState("")
  const [paramString, setParamsString] = useState("")

  const paramsChange = (params) => {
    let string = "";
    params.map((param, index) => {
      if (param.key !== "" && param.key !== undefined) {
        if (index === 0) {
          if (param.value !== "")
            return string += `?${param.key}=${param.value}`
          return string += `?${param.key}`
        }
        if (param.value !== "")
          return string += `&${param.key}=${param.value}`
        return string += `&${param.key}`
      }
    });
    setParamsString(string);
  }

  const onRequestUrlChange = (value) => {
    setCombinedString(value)
  }

  const sendRequest = async () => {
    const id = currentRequest._id
    dispatch("SET_RESPONSE", { response: "running...", _id: id })
    const scenarioConfig = scenarios.filter(scenario => scenario._id === currentRequest.scenarioId)[0]
    const config = {
      scenario: scenarioConfig,
      request: currentRequest
      // request:currentDocument
    }
    const result = await runRequest(config)
    dispatch("SET_RESPONSE", { response: result, _id: id })
  }

  const changecurrentrequest = (key, value) => {
    switch (key) {
      case "params":
        paramsChange(value)
        break;
      case "config":
        console.log(value)
        setCurrentRequest({ ...currentRequest, port: value.port, path: value.path })
        break;

      default:
        break;
    }
    // dispatch("SET_UNSAVED_CHNAGE",currentRequest)
  }

  useEffect(() => {
    let newHost = combinedString.split(/[/?]/)[0]
    if (newHost !== currentRequest.host)
      setCurrentRequest({ ...currentRequest, host: newHost })// parsing the host from combined url
  }, [combinedString])

  useEffect(() => {
    dispatch("SET_UNSAVED_CHANGE", currentRequest)
  }, [currentRequest])

  useEffect(() => {
    let host = combinedString;
    host = host.split("?")[0]
    setCombinedString(host + paramString)
  }, [paramString])

  useEffect(() => {
    if (currentDocument._id !== currentRequest._id){
      const currentrequest = unsavedChanges.filter(doc => doc._id === currentDocument._id)[0]
      setCurrentRequest(currentrequest);//not setting currentDocument directly as currentRequest because their might be some unsaved changes in the current open tab
      setCombinedString(currentDocument.host+currentDocument.path);
    }
  }, [currentDocument, currentRequest, unsavedChanges])

  return (
    <div id='request-container'>
      <RequestBar
        url={combinedString}
        currentRequest={currentRequest}
        onchange={onRequestUrlChange}
        run={sendRequest} />
      <RequestEditor url={combinedString} request={currentRequest} onchange={changecurrentrequest} />
    </div>
  )
}
export default RequestRunner;