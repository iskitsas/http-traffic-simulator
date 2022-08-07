import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../store';
import Animation from './Animation';
import './style.css'
const Response = () => {
  const { currentDocument, responses } = useContext(StateContext)
  const [response, setResponse] = useState({})
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
    let currentResponse = responses.filter(doc => doc._id === currentDocument._id)[0]
    if (currentResponse?.response?.counters) {
      let array = Object.keys(currentResponse.response.counters)
      let resultArray = [];
      array.forEach(element => {
        resultArray.push({ status: element, count: currentResponse.response.counters[element] })
      });
      setResponse({ ...currentResponse, response: resultArray })
    } else
      setResponse({ ...currentResponse, response: [] })
  }, [responses, currentDocument])
  return (
    <div style={{ width: "75vw", flexGrow: 1, minHeight: "3vh", position: "relative", overflow: "hidden" }}>
      <p style={{ userSelect: "none", margin: "0px", color: "#989898", paddingLeft: "1vw" }}>Response</p>
      <div style={{ overflowY: "auto", height: "100%", width: "100%",paddingLeft: "1vw"  }}>
        {
          response?.running && <Animation />
        }
        {
          response?.error && <p>{response.error}</p>
        }
        {
          response?.response?.length > 0 && <>
            <p style={{ fontSize: "1.5vw" }}>HTTP status code responses: </p>
            {response?.response?.map(res => <div key={res.status} style={{ fontSize: "1.3vw", display: "flex", alignItems: "center", justifyContent: "flex-start",paddingLeft:"2vw", width: "20%", height: "5vh", textAlign: "center", backgroundColor: getBG(res.status) }}>{res.status}: {res.count} times</div>)}
          </>
        }
      </div>
    </div>
  );
}
export default Response;


