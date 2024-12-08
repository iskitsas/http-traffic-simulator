//styles
import './opentab.css'

//images
import folderIcon from '../../../assets/images/folderIcon.png'

//functions
import { getColor } from '../../../utils/helper'
import { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../../store'

const OpenTab = ({ doc, onTabClick, onClose }) => {
  const { currentDocument, unsavedChanges } = useContext(StateContext)
  const [unsaveIcon, setUnSaveIcon] = useState(false)
  const closeTab = (e) => {
    e.stopPropagation();
    onClose(doc._id)
  }

  const getFileNameColor=(id)=>{
    return unsaveIcon?"#ebd002":
      currentDocument._id === id ? "white" : "gray"
  }

  useEffect(() => {
    const request = unsavedChanges.filter(document => document._id === doc._id)[0]
    if (JSON.stringify(request) !== JSON.stringify(doc))
      setUnSaveIcon(true)
    else
      setUnSaveIcon(false)

  }, [unsavedChanges,doc])

  return (
    <div onClick={() => onTabClick(doc)} className="open-tab" style={{ userSelect: "none", borderTopColor: currentDocument._id === doc._id ? "#0e4fbe" : "transparent", borderBottomColor: currentDocument._id === doc._id ? "transparent" : "#424242" }}>
      {
        doc.method ? <p style={{ width: "15%", fontSize: "0.8vw", color: getColor(doc.method), marginRight: "1.5vw" }}>{doc.method}</p> :
          <img style={{ width: "1.5vw", height: "1.5vw", marginRight: "0.7vw" }} src={folderIcon} />
      }
      <p title={doc.scenarioname || doc.requestName} style={{ flex: 1, margin: "0px", textOverflow: "ellipsis", fontSize: "1vw", overflow: "hidden", userSelect: "none", whiteSpace: "nowrap", color: getFileNameColor(doc._id) }}>{doc.scenarioname || doc.requestName}</p>
      <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}> 
        {
          unsaveIcon &&
          <div className='unsavedot'></div>
        }
        <button onClick={closeTab} className='close-open-tab-btn'>x</button>
      </div>
    </div>
  );
}
export default OpenTab;