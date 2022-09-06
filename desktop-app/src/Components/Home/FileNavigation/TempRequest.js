//style sheet
import './temprequest.css'

import requestIcon from '../../../assets/images/requestIcon.png'

import { useState } from 'react';
import { getBg, getColor } from '../../../utils/helper'

const TempRequest = ({ request, currentDocument, onchange }) => {
  const [requestName,setName] = useState("")

  const setRequestName = (e) =>{
    setName(e.target.value)
    onchange(e.target.value)
  }

  return (
    <div className='sidebar-request-card card-hover' style={{paddingLeft:"5vw", backgroundColor: getBg(request._id, currentDocument._id), borderLeft: currentDocument._id === request._id ? "5px solid #0e4fbe" : "5px solid transparent" }}>
      <img style={{width:"1.5vw",height:"2vh",marginRight:"2vw"}} src={requestIcon} />
      <input className='tempreq-input' onClick={(e)=>e.stopPropagation()} value={requestName} onChange={setRequestName} autoFocus={true} />
    </div>
  );
}
export default TempRequest;