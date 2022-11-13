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

  const sendRequest = async (config) => {
    const id = request._id
    dispatch(ACTION.SET_RESPONSE, { running: true, response: {}, _id: id });
    const result = await runRequest(config)
    if (result.error)
      dispatch(ACTION.SET_RESPONSE, { running: false, error: "Something went wrong!" })
    else
      dispatch(ACTION.SET_RESPONSE, { running: false, response: result, _id: id })
  }

  const requestconfigchange = (key, value) => {
    switch (key) {
      case "requestName":
        setRequest({ ...request, requestName: value })
        break;
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
        setRequest({ ...request, url: value.url, protocol: value.protocol, path: value.path, host: value.host, port: value.port })
        break;
      case "body":
        setRequest({ ...request, body: value })
        break;
      case "header":
        setRequest({ ...request, header: value })
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    dispatch(ACTION.UPDATE_UNSAVED_CHANGE, request)
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