import { useContext, useEffect, useState } from 'react';
import editMenu from '../../../../assets/images/editMenu.svg'
import { ACTION } from '../../../../constants';
import { getScenarios, updateScenario } from '../../../../renderer-process/Scenario/scenario.renderer';
import { StateContext } from '../../../../store';
import InvalidRequest from '../RequestRunner/InvalidRequest';

const ScenarioLeft = ({ Ref, requestss, onRun }) => {
  const { currentDocument, dispatch, unsavedChanges, currentProject } = useContext(StateContext)
  const [scenarioConfigs, setScenarioConfigs] = useState({})
  const [showSave, setShowSave] = useState(false)
  const [showInvalid, setShowInvalid] = useState(false)
  const [invalidreq, setInvalidReq] = useState({})

  const checkbeforerun = () => {
    const check = requestss.filter(request => {
      if (request.path && request.port && request.host && request.method) {
      } else {
        if(!request.port&&request.protocol)
          if(request.protocol.toString()==="https")
            request.port = 443
          else
            request.port = 80
        else
          return { isInvalid: true }
      }
    })
    setInvalidReq(check[0])
    if(check.length===0){
      onRun();
    }else{
      setShowInvalid(true)
    }
  }

  const setConfig = (e) => {
    setScenarioConfigs({ ...scenarioConfigs, [e?.target?.name]: e?.target?.value })
  }

  const saveupdates = async () => {
    await updateScenario(scenarioConfigs)
    const scenariosresp = await getScenarios(currentProject._id)
    dispatch(ACTION.SET_SCENARIOS, scenariosresp)
    dispatch(ACTION.SET_CURRENT_DOCUMENT, scenarioConfigs)
    dispatch(ACTION.UPDATE_OPEN_DOCUMENTS, scenarioConfigs)
  }

  useEffect(() => {
    dispatch(ACTION.UPDATE_UNSAVED_CHANGE, scenarioConfigs)
  }, [scenarioConfigs])

  useEffect(() => {
    if (scenarioConfigs._id !== currentDocument._id) {
      const newScenario = unsavedChanges.filter(doc => doc._id === currentDocument._id)[0]
      setScenarioConfigs(newScenario)
    }
  }, [currentDocument, unsavedChanges])

  useEffect(() => {
    if (JSON.stringify(scenarioConfigs) !== JSON.stringify(currentDocument))
      setShowSave(true)
    else
      setShowSave(false)
  }, [scenarioConfigs, currentDocument])

  return (
    <div ref={Ref} className='scenario-left-body'>
      <div style={{ display: "flex", paddingTop: "1vh", height: "4vh", width: "98%", justifyContent: "space-between" }}>
        <button style={{ userSelect: "none", color: "#ffffff", alignSelf: "center", border: "none", backgroundColor: "transparent", cursor: "pointer" }}>Config</button>
        <div style={{ display: "flex" }}>
          <button onClick={checkbeforerun} style={{ userSelect: "none", color: "#ffffff", borderRadius: "0.3vw", alignItems: "center", border: "none", backgroundColor: "#0e4fbe", cursor: "pointer" }}>Run</button>
          <button onClick={saveupdates} disabled={!showSave} style={{ userSelect: "none", color: "#ffffff", borderRadius: "0.3vw", marginLeft: "8px", alignItems: "center", border: "none", backgroundColor: showSave ? "#606670" : "#d2d2d247", cursor: showSave ? "pointer" : "not-allowed" }}>Save</button>
          {/* <button style={{ userSelect: "none", width: "2vw", height: "3vh", alignSelf: "center", border: "none", backgroundColor: "transparent", cursor: "pointer" }}>
            <img style={{ userSelect: "none", width: "2vw", height: "2vh" }} src={editMenu} />
          </button> */}
        </div>
      </div>
      <div>
        <div style={{ height: "90%", width: "100%" }}>
          <p id='requestparam-title'>Scenario configs</p>
          <div>
            <div className='request-param-label-box'>
              <p className='request-param-label'>KEY</p>
              <p className='request-param-label'>VALUE</p>
              <p className='request-param-label'>DESCRIPTION</p>
            </div>
            {
              Object.keys(scenarioConfigs).map(config => {
                if (config !== "_id" && config !== "projectId")
                  return <div key={config} className='params-box'>
                    <div className='request-key-value-input-wrapper'>
                      <input className="request-key-value-input" value={config} disabled={true} placeholder="Key" />
                    </div>
                    <div className='request-key-value-input-wrapper'>
                      <input className="request-key-value-input" value={scenarioConfigs[config]} name={config} onChange={setConfig} placeholder="Value" />
                    </div>
                    <div className='request-key-value-input-wrapper'>
                      <input className="request-key-value-input" defaultValue="" placeholder="Description" />
                    </div>
                  </div>
              }
              )}
          </div>
        </div>
      </div>
      {
        showInvalid &&
        <InvalidRequest onClose={() => setShowInvalid(false)} request={invalidreq} />
      }
    </div>
  );
}
export default ScenarioLeft;