import { useEffect, useState } from 'react';

import './requesteditor.css'

import RequestBody from './RequestBody';
import RequestParams from './RequestParams';
import RequestHeaders from './RequestHeaders';
import RequestConfigs from './RequestConfigs';

const RequestEditor = ({ url = "", onchange, request }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [paramsFromString, setParamsFromString] = useState([])
  const [pathPort, setPathPort] = useState([])
  const [params, setParams] = useState([{ key: "", value: "", description: "" }])
  const [headers, setHeaders] = useState([{ key: "", value: "", description: "" }])
  const [bodyData, setBodyData] = useState([{ key: "", value: "", description: "" }])

  const addMoreParams = () => {
    setParams([...params, { key: "", value: "", description: "" }])
  }

  const deleteParams = (indexToDelete) => {
    setParams(params.filter((param, index) => index !== indexToDelete))
  }

  const setRequestParams = (name, value, updateIndex) => {
    setParams(
      params.map((param, index) => {
        return index === updateIndex ? { ...param, [name]: value } : param;
      })
    );
  }

  const setRequestHeaders = (name, value) => {

  }

  const setRequestBody = (name, value) => {

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

  useEffect(() => {
    onchange("params", params)
  }, [params])

  useEffect(() => {

    let [urlpathport, splittedParamsArray] = url.split('?')//spliting params from the url

    let [urll, ...pathsandport] = urlpathport?.split('/');//spliting port and path from filtered url

    let paramsarray = splittedParamsArray?.split("&") || [];//making array of params

    let newParam = paramsarray.map((param, index) => {
      let splitobj = param.split("=");//spliting key and value from param string
      return { key: splitobj[0] || "", value: splitobj[1] || "", description: params[index]?.description || "" }
    })

    if (newParam.length) {
      setParamsFromString(newParam)
    }
    setPathPort(pathsandport)
  }, [url])

  useEffect(() => {
    let iterator = params
    if (params.length < paramsFromString.length)
      iterator = paramsFromString
    setParams(
      iterator.map((param, index) => {
        return paramsFromString[index] ? paramsFromString[index] : param;
      })
    )
  }, [paramsFromString])

  return (
    <div id='request-editor-container'>
      <div id='request-editor-tabs-container'>
        <button onClick={() => setCurrentTab(3)} style={{ color: getColor(3), borderBottom: getBorderColor(3) }} className='request-editor-tabs'>Config</button>
        <button onClick={() => setCurrentTab(0)} style={{ color: getColor(0), borderBottom: getBorderColor(0) }} className='request-editor-tabs'>Params</button>
        {/* <button onClick={() => setCurrentTab(1)} style={{ color: getColor(1), borderBottom: getBorderColor(1) }} className='request-editor-tabs'>Headers</button> */}
        <button onClick={() => setCurrentTab(2)} style={{ color: getColor(2), borderBottom: getBorderColor(2) }} className='request-editor-tabs'>Body</button>
      </div>
      <div style={{ height: "100%", overflowY: "auto" }}>
        {
          currentTab === 0 ? <RequestParams params={params} onChange={setRequestParams} onDelete={deleteParams} onAdd={addMoreParams} /> :
            currentTab === 1 ? <RequestHeaders headers={headers} onChange={setRequestHeaders} /> :
              currentTab === 2 ? <RequestBody bodyData={bodyData} onChange={setRequestBody} /> :
                currentTab === 3 ? <RequestConfigs request={request} pathPort={pathPort} onChange={onchange} /> : <></>
        }
      </div>
    </div>
  );
}
export default RequestEditor;