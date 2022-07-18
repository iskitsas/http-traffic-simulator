import { useContext, useEffect, useRef, useState } from "react";
import { ACTION } from "../../../../constants";
import { runRequest } from "../../../../renderer-process/Request/request.renderer";
import { StateContext } from "../../../../store";
import HorizontalDragger from "../HorizontalDragger";
import ScenarioLeft from "./ScenarioLeft";
import ScenarioRight from "./ScenarioRight";
import './style.css'
const ScenarioRunner = () => {
  const { requests, currentDocument,dispatch,unsavedChanges } = useContext(StateContext)
  const [requestss, setRequests] = useState([])
  const resizable = useRef();

  const sendmultirequest = async () => {
    const id = currentDocument._id;
    dispatch(ACTION.SET_RESPONSE, { running: true, response: {}, _id: id });
    let scenarioConfig;
    scenarioConfig = unsavedChanges.filter(scenario => scenario._id === id)
    if (scenarioConfig.length === 0)
      scenarioConfig = currentDocument;

    const config = {
      scenario: scenarioConfig[0],
      request: requestss
    }
    const result = await runRequest(config)
    dispatch(ACTION.SET_RESPONSE, { running: false, response: result, _id: id })
  }


  useEffect(() => {
    const req = requests?.filter(request => {
      if (request.scenarioId === currentDocument._id) {
        return request.requests
      }
    })
    setRequests(req[0]?.requests || [])
  }, [currentDocument, requests])

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <ScenarioLeft Ref={resizable} requestss={requestss} onRun={sendmultirequest} />
      <HorizontalDragger resizable={resizable} />
      <ScenarioRight requestss={requestss} />
    </div>
  );
}
export default ScenarioRunner;