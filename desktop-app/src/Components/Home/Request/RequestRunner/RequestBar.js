import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../../../store";

const RequestBar = ({ url, currentRequest, onchange, run }) => {
  const { currentDocument } = useContext(StateContext)
  const [requestUrl, setRequestUrl] = useState("")
  const [requestmethod, setMethod] = useState("")
  const [showSaveBtn, setSaveBtn] = useState(false)

  const requestConfigChange = (e) => {
    if (e.target.name === "url") {
      onchange(e.target.value);
      setRequestUrl(e.target.value)
    }
    else
      setMethod(e.target.value)
  }

  useEffect(() => {
    if (JSON.stringify(currentRequest) !== JSON.stringify(currentDocument)) {
      setSaveBtn(true)
    } else {
      setSaveBtn(false)
    }
  }, [currentDocument, currentRequest])

  useEffect(() => {
    setRequestUrl(url || "")
    setMethod(currentRequest.method || "")
  }, [currentRequest, url])

  return (
    <div id='request-container-header'>
      <div id='request-url-container'>
        <select name="method" value={requestmethod} onChange={requestConfigChange} id='request-method-select'>
          <option value="GET" >GET</option>
          <option value="POST" >POST</option>
          <option value="PUT" >PUT</option>
          <option value="PATCH" >PATCH</option>
          <option value="DELETE" >DELETE</option>
        </select>
        <input name="url" id='request-url-input' placeholder="http://example.com"
          value={requestUrl} onChange={requestConfigChange} />
      </div>
      <button onClick={run} id='request-run-btn'>Run</button>
      <button disabled={showSaveBtn} onClick={() => { }} id='request-save-btn' style={{ backgroundColor: showSaveBtn ? "#636d77" : "#aebac5", cursor: showSaveBtn ? "pointer" : "not-allowed" }} >Save</button>
    </div>
  );
}
export default RequestBar;