import { useState } from "react"
import LogDataTable from "./LogDataTable"
import opennewwindow from "../../../assets/images/opennewwindow.png"
import "./logs.css"
const Logs = ({ logs }) => {
  const [mode, setMode] = useState(false)
  const switchMode = () => {
    setMode(prev => !prev)
  }

  const styles = {
    modal: {
      top: "1vh", left: "1vw", backgroundColor: "#1b1b1b",
      border: "1px solid white", position: "fixed", width: "98vw", height: "96vh",
      borderRadius: "1vw", padding: "1vh 0vw", overflow: "hidden",
      display: "flex", flexDirection: "column"
    },
    table: {
    }
  }

  return (
    <div id="logs-wrapper-div" style={mode ? styles.modal : styles.table}>
      {
        mode ? <button id="close-logs-model-btn" onClick={switchMode} >X</button> :
          <>
            <button id="open-logs-model-btn" title="Open in a new window" onClick={switchMode}><img style={{ width: "1.2vw", objectFit: "contain" }} src={opennewwindow} /></button>
          </>
      }
      <LogDataTable logs={logs} />
    </div>
  );
}

export default Logs;