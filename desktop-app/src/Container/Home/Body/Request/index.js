import './style.css'
import RequestEditor from './RequestEditor';
import { useEffect, useState } from 'react';
const Request = () => {
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
    <div style={{ height: "60vh", width: "75vw" }}>
      <div style={{ height: "5vh", width: "75vw" }}>
        open requests
      </div>
      <div style={{ borderTop: "1px solid black", flexDirection: "column", borderBottom: "1px solid black", marginBottom: 5, flexGrow: 1, display: "flex", height: "54.5vh" }}>
        <div style={{ marginTop: "5px", padding: "0px 5px", height: "3.5vh", display: "flex", borderBottom: "1px solid black", width: "100%", paddingBottom: 5, alignItems: "center" }}>
          <select style={{
            fontSize: "1.1vw",
            textAlign: "center", borderRadius: "5px 0px 0px 5px",
            height: "100%", outline: "none"
          }}>
            <option className="options" style={{ backgroundColor: "gray", color: "#000000" }}>GET</option>
            <option className="options" style={{ backgroundColor: "gray", color: "#000000" }}>POST</option>
            <option className="options" style={{ backgroundColor: "gray", color: "#000000" }}>PUT</option>
            <option className="options" style={{ backgroundColor: "gray", color: "#000000" }}>PATCH</option>
            <option className="options" style={{ backgroundColor: "gray", color: "#000000" }}>DELETE</option>
          </select>
          <input placeholder="http://example.com" paramString={paramString} value={combinedString} onChange={onRequestUrlChange} style={{ outline: "none", width: "70%", height: "80%" }} />
          <button style={{ outline: "none", height: "100%", width: "5vw" }}>Run</button>
        </div>
        <RequestEditor url={combinedString} onParamsChange={paramsChange} />
      </div>
    </div>
  );
}
export default Request;