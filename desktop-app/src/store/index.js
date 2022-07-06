import React, { useState, createContext } from "react";
const StateStore = (props) => {

  const [projects, setProjects] = useState([]);//projects list
  const [currentProject, setCurrentProject] = useState({});//working project
  const [scenarios, setScenarios] = useState([]);//scenarios under working project
  const [openedDocuments, setDocuments] = useState([]);//details of all the opend tabs
  const [currentDocument, setCurrentDocument] = useState([])//current opened tab
  const [unsavedChanges, setunsavedChanges] = useState([])//unsaved changes of opened documents
  const states = {
    projects,
    currentProject,
    scenarios,
    openedDocuments,
    unsavedChanges,
    currentDocument
  }

  const dispatch = (type, payload) => {
    switch (type) {
      case "SET_PROJECTS":
        setProjects(payload)
        break;
      case "SET_CURRENT_PROJECT":
        setCurrentProject(payload)
        setScenarios([])
        setDocuments([])
        setCurrentDocument([])
        break;
      case "SET_CURRENT_DOCUMENT":
        setCurrentDocument(payload)
        break;
      case "PUSH_DOCUMENT":
        const existdoc = openedDocuments.filter(document => document._id === payload._id)
        if (!existdoc.length) {
          setDocuments([...openedDocuments, payload]);
          setunsavedChanges([...unsavedChanges, payload]);
        }
        setCurrentDocument(payload)
        break;
      case "POP_DOCUMENT":
        setDocuments(openedDocuments.filter((doc) => doc._id !== payload));
        if (payload === currentDocument._id) {//there is not working perfectly, need to change openedDocument to stack from array
          const newDoc = openedDocuments[0]
          setCurrentDocument(newDoc)
        }
        break;
      case "SET_SCENARIOS":
        setScenarios(payload)
        break;
      case "SET_RESPONSE":
        setDocuments(openedDocuments.map(document => {
          if (document._id === payload._id) {
            return { ...document, response: payload.response }
          } else {
            return document
          }
        }))
        if (currentDocument._id === payload._id) {
          setCurrentDocument({ ...currentDocument, response: payload.response })
        }
        break;
      case "SET_UNSAVED_CHANGE":
        setunsavedChanges(unsavedChanges.map((doc) => {
          if (payload._id === doc._id) {
            return payload;
          } else {
            return doc;
          }
        }))
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
