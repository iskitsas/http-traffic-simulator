import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { StateContext } from '../../../store';
import './style.css'
const Response = () => {
  const { openedDocuments, currentDocument } = useContext(StateContext)
  const [response, setResponse] = useState("")
  useEffect(() => {
    if (currentDocument.response) {
      if (currentDocument.response.counters) {
        setResponse(currentDocument.response.counters[200])
      } else {
        setResponse(currentDocument.response)
      }
    }else{
      setResponse("")
    }
  }, [currentDocument])
  return (
    <div style={{ flexGrow: 1, width: "75vw", minHeight: "3vh", bottom: 0 }}>
      <p style={{ userSelect: "none", margin: "0px" }}>Response</p>
      <p style={{ userSelect: "none", margin: "0px" }}>{response}</p>
    </div>
  );
}
export default Response;


