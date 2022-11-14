import './modal.css'
import './create.css'

import folderIcon from '../../../assets/images/folderIcon.png'
import requestIcon from '../../../assets/images/requestIcon.png'
import CreateProject from './CreateProject'
import { useState } from 'react'
import CreateScenario from './CreateScenario'
import CreateRequest from './CreateRequest'
const CreateModal = ({ onClose }) => {
  const [activeCard, setActiveCard] = useState(0);
  return (
    <div className='create-modal-wrapper'>
      <button className="close-modal-btn" onClick={onClose}>X</button>
      <div className='create-modal'>
        {
          activeCard === 0 ? <>
            <div onClick={() => setActiveCard(1)} className='create-card'>
              <p style={{ textAlign: "center", fontSize: "6vh", margin: "0px", padding: "0px" }}>+</p>
              Create Project</div>
            <div onClick={() => setActiveCard(2)} className='create-card'>
              <img src={folderIcon} />
              Create Scenario</div>
            <div onClick={() => setActiveCard(3)} className='create-card'>
              <img src={requestIcon} />
              Create Request</div>
          </> :
            activeCard === 1 ? <CreateProject onClose={onClose} /> :
              activeCard === 2 ? <CreateScenario onClose={onClose} /> :
                activeCard === 3 ? <CreateRequest onClose={onClose} /> : <></>
        }
      </div>
    </div>
  );
}

export default CreateModal;