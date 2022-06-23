import { useEffect, useState } from 'react';
import './requesteditor.css'
import RequestBody from './RequestBody';
import RequestParams from './RequestParams';
import RequestHeaders from './RequestHeaders';
const RequestEditor = ({ url = "", onParamsChange }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [paramsFromString,setParamsFromString]=useState([])
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
  useEffect(() => {
    onParamsChange(params)
  }, [params])

  useEffect(() => {
    let paramsarray = url.split("?")[1]?.split("&") || []
    let newParam = paramsarray.map((param, index) => {
      let splitobj = param.split("=")
      return { key: splitobj[0] || "", value: splitobj[1] || "", description: params[index]?.description || "" }
    })
    if (newParam.length){
      setParamsFromString(newParam)
      // setParams(newParam)
    }
  }, [url])

  useEffect(()=>{
    setParams(
      params.map((param, index) => {
        return paramsFromString[index] ? paramsFromString[index] : param;
      })
    )
  },[paramsFromString])

  return (
    <div style={{ width: "100%", height: "auto", minHeight: "5vh", flexGrow: 1 }}>
      <div style={{ height: "6%" }}>
        <button onClick={() => setCurrentTab(0)} className='request-editor-tabs'>Params</button>
        <button onClick={() => setCurrentTab(1)} className='request-editor-tabs'>Headers</button>
        <button onClick={() => setCurrentTab(2)} className='request-editor-tabs'>Body</button>
      </div>
      {
        currentTab === 0 ? <RequestParams params={params} onChange={setRequestParams} onDelete={deleteParams} onAdd={addMoreParams} /> :
          currentTab === 1 ? <RequestHeaders headers={headers} onChange={setRequestHeaders} /> :
            currentTab === 2 ? <RequestBody body={body} onChange={setRequestBody} /> : <></>
      }
    </div>
  );
}
export default RequestEditor;