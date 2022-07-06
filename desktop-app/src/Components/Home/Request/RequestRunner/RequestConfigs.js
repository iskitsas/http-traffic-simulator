import { useEffect, useState } from "react";

const RequestConfigs = ({ request, pathPort = [], onChange }) => {
  const [path, setPath] = useState("")
  const [port, setPort] = useState("")

  const setConfig = (e) => {
    switch (e.target.name) {
      case 'port':
        setPort(e.target.value)
        onChange("config", { port: e.target.value, path: path })
        break;
      default:
        setPath(e.target.value)
        onChange("config", { port: port, path: e.target.value })
        break;
    }
  }

  useEffect(() => {
    let newpath = `/${pathPort.join('/')}`
    console.log(request.path)
    console.log(path)
    if (path !== request.path)
      setPath(newpath)
    if (request.port !== port)
      setPort(request.port)
  }, [pathPort, request])

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
            <input className="request-key-value-input" value={port} name="port" onChange={setConfig} placeholder="Value" />
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