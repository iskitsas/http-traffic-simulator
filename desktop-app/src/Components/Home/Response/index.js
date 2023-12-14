import React, { useContext, useEffect, useState } from 'react';
import { ACTION } from '../../../constants';
import { endRequest } from '../../../renderer-process/Request/request.renderer';
import { StateContext } from '../../../store';
import Animation from './Animation';
import uparrow from "../../../assets/images/uparrow.png"
import downarrow from "../../../assets/images/downarrow.png"
import './style.css'
import Logs from './Logs';
import Result from './Result';
const Response = () => {
  const { currentDocument, responses, dispatch } = useContext(StateContext)
  const [response, setResponse] = useState({})
  const [tab, changeTab] = useState(1);
  const [logs, setLogs] = useState([]);
  const [drawerState, setDrawerState] = useState(false)

  const cancelrequest = () => {
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

  const toggleDrawer = () => {
    if (drawerState)
      document.getElementById("request-container-wrapper").style.height = `${(window.screen.height / 100) * 10}px`
    else
      document.getElementById("request-container-wrapper").style.height = `${(window.screen.height / 100) * 97}px`
    setDrawerState(prev => !prev)
  }

  const getColor = (thistab) => {
    if (thistab === tab)
      return "#ffffff"
    else
      return "#747474"
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
    <div id='response-container'>
      <div id='response-dynamic-container'>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <p className='title'>Response</p>
          <button id='logs-pull-up-donw-btn' title={drawerState ? 'open drawer' : "close drawer"} onClick={toggleDrawer}>
            <img src={drawerState ? uparrow : downarrow} />
          </button>
        </div>
        <button className='tab-btn' style={{ borderBottomColor: !tab ? "#0e4fbe" : "transparent",color:getColor(0) }} onClick={() => changeTab(0)}>Logs</button>
        <button className='tab-btn' style={{ borderBottomColor: tab ? "#0e4fbe" : "transparent",color:getColor(1) }} onClick={() => changeTab(1)}>Result</button>
        {
          response?.running &&
          <Animation endReq={cancelrequest} />
        }
        {
          response?.error && <p>{response.error}</p>
        }
        {
          tab === 1 ? response?.response?.length > 0 && <Result response={response} /> : <Logs logs={logs} />
        }
      </div>
    </div>
  );
}
export default Response;


