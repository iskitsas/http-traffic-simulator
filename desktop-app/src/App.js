import { useState } from "react";
import './App.css'
const { ipcRenderer } = window.require("electron");

const App = () => {
  const [testResult, setTestResult] = useState([null]);
  const [testStarted, setTestStarted] = useState(false)
  const runSimpleTest = () => {
    setTestResult([])
    setTestStarted(true)
    ipcRenderer.send("run:simpleTest")
  }

  const closeApp = () => {
    console.log("calling quit...")
    ipcRenderer.send("app:quit")
  }

  ipcRenderer.on('result', (event, args) => {
    setTestStarted(false)
    let resultArray = [];

    var cArr = Object.keys(args.counters);

    for (var i = 0; i < cArr.length; i++) {
      var key = cArr[i];
      resultArray.push({ status: key, count: args.counters[key] })
    }

    setTestResult(resultArray)
  })
  return (
    <div >
      <div id="app-header">
        <h1 style={{ textAlign: 'center', fontFamily: "monospace", fontSize: 35 }}>Flexbench</h1>
        <button id="closeBtn" onClick={closeApp} >X</button>
      </div>
      <div id="app-body">
        <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>Click below to 🚀 simple http traffic simulator </p>
        <button
          onClick={runSimpleTest}
          style={{
            backgroundColor: "purple",
            width: "260px", height: "60px",
            borderRadius: "5px", color: "#ffffff",
            fontSize: "23px", border: "none",
            cursor: "pointer"
          }}>Run</button>
        {
          testResult[0] !== null &&
          <div style={{ marginTop: "30px", border: "2px solid black", borderRadius: "5px", padding: "0px 10px" }}>
            <h2 style={{ fontFamily: "sans-serif" }}>Traffic simulator Result</h2>
            <hr />
            {
              testStarted && <p>running test...</p>
            }
            {
              testResult.map(el => <p key={el.status}>counter {el.status}: {el.count}</p>)
            }
          </div>
        }
      </div>
    </div >
  );
}
export default App;