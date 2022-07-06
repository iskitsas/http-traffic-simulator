import './opentabs.css'
import { useContext, useState } from "react";
import { StateContext } from "../../../store";

import OpenTab from './OpenTab';
import ConfirmDialog from '../../../utils/components/ConfirmDialog'
import { ACTION } from '../../../constants';

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
    <div id='open-scenarios-list' >
      {openedDocuments.map((doc) => <OpenTab onClose={onClose} onTabClick={onTabClick} doc={doc} currentDocument={currentDocument} />)}
      {
        showConfirm && <ConfirmDialog dialog="Do you want to discard changes?" onAction={confirmAction}/>
      }
    </div>
  );
}
export default OpenTabs;
