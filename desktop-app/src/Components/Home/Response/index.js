import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../store';
import './style.css'
const Response = () => {
  const { currentDocument, responses } = useContext(StateContext)
  const [response, setResponse] = useState({})

  useEffect(() => {
    let currentResponse = responses.filter(doc => doc._id === currentDocument._id)[0]
    if (currentResponse?.response?.counters) {
      let array = Object.keys(currentResponse.response.counters)
      let resultArray=[];
      array.forEach(element => {
        resultArray.push({status:element,count:currentResponse.response.counters[element]})
      });
      setResponse({ ...currentResponse, response: resultArray })
    } else
      setResponse({ ...currentResponse, response: [] })
  }, [responses, currentDocument])

  return (
    <div style={{ flexGrow: 1, width: "100%", minHeight: "3vh", bottom: 0, padding: "0px 10px",overflow:"hidden" }}>
      <p style={{ userSelect: "none", margin: "0px" }}>Response</p>
      {
        response?.running && <p>running...</p>
      }
      {
        response?.response?.map(res => <p key={res.status}>counter {res.status}: {res.count}</p>)
      }
    </div>
  );
}
export default Response;


