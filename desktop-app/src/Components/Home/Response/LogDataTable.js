import pretty from "pretty";
import { useEffect, useState } from "react";
const LogDataTable = ({ logs = [] }) => {
  const [loggs, setLoggs] = useState([])
  const [tab, setTab] = useState(0)
  const [currentLog, setCurrentLog] = useState(0)
  useEffect(() => {
    try {
      setLoggs(logs.map((log) => JSON.parse(log)))
    } catch (error) { }
  }, [logs])
  return (
    <div id="logs-table">
      <div id="logs-table-header">
        <p className="logs-table-left-tab log-left-p1">Response #</p>
        <p className="logs-table-left-tab log-left-p2">Status</p>
        <p className="logs-table-right-tab" onClick={() => setTab(0)} style={{ backgroundColor: tab === 0 ? "#0e4fbe" : "transparent" }}>Headers</p>
        <p className="logs-table-right-tab" onClick={() => setTab(1)} style={{ backgroundColor: tab === 1 ? "#0e4fbe" : "transparent" }}>Payload</p>
        <p className="logs-table-right-tab" onClick={() => setTab(2)} style={{ backgroundColor: tab === 2 ? "#0e4fbe" : "transparent" }}>Response</p>
      </div>
      <div id="logs-table-body">
        <div id="logs-left-side">
          {
            loggs.map((log, index) => {
              return (
                <div className="logs-row"
                  onClick={() => {
                    setCurrentLog(index)
                  }}
                  key={`logs-${index}`}
                  style={{ backgroundColor: currentLog === index ? "gray" : "" }}
                >
                  <p style={{ fontSize: "1vw", fontFamily: "sans-serif", margin: "0px", padding: "1px 3px", width: "70%", cursor: "pointer" }}>Response No. {index + 1}</p>
                  <p style={{ fontSize: "1vw", fontFamily: "sans-serif", margin: "0px", borderLeft: "1px solid gray", padding: "1px 3px", width: "30%", cursor: "pointer" }}>{log?.status}</p>
                </div>
              )
            }
            )
          }
        </div>
        <div id="logs-right-side" style={{ height: "100%", width: "80%" }}>
          {
            tab === 0 ? <div id="logs-headers" style={{
              width: "100%", display: "flex"
            }}>
              <pre contentEditable={false} style={{
                color: "#07e5f0", height: "100%",
                width: "100%", fontSize: "1.3vw"
              }} className='logs-p' >
                {loggs[currentLog]?.headers &&
                  Object.keys(loggs[currentLog]?.headers).map((key, index) => {
                    return <p key={`logs-request-headers${currentLog}${index}`} style={{ margin: "1px" }}>{key}:{loggs[currentLog]?.headers[key]}</p>
                  })
                }
              </pre>
            </div> :
              tab === 1 ? <div id="logs-payload" style={{
                width: "100%", display: "flex"
              }}>
                <pre contentEditable={false} style={{
                  color: "#07e5f0", height: "100%",
                  width: "100%", fontSize: "1.3vw"
                }} className='logs-p' >
                  {loggs[currentLog]?.payload &&
                    Object.keys(loggs[currentLog]?.payload).map((key, index) => {
                      return <p key={`logs-request-payload${currentLog}${index}`} style={{ margin: "1px" }}>{key}:{loggs[currentLog]?.payload[key]}</p>
                    })
                  }
                </pre>
              </div> :
                tab === 2 ? <div id="logs-response" style={{
                  width: "100%", display: "flex"
                }}>
                  <pre contentEditable={false} style={{
                    color: "#07e5f0", height: "100%",
                    width: "100%", fontSize: "1.3vw"
                  }} className='logs-p' >
                    {pretty(loggs[currentLog]?.log, { ocd: true })}
                  </pre>
                </div> : <></>
          }
        </div>
      </div>
    </div>
  )
}
export default LogDataTable;