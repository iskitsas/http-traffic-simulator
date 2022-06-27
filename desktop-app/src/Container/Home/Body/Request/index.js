import './style.css'
import RequestEditor from './RequestEditor';
import { useEffect, useRef, useState } from 'react';
import Dragger from './Dragger';
const Request = () => {
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
  useEffect(() => {
    let host = combinedString;
    host = host.split("?")[0]
    setCombinedString(host + paramString)
  }, [paramString])

  return (
    <>
      <div id='request-container-wrapper' ref={resizable}>
        <div id='open-scenarios-list' ></div>
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
              <input id='request-url-input' placeholderColor="white" placeholder="http://example.com"
                paramString={paramString} value={combinedString} onChange={onRequestUrlChange} />
            </div>
            <button id='request-run-btn'>Run</button>
          </div>
          <RequestEditor url={combinedString} onParamsChange={paramsChange} />
        </div>
      </div>
      <Dragger resizable={resizable} />
    </>
  );
}
export default Request;