import { useEffect, useState } from "react";

const RequestConfigs = ({ request, onchange }) => {
  const [requestName, setRequestName] = useState("")
  const [path, setPath] = useState("")
  const [port, setPort] = useState("")

  const setConfig = (e) => {
    switch (e.target.name) {
      case 'requestName':
        setRequestName(e.target.value)
        onchange("requestName", e.target.value)
        break;
      case 'port':
        setPort(e.target.value)
        onchange("port", e.target.value)
        break;
      default:
        setPath(e.target.value)
        onchange("path", e.target.value)
        break;
    }
  }

  useEffect(() => {
    setPort(request?.port || "")
    setRequestName(request.requestName || "")
    let array = request?.path?.split("");
    let index = array?.indexOf("?");
    let path = ""
    if (index !== -1) {
      array = array?.splice(0, index).join("");
      path = array;
    } else {
      path = request?.path;
    }
    setPath(path || "")
  }, [request])


  return (
    <div style={{ height: "90%", width: "100%" }}>
      <p id='requestparam-title'>Request configs</p>
      <div>
        <div className='request-param-label-box'>
          <p className='request-param-label'>KEY</p>
          <p className='request-param-label'>VALUE</p>
          <p className='request-param-label'>DESCRIPTION</p>
        </div>
        <div className='params-box'>
          <div className='request-key-value-input-wrapper'>
            <input className="request-key-value-input" value="Request name" disabled={true} placeholder="Key" />
          </div>
          <div className='request-key-value-input-wrapper'>
            <input className="request-key-value-input" value={requestName} name="requestName" onChange={setConfig} placeholder="Value" />
          </div>
          <div className='request-key-value-input-wrapper'>
            <input className="request-key-value-input" defaultValue="" placeholder="Description" />
          </div>
        </div>
        <div className='params-box'>
          <div className='request-key-value-input-wrapper'>
            <input className="request-key-value-input" value="Path" disabled={true} placeholder="Key" />
          </div>
          <div className='request-key-value-input-wrapper'>
            <input className="request-key-value-input" value={path} name="path" onChange={setConfig} placeholder="Value" />
          </div>
          <div className='request-key-value-input-wrapper'>
            <input className="request-key-value-input" defaultValue="" placeholder="Description" />
          </div>
        </div>
        <div className='params-box'>
          <div className='request-key-value-input-wrapper'>
            <input className="request-key-value-input" value="Port" disabled={true} placeholder="Key" />
          </div>
          <div className='request-key-value-input-wrapper'>
            <input type="number" min="0" className="request-key-value-input" value={port} name="port" onChange={setConfig} placeholder="Value" />
          </div>
          <div className='request-key-value-input-wrapper'>
            <input className="request-key-value-input" defaultValue="" placeholder="Description" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default RequestConfigs;