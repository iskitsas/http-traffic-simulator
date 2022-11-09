import React, { useState, createContext } from "react";
import { ACTION } from "../constants";
const StateStore = (props) => {

  const [projects, setProjects] = useState([]);//projects list
  const [currentProject, setCurrentProject] = useState({});//working project
  const [scenarios, setScenarios] = useState([]);//scenarios under working project
  const [requests, setRequests] = useState([]);//all reuqests
  const [openedDocuments, setDocuments] = useState([]);//details of all the opend tabs
  const [currentDocument, setCurrentDocument] = useState([])//current opened tab
  const [unsavedChanges, setunsavedChanges] = useState([])//unsaved changes of opened documents
  const [responses, setResponses] = useState([])

  const states = {
    projects,
    currentProject,
    scenarios,
    requests,
    openedDocuments,
    unsavedChanges,
    currentDocument,
    responses
  }

  const dispatch = (type, payload) => {
    switch (type) {

      case ACTION.SET_PROJECTS:
        setProjects(payload)
        break;

      case ACTION.SET_CURRENT_PROJECT:
        setCurrentProject(payload)
        setScenarios([])
        setDocuments([])
        setCurrentDocument([])
        break;

      case ACTION.SET_SCENARIOS:
        setScenarios(payload)
        break;

      case ACTION.SET_REQUESTS:
        const farray = requests.filter(req => req.scenarioId === payload.scenarioId)
        if (farray.length === 0)
          setRequests([...requests, { scenarioId: payload.scenarioId, requests: payload.requests }])
        else
          setRequests(requests.map(req => {
            if (req.scenarioId === payload.scenarioId)
              return { scenarioId: req.scenarioId, requests: payload.requests }
            else
              return req;
          }));
        break;

      case ACTION.PUSH_DOCUMENT:
        const existdoc = openedDocuments.filter(document => document._id === payload._id)
        if (!existdoc.length) {
          setDocuments([...openedDocuments, payload]);
          dispatch(ACTION.SET_UNSAVED_CHANGE, [...unsavedChanges, payload])
          setResponses([...responses, { _id: payload._id, responses: {}, running: "" }])
        }
        setCurrentDocument(payload)
        break;

      case ACTION.SET_CURRENT_DOCUMENT:
        setCurrentDocument(payload)
        break;

      case ACTION.POP_DOCUMENT:
        setDocuments(openedDocuments.filter((doc) => doc._id !== payload));
        dispatch(ACTION.SET_UNSAVED_CHANGE, unsavedChanges.filter((doc) => doc._id !== payload))
        setResponses(responses.filter((doc) => doc._id !== payload))
        if (payload === currentDocument._id) {//this is not working perfectly, need to change openedDocument to stack from array
          const newDoc = openedDocuments[0]
          setCurrentDocument(newDoc)
        }
        break;

      case ACTION.SET_RESPONSE:
        if (responses.length === 0)
          setResponses([{ _id: payload._id, response: payload.response, running: payload.running }])
        else
          setResponses((prevResponses) => prevResponses.map(doc => {
            if (doc._id === payload._id) {
              return { _id: payload._id, response: payload.response, running: payload.running }
            } else {
              return doc
            }
          }));
        break;
      case ACTION.UPDATE_OPEN_DOCUMENTS:
        setDocuments(openedDocuments.map((doc) => {
          if (payload._id === doc._id) {
            return payload;
          } else {
            return doc;
          }
        }))
        break;
      case ACTION.SET_OPENDDOC:
        setDocuments(payload)
        break;
      case ACTION.UPDATE_UNSAVED_CHANGE:
        setunsavedChanges(unsavedChanges.map((doc) => {
          if (payload._id === doc._id) {
            return payload;
          } else {
            return doc;
          }
        }))
        break;
      case ACTION.SET_UNSAVED_CHANGE:
        setunsavedChanges(payload)
        break;
      default:
        break;
    }
  }

  return (
    <StateContext.Provider
      value={{
        ...states,
        dispatch
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}

export const StateContext = createContext();
export default StateStore;
