import './result.css'
import { StateContext } from '../../../store'
import { useContext, useEffect, useState } from 'react'
// import SampleDashboard from './SampleDashboard'
const Result = ({ response }) => {
  const { scenarios, currentDocument } = useContext(StateContext)
  const [path, setPath] = useState("")
  const [port, setPort] = useState("")
  const [delay, setDelay] = useState("")
  const [throttling, setThrottling] = useState(0)
  const [workers, setWorkers] = useState(0)
  const [clients, setClients] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [host, setHost] = useState("")
  const getBG = (status) => {
    if (status >= 500)
      return "orange"
    else if (status >= 400)
      return "red"
    else if (status >= 300)
      return "blue"
    else if (status >= 200)
      return "green"
    else return "violet"
  }

  useEffect(() => {
    //setting duration
    let scenario;
    if (currentDocument.duration)
      setTotalSeconds(currentDocument.duration)
    else {
      try {
        scenario = scenarios.filter((sce) => sce._id === currentDocument.scenarioId)[0]
        setTotalSeconds(scenario.duration)
      } catch (error) {

      }
    }

    //setting port
    if(currentDocument.port)
      setPort(`:${currentDocument.port}`)
    else
      setPort("")

    //setting path
    if (currentDocument.path)
      setPath(currentDocument.path)

    //setting host 
    if (currentDocument.host)
      setHost(currentDocument.host)
    else
      setHost("every host inside this scenario ")

    //setting workers
    if (currentDocument.workers)
      setWorkers(currentDocument.workers)
    else
      setWorkers(scenario.workers)

    //setting totalclients
    if (currentDocument.totalclients)
      setClients(currentDocument.totalclients)
    else
      setClients(scenario.totalclients)

    //setting throttling
    if (currentDocument.throttling)
      setThrottling(currentDocument.throttling)
    else
      setThrottling(scenario.throttling)

    //setting delay
    if (currentDocument.delay)
      setDelay(currentDocument.delay)
    else
      setDelay(scenario.delay)
  }, [currentDocument])

  return (
    <div className="result-tab-container">
      <p style={{ margin: "0.5vh 0px", fontFamily: "sans-serif", fontSize: "1.1vw" }}>Flexbench requested
        <span style={{ fontWeight: "bold", color: "#00dcff" }}> {host}{port}</span>
        {currentDocument.path ?
          <span style={{ color: "#00dcff" }}>{path} </span> :
          ""}for <span style={{ color: "#00dcff" }}>{totalSeconds}</span> seconds
      </p>

      <p style={{ margin: "0.5vh 0px", fontFamily: "sans-serif", fontSize: "1.1vw" }}>
        Total workers used : <span style={{ fontWeight: "bold", color: "#00dcff" }}>{workers} </span>
      </p>

      <p style={{ margin: "0.5vh 0px", fontFamily: "sans-serif", fontSize: "1.1vw" }}>
        Total clients used: <span style={{ fontWeight: "bold", color: "#00dcff" }}>{clients}</span>
      </p>

      <p style={{ margin: "0.5vh 0px", fontFamily: "sans-serif", fontSize: "1.1vw" }}>
        Random delay between each requests: <span style={{ fontWeight: "bold", color: "#00dcff" }}>{delay}</span> seconds
      </p>
      <p style={{ margin: "0.5vh 0px", fontFamily: "sans-serif", fontSize: "1.1vw" }}>
        Request throttle for: <span style={{ fontWeight: "bold", color: "#00dcff" }}>{throttling} bps</span></p>
      <br />
      <hr style={{ width: "99%", backgroundColor: "#ffffff" }} />
      <p style={{ margin: "0.5vh 0px", fontFamily: "sans-serif", fontSize: "1.1vw" }}>Using the above configurations flexbench got</p>

      <p style={{ margin: "0.5vh 0px", fontFamily: "sans-serif", fontSize: "1.1vw" }}>HTTP status code: </p>
      {
        response?.response?.map(res =>
          <div className='response-count' key={res.status}
            style={{ backgroundColor: getBG(res.status) }}>
            <p>{res.status}: {res.count} times</p>
          </div>
        )
      }
      {/* <iframe
        src="https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4"
        width="650" height="300" frameborder="0">
      </iframe> */}
      {/* <SampleDashboard /> */}
    </div>
  );
}
export default Result;