import React, { useContext, useEffect, useState } from 'react';
import { ACTION } from '../../../constants';
import { endRequest } from '../../../renderer-process/Request/request.renderer';
import { StateContext } from '../../../store';
import Animation from './Animation';
import CancleRequest from './CancleRequest';
import './style.css'
const Response = () => {
  const { currentDocument, responses, dispatch } = useContext(StateContext)
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

  const canclerequest = () => {
    dispatch(ACTION.SET_RESPONSE, { running: false, response: {}, _id: response._id });
    endRequest(currentDocument._id)
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
      {
        response?.running &&
        <div style={{ overflowY: "auto", height: "100%", width: "100%", paddingLeft: "1vw" }}>
          <Animation />
          <CancleRequest endReq={canclerequest} />
        </div>
      }
      {
        response?.error && <p>{response.error}</p>
      }
      {
        response?.response?.length > 0 && <>
          <p style={{ fontSize: "1.5vw" }}>HTTP status code responses: </p>
          {response?.response?.map(res => <div key={res.status} style={{ fontSize: "1.3vw", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "2vw", width: "20%", height: "5vh", textAlign: "center", backgroundColor: getBG(res.status) }}>{res.status}: {res.count} times</div>)}
        </>
      }
    </div>
  );
}
export default Response;


