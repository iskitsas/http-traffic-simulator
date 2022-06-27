import { useEffect, useState } from 'react';
import './requesteditor.css'
import RequestBody from './RequestBody';
import RequestParams from './RequestParams';
import RequestHeaders from './RequestHeaders';
import RequestScenarioConfig from './RequestScenarioConfig';
const RequestEditor = ({ url = "", onParamsChange }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [paramsFromString, setParamsFromString] = useState([])
  const [params, setParams] = useState([{
    key: "",
    value: "",
    description: ""
  }])
  const [headers, setHeaders] = useState([{
    key: "",
    value: "",
    description: ""
  }])
  const [body, setBody] = useState({})

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
    onParamsChange(params)
  }, [params])

  useEffect(() => {
    let paramsarray = url.split("?")[1]?.split("&") || []
    let newParam = paramsarray.map((param, index) => {
      let splitobj = param.split("=")
      return { key: splitobj[0] || "", value: splitobj[1] || "", description: params[index]?.description || "" }
    })
    if (newParam.length) {
      setParamsFromString(newParam)
      // setParams(newParam)
    }
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
        <button onClick={() => setCurrentTab(0)} style={{ color: getColor(0), borderBottom: getBorderColor(0) }} className='request-editor-tabs'>Params</button>
        <button onClick={() => setCurrentTab(1)} style={{ color: getColor(1), borderBottom: getBorderColor(1) }} className='request-editor-tabs'>Headers</button>
        <button onClick={() => setCurrentTab(2)} style={{ color: getColor(2), borderBottom: getBorderColor(2) }} className='request-editor-tabs'>Body</button>
        <button onClick={() => setCurrentTab(3)} style={{ color: getColor(3), borderBottom: getBorderColor(3) }} className='request-editor-tabs'>Config</button>
      </div>
      {
        currentTab === 0 ? <RequestParams params={params} onChange={setRequestParams} onDelete={deleteParams} onAdd={addMoreParams} /> :
          currentTab === 1 ? <RequestHeaders headers={headers} onChange={setRequestHeaders} /> :
            currentTab === 2 ? <RequestBody body={body} onChange={setRequestBody} /> :
              currentTab === 3 ? <RequestScenarioConfig body={body} onChange={setRequestBody} /> : <></>
      }
    </div>
  );
}
export default RequestEditor;