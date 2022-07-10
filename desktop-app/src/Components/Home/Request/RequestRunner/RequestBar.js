import { useContext, useEffect, useState } from "react";
import { ACTION } from "../../../../constants";
import { updateRequest } from "../../../../renderer-process/Request/request.renderer";
import { StateContext } from "../../../../store";

const RequestBar = ({ request, onchange, onRun }) => {
  const { currentDocument, dispatch } = useContext(StateContext)
  const [Url, setUrl] = useState("")
  const [showSaveBtn, setSaveBtn] = useState(false)

  const checkBeforeRun = () => {
    if (request.path && request.port && request.host && request.method) {
      onRun()
    }else{
      console.log("in valid request")
    }
  }

  const parseUrl = (url) => {
    setUrl(url)
    const host = url?.split("/")[0]
    let array = url?.split("")
    let path = "";
    if (array.indexOf('/') !== -1) {
      path = array.splice(array.indexOf('/'), array.length - 1).join("")
    }
    onchange("url", { host: host, path: path })
    // let array = url.split(/^(([^@:\/\s]+):\/?)?\/?(([^@:\/\s]+)(:([^@:\/\s]+))?@)?([^@:\/\s]+)(:(\d+))?(((\/\w+)*\/)([\w\-\.]+[^#?\s]*)?(.*)?(#[\w\-]+)?)?$/)
  }

  const stateChange = (e) => {
    switch (e.target.name) {
      case "method":
        onchange("method", e.target.value)
        break;
      default:
        parseUrl(e.target.value)
        break;
    }
  }

  const saverequest =async () => {
    console.log("sending request")
    await updateRequest(request);
    dispatch(ACTION.SET_CURRENT_DOCUMENT,request)
  }

  useEffect(() => {
    if (JSON.stringify(request) !== JSON.stringify(currentDocument)) {
      setSaveBtn(true)
    } else {
      setSaveBtn(false)
    }
  }, [currentDocument, request])

  useEffect(() => {
    setUrl((request.host + request.path) || "")
  }, [request])

  return (
    <div id='request-container-header'>
      <div id='request-url-container'>
        <select name="method" value={request.method} onChange={stateChange} id='request-method-select'>
          <option value="GET" >GET</option>
          <option value="POST" >POST</option>
          <option value="PUT" >PUT</option>
          <option value="PATCH" >PATCH</option>
          <option value="DELETE" >DELETE</option>
        </select>
        <input name="url" id='request-url-input' placeholder="www.example.com"
          value={Url} onChange={stateChange} />
      </div>
      <button onClick={checkBeforeRun} id='request-run-btn'>Run</button>
      <button disabled={!showSaveBtn} onClick={saverequest} id='request-save-btn' style={{ backgroundColor: showSaveBtn ? "#636d77" : "#aebac5", cursor: showSaveBtn ? "pointer" : "not-allowed" }} >Save</button>
    </div>
  );
}
export default RequestBar;