import React, { useContext, useEffect, useState } from 'react';
import { ACTION } from '../../../constants';
import { endRequest } from '../../../renderer-process/Request/request.renderer';
import { StateContext } from '../../../store';
import Animation from './Animation';
import CancleRequest from './CancleRequest';
import pretty from "pretty"
import './style.css'
import Logs from './Logs';
const Response = () => {
  const { currentDocument, responses, dispatch } = useContext(StateContext)
  const [response, setResponse] = useState({})
  const [tab, changeTab] = useState(1);
  const [logs, setLogs] = useState([]);
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

  const splitLogs = (string) => {
    if (string) {
      const responses = string.split("<=res=>")
      responses.pop()
      setLogs(responses)
    }
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
      splitLogs(currentResponse.response?.logs)
    } else {
      setResponse({ ...currentResponse, response: [] })
      setLogs([])
    }
  }, [responses, currentDocument])

  return (
    <div className='response-body-container'>
      <div className='res-body-wrap'>
        <p className='title'>Response</p>
        <button className='tab-btn' style={{ borderBottomColor: !tab ? "#0e4fbe" : "transparent" }} onClick={() => changeTab(0)}>Logs</button>
        <button className='tab-btn' style={{ borderBottomColor: tab ? "#0e4fbe" : "transparent" }} onClick={() => changeTab(1)}>Result</button>
        {
          response?.running &&
          <div className='anim-div'>
            <Animation />
            <CancleRequest endReq={canclerequest} />
          </div>
        }
        {
          response?.error && <p>{response.error}</p>
        }
        {
          tab === 1 ? response?.response?.length > 0 && <>
            <p style={{ fontSize: "1.5vw" }}>HTTP status code responses: </p>
            {
              response?.response?.map(res =>
                <div className='response-count' key={res.status}
                  style={{ backgroundColor: getBG(res.status) }}>
                  <p>{res.status}: {res.count} times</p>
                </div>
              )
            }
          </> : <Logs logs={logs} />
        }
      </div>
    </div>
  );
}
export default Response;


