import './opentabs.css'

import { useContext, useState } from "react";
import { StateContext } from "../../../store";

import OpenTab from './OpenTab';
import ConfirmDialog from '../../../utils/components/ConfirmDialog'

import { ACTION } from '../../../constants';

import editMenu from '../../../assets/images/editMenu.svg'


const OpenTabs = () => {
  const { openedDocuments, currentDocument, dispatch, unsavedChanges } = useContext(StateContext)
  const [showConfirm, setShowConfirm] = useState(false)
  const [docToclose, setDocToClose] = useState("")
  const onTabClick = (doc) => {
    dispatch(ACTION.SET_CURRENT_DOCUMENT, doc)
  }
  const onClose = (docToClose) => {
    setDocToClose(docToClose)
    let changedindex;
    let originalindex;
    unsavedChanges.filter((doc, index) => {
      if (doc._id === docToClose) {
        changedindex = index
      }
      return
    })
    openedDocuments.filter((doc, index) => {
      if (doc._id === docToClose) {
        originalindex = index
      }
      return
    })
    if (JSON.stringify(unsavedChanges[changedindex]) === JSON.stringify(openedDocuments[originalindex])) {
      setDocToClose("")
      dispatch("POP_DOCUMENT", docToClose)
    } else {
      setShowConfirm(true)
    }
  }

  const confirmAction = (action) => {
    if (action) {
      dispatch("POP_DOCUMENT", docToclose)
    }
    setShowConfirm(false)
  }

  return (
    <div style={{ display: "flex" }}>
      <div id='open-scenarios-list' >
        {
          openedDocuments.map((doc) => <OpenTab onClose={onClose} onTabClick={onTabClick} doc={doc} currentDocument={currentDocument} />)
        }
        {
          showConfirm && <ConfirmDialog dialog="Do you want to discard changes?" onAction={confirmAction} />
        }
      </div>
      <div style={{ display: "flex", flex: 1, borderBottom: "1px solid #424242", height: "4.8vh", minWidth: "5vw", flexGrow: 1 }}>
        <button style={{userSelect:"none", width:"2vw",height:"3vh",alignSelf:"center",border:"none",backgroundColor:"transparent",cursor:"pointer"}}>
          <img style={{userSelect:"none", width:"2vw",height:"2vh"}} src={editMenu} />
        </button>
      </div>
    </div>
  );
}
export default OpenTabs;
