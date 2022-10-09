import { useEffect, useRef, useState } from 'react';

import './requesteditor.css'

import RequestBody from './RequestBody';
import RequestParams from './RequestParams';
import RequestHeaders from './RequestHeaders';
import RequestConfigs from './RequestConfigs';

const RequestEditor = ({ request, onchange }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [params, setParams] = useState([{ key: "", value: "", description: "" }])
  const [paramString, setParamString] = useState("")
  const addField = () => {
    setParams([...params, { key: "", value: "", description: "" }])
  }

  const deleteField = (indexToDelete) => {
    setParams(params.filter((param, index) => index !== indexToDelete))
  }

  const getColor = (tab) => {
    if (tab === currentTab)
      return "#c5c5c5"
    else
      return "#747474"
  }

  const getBorderColor = (tab) => {
    if (tab === currentTab)
      return "1px solid rgb(0, 132, 255)"
    else
      return "1px solid transparent"
  }

  const setparams = (onIndex, key, value) => {
    setParams(
      params.map((param, index) => {
        return index === onIndex ? { ...param, [key]: value } : param;
      })
    );
  }

  const tempString = useRef();
  useEffect(() => {
    tempString.current = ""
    params.map((param, index) => {
      if (param.key !== "" && param.key !== undefined) {
        if (index === 0) {
          if (param.value !== "")
            return tempString.current += `?${param.key}=${param.value}`
          return tempString.current += `?${param.key}`
        }
        if (param.value !== "")
          return tempString.current += `&${param.key}=${param.value}`
        return tempString.current += `&${param.key}`
      }
    });
    setParamString(tempString.current)
  }, [params])

  useEffect(() => {
    const host = request.path?.split("?") || []
    if (host[0] + paramString !== request.path)
      onchange("path", host[0] + paramString)
  }, [paramString])

  useEffect(() => {
    let array = request.path?.split("") || [];
    let index = array.indexOf("?");
    if (index !== -1) {
      array = array.splice(index + 1, array.length - 1).join("");
      array = array.split("&")
      setParams(array.map(paramstring => {
        let keyval = paramstring.split("=")
        return { key: keyval[0], value: keyval[1] || "", description: "" }
      }));
    }
    else
      setParams([])
    if (request.method === "GET" && currentTab === 3)
      setCurrentTab(0)
  }, [request])

  return (
    <div id='request-editor-container'>
      <div id='request-editor-tabs-container'>
        <button onClick={() => setCurrentTab(0)} style={{ color: getColor(0), borderBottom: getBorderColor(0) }} className='request-editor-tabs'>Config</button>
        <button onClick={() => setCurrentTab(1)} style={{ color: getColor(1), borderBottom: getBorderColor(1) }} className='request-editor-tabs'>Params</button>
        <button onClick={() => setCurrentTab(2)} style={{ color: getColor(2), borderBottom: getBorderColor(2) }} className='request-editor-tabs'>Headers</button>
        {
          request.method !== "GET" &&
          <button onClick={() => setCurrentTab(3)} style={{ color: getColor(3), borderBottom: getBorderColor(3) }} className='request-editor-tabs'>Body</button>
        }
      </div>
      <div style={{ height: "100%", overflowY: "auto" }}>
        {
          currentTab === 0 ? <RequestConfigs request={request} onchange={onchange} /> :
            currentTab === 1 ? <RequestParams params={params} onchange={setparams} onDelete={deleteField} onAdd={addField} /> :
              currentTab === 2 ? <RequestHeaders request={request} onchange={onchange} /> :
                currentTab === 3 ? <RequestBody request={request} onchange={onchange} /> : <></>
        }
      </div>
    </div>
  );
}
export default RequestEditor;