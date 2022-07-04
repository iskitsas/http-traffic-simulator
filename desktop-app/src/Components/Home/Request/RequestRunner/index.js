import RequestBar from "./RequestBar"
import RequestEditor from "./RequestEditor";

import './style.css'

const RequestRunner = ({ url, onParamChange, onRequestUrlChange, sendRequest }) => {
  return (
    <div id='request-container'>
      <RequestBar url={url} onChange={onRequestUrlChange} run={sendRequest} />
      <RequestEditor url={url} onParamsChange={onParamChange} />
    </div>
  )
}
export default RequestRunner;