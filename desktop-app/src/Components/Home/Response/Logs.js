import { useState } from "react"
import LogDataTable from "./LogDataTable"
import opennewwindow from "../../../assets/images/opennewwindow.png"
import "./logs.css"
const LogsTable = ({ logs }) => {
  const [mode, setMode] = useState(false)
  const switchMode = () => {
    setMode(prev => !prev)
  }

  const styles = {
    modal: {
      top: "1vh", left: "1vw", backgroundColor: "#1b1b1b",
      border: "1px solid white", position: "fixed", width: "98vw", height: "96vh",
      borderRadius: "1vw", padding: "1vh 0vw", overflow: "hidden"
    },
    table: {
      // padding: "1vh"
    }
  }

  return (
    <div id="logs-wrapper-div" style={mode ? styles.modal : styles.table}>
      {
        mode ? <button onClick={switchMode} style={{ margin: "1vw", cursor: "pointer", right: "2vw" }}>Close</button> :
          <>
            <button title="Open in a new window" onClick={switchMode} style={{
              margin: "1vw", padding: "0.2vw", borderRadius: "0.5vw",
              cursor: "pointer", backgroundColor: "gray", alignSelf: "flex-end",
              color: "#ffffff", alignItems: "center", display: "flex", position: "absolute", top: 0, right: 10
            }}><img style={{ width: "1.2vw", objectFit: "contain" }} src={opennewwindow} /></button>

          </>
      }
      <LogDataTable logs={logs} />
    </div>
  );
}

export default LogsTable;