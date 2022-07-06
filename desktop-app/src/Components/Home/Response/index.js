import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../store';
import './style.css'
const Response = () => {
  const { currentDocument, responses } = useContext(StateContext)
  const [response, setResponse] = useState("")

  useEffect(() => {
    let currentResponse = responses.filter(doc => doc._id === currentDocument._id)[0]
    if (!currentResponse?.running && currentResponse?.response) {
      if (currentResponse.response.counters) {
        setResponse(currentResponse.response.counters[200])
      } else {
        setResponse(currentResponse.response)
      }
    } else if (currentResponse?.running) {
      setResponse("running...")
    } else {
      setResponse("")
    }
  }, [responses, currentDocument])
  
  return (
    <div style={{ flexGrow: 1, width: "100%", minHeight: "3vh", bottom: 0, padding: "0px 10px" }}>
      <p style={{ userSelect: "none", margin: "0px" }}>Response</p>
      <p style={{ userSelect: "none", margin: "0px" }}>{response}</p>
    </div>
  );
}
export default Response;


