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
    <div style={{ width: "100%", height: "100%", display: "flex", borderTop: "1px solid gray" }}>
      <div id="logs-left-side" style={{ width: "20%", height: "20%", borderTop: "1px solid gray", flexDirection: "column" }}>
        <div style={{ display: "flex", borderBottom: "1px solid gray", }}>
          <p style={{ padding: "2px 3px", margin: "0px", width: "70%" }}>Response #</p>
          <p style={{ padding: "2px 3px", margin: "0px", borderLeft: "1px solid gray", width: "30%" }}>Status</p>
        </div>
        <div style={{ height: "86%", width: "20%", position: "absolute", backgroundColor: "#1b1b1b", overflowX: "hidden", overflowY: "auto" }}>
          {
            loggs.map((log, index) => {
              return (
                <div className="logs-row"
                  onClick={() => {
                    setCurrentLog(index)
                  }}
                  key={`logs-${index}`}
                >
                  <p style={{ fontSize: "1vw", fontFamily: "sans-serif", margin: "0px", padding: "1px 3px", width: "70%", cursor: "pointer" }}>Response No. {index + 1}</p>
                  <p style={{ fontSize: "1vw", fontFamily: "sans-serif", margin: "0px", borderLeft: "1px solid gray", padding: "1px 3px", width: "30%", cursor: "pointer" }}>{log?.status}</p>
                </div>
              )
            }
            )
          }
        </div>
      </div>
      <div id="logs-right-side" style={{ width: "80%" }}>
        <div style={{ display: "flex", borderTop: "1px solid gray", borderLeft: "2px solid gray", borderBottom: "1px solid gray", }}>
          <p className="logs-header" onClick={() => setTab(0)} style={{ backgroundColor: tab === 0 ? "#0e4fbe" : "transparent" }}>Headers</p>
          <p className="logs-header" onClick={() => setTab(1)} style={{ backgroundColor: tab === 1 ? "#0e4fbe" : "transparent" }}>Payload</p>
          <p className="logs-header" onClick={() => setTab(2)} style={{ backgroundColor: tab === 2 ? "#0e4fbe" : "transparent" }}>Response</p>
        </div>
        <div style={{ height: "86%", position: "absolute", borderLeft: "2px solid gray", backgroundColor: "#1b1b1b", overflow: "auto", width: "80%" }}>
          {
            tab === 0 ? <div id="logs-headers" style={{
              width: "100%", display: "flex"
            }}>
              <pre contentEditable={false} style={{
                color: "#07e5f0",
                width: "100%", fontSize: "1.3vw"
              }} className='logs-p' >
                {loggs[currentLog]?.headers &&
                  Object.keys(loggs[currentLog]?.headers).map((key, index) => {
                    return <p style={{ margin: "1px" }}>{key}:{loggs[currentLog]?.headers[key]}</p>
                  })
                }
              </pre>
            </div> :
              tab === 1 ? <div id="logs-payload" style={{
                width: "100%", display: "flex"
              }}>
                <pre contentEditable={false} style={{
                  color: "#07e5f0",
                  width: "100%", fontSize: "1.3vw"
                }} className='logs-p' >
                  {loggs[currentLog]?.payload &&
                    Object.keys(loggs[currentLog]?.payload).map((key, index) => {
                      return <p style={{ margin: "1px" }}>{key}:{loggs[currentLog]?.payload[key]}</p>
                    })
                  }
                </pre>
              </div> :
                tab === 2 ? <div id="logs-response" style={{
                  width: "100%", display: "flex"
                }}>
                  <pre contentEditable={false} style={{
                    color: "#07e5f0",
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