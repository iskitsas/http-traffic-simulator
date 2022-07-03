import './style.css'
import { useContext, useEffect, useRef, useState } from 'react';
import VerticalDragger from './VerticalDragger';
import OpenTabs from './OpenTabs';
import { StateContext } from '../../../store';
import { runRequest } from '../../../renderer-process/Request/request.renderer';
import ScenarioRunner from './ScenarioRunner';
import RequestRunner from './RequestRunner';
const Request = () => {

  const { currentDocument, scenarios, dispatch } = useContext(StateContext)
  const resizable = useRef();
  const [combinedString, setCombinedString] = useState("")
  const [paramString, setParamsString] = useState("")

  const paramsChange = (params) => {
    let string = "";
    params.map((param, index) => {
      if (param.key !== "" && param.key !== '' && param.key !== undefined) {
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
  const onRequestUrlChange = (e) => {
    setCombinedString(e.target.value)
  }

  const sendRequest=async()=>{
    const id=currentDocument._id
    dispatch("SET_RESPONSE",{response:"running...",_id:id})
    const scenarioConfig = scenarios.filter(scenario=>scenario._id===currentDocument.scenarioId)[0] 
    const config = {
      scenario:scenarioConfig,
      request:currentDocument
    }
    const result = await runRequest(config)
    dispatch("SET_RESPONSE",{response:result,_id:id})
  }

  useEffect(()=>{
    if(currentDocument.host){
      setCombinedString(currentDocument.host)
    }
  },[currentDocument])

  useEffect(() => {
    let host = combinedString;
    host = host.split("?")[0]
    setCombinedString(host + paramString)
  }, [paramString])

  return (
    <>
      <div id='request-container-wrapper' ref={resizable} style={{overflow:"hidden"}} >
        <OpenTabs />
        {
          currentDocument.scenarioId?
          <RequestRunner onParamChange={paramsChange} onRequestUrlChange={onRequestUrlChange} sendRequest={sendRequest} url={combinedString} />:
          <ScenarioRunner/>
        }
      </div>
      <VerticalDragger resizable={resizable} />
    </>
  );
}
export default Request;