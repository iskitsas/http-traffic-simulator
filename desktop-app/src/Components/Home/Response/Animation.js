import server from '../../../assets/images/server.png'
import monitor from '../../../assets/images/monitor.png'
import { useEffect } from 'react'
import { useState } from 'react'
import './animation.css'
const Animation = () => {
  const [marginvalue, setmarginvalue] = useState(-20)
  const [showconnection, setconnection] = useState(false)
  const runanimate = () => {
    let marginval = -20
    const interval = setInterval(() => {
      if (marginval < 27) {
        setmarginvalue((pre) => pre + 3)
        marginval += 3
      }
      else {
        setmarginvalue(-20)
        marginval = -20
      }
    }, 50);
    return () => clearInterval(interval)
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      runanimate();
      setconnection(true)
    }, 4000);
    return () => clearTimeout(timeout);
  }, [])

  return (
    <div>
      <p>Establishing connection...</p>
      <div style={{marginTop:"5vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <div className='progress' aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
        <img src={monitor} style={{ height: "6vh", zIndex: "3" }} />
        <div style={{ height: "0.2vh", width: "30vw", backgroundColor: showconnection ? "#424242" : "transparent" }}></div>
        <div style={{ width: "5vw", height: "0.2vh", marginLeft: `${marginvalue}vw`, position: "absolute", backgroundColor: showconnection ? "blue" : "transparent" }}></div>
        <img className='response-server-icon' src={server} />
      </div>
    </div>
  );
}
export default Animation;