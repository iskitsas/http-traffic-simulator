import './style.css'
import RequestEditor from './RequestEditor';
import { useContext, useEffect, useRef, useState } from 'react';
import Dragger from './Dragger';
import OpenTabs from './OpenTabs';
import { StateContext } from '../../../store';
import { runRequest } from '../../../renderer-process/Request/request.renderer';
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

  const startrunningrequest=async()=>{
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
        <div id='request-container'>
          <div id='request-container-header'>
            <div id='request-url-container'>
              <select id='request-method-select'>
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>PATCH</option>
                <option>DELETE</option>
              </select>
              <input id='request-url-input' placeholder="http://example.com"
                value={combinedString} onChange={onRequestUrlChange} />
            </div>
            <button onClick={startrunningrequest} id='request-run-btn'>Run</button>
          </div>
          <RequestEditor url={combinedString} onParamsChange={paramsChange} />
        </div>
      </div>
      <Dragger resizable={resizable} />
    </>
  );
}
export default Request;