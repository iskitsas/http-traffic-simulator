//styles
import './opentab.css'

//images
import folderIcon from '../../../assets/images/folderIcon.png'

//functions
import { getColor } from '../../../utils/helper'

const OpenTab = ({ doc, currentDocument, onTabClick, onClose }) => {
  const closeTab=(e)=>{
    e.stopPropagation();
    onClose(doc)
  }
  return (
    <div onClick={() => onTabClick(doc)} className="open-tab" style={{userSelect:"none", borderTopColor: currentDocument._id === doc._id ? "#0e4fbe" : "transparent", borderBottomColor: currentDocument._id === doc._id ? "transparent" : "#424242" }}>
      {
        doc.method ? <p style={{ width: "15%", fontSize: "0.8vw", color: getColor(doc.method),marginRight:"1.5vw" }}>{doc.method}</p> :
          <img style={{ width: "1.5vw", height: "1.5vw" }} src={folderIcon} />
      }
      <p title={doc.scenarioname || doc.requestName} style={{ margin: "0px", textOverflow: "ellipsis", fontSize: "0.9vw", overflow: "hidden", userSelect: "none", whiteSpace: "nowrap",color: currentDocument._id === doc._id ?"white":"gray" }}>{doc.scenarioname || doc.requestName}</p>
      <button onClick={closeTab} className='close-open-tab-btn'>x</button>
    </div>
  );
}
export default OpenTab;