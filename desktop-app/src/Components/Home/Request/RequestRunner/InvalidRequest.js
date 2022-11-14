import { useEffect, useState } from "react";

const InvalidRequest = ({ onClose, request, scenario={} }) => {
  const [message, setMessage] = useState("")
  useEffect(() => {
    if (!request.port) 
      setMessage("Port number should not be empty!")
     else if (!request.path) 
      setMessage("Path should not be empty!")
     else if (!request.host) 
      setMessage("Host should not be empty!")
     else if (!request.method) 
      setMessage("Method should not be empty!")
     else if (!scenario.duration) 
      setMessage("Duration should not be empty!")
     else if (!scenario.workers) 
      setMessage("Workers should not be empty!")
     else if (!scenario.totalclients) 
      setMessage("Clients should not be empty!")
     else if (!scenario.throttling) 
      setMessage("Throttling should not be empty!")
     else if (!scenario.delay) 
      setMessage("Delay should not be empty!")
    
  }, [])
  return (
    <div className="delete-modal">
      <div className='delete-modal-form'>
        <p>{message}</p>
        <button onClick={onClose} style={{ cursor: "pointer", backgroundColor: "gray", width: "10vw", border: "none", height: "3.5vh", borderRadius: "0.3vw", color: "#ffffff", alignSelf: "center" }} >ok</button>
      </div>
    </div>
  );
}

export default InvalidRequest;