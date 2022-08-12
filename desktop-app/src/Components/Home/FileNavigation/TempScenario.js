//stylesheet
import './tempscenario.css'

//icons-images
import folderIcon from '../../../assets/images/folderIcon.png'
import arrowIcon from '../../../assets/images/arrowIcon.png'

//functions
import { useEffect, useState } from 'react'
import { getBg } from '../../../utils/helper'


const TempScenario = ({ scenario, currentDocument = {}, onChange }) => {
  const [scenarioName,setName] =useState("")
  const setscenarioname = (e) =>{
    setName(e.target.value)
    onChange(e.target.value)
  }
  return (
    <div className='sidebar-scenario-card-container'>
      <div className='sidebar-scenario-card card-hover'
        style={{
          backgroundColor: getBg(scenario._id, currentDocument._id),
          borderLeft: currentDocument._id === scenario._id ? "5px solid #0e4fbe" : "5px solid transparent"
        }}>
        <img className="fileCloseArrorw fileStateIcon" src={arrowIcon} />
        <img src={folderIcon} style={{ userSelect: "none", width: "2.0vw", height: "2.0vw", marginRight: "5px" }} />
        <input className='temp-scenario-input' onClick={(e)=>e.stopPropagation()} value={scenarioName} onChange={setscenarioname} autoFocus={true} />
      </div>
    </div>
  );
}
export default TempScenario;