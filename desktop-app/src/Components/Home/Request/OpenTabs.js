import './opentabs.css'

import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../../../store";

import OpenTab from './OpenTab';
import ConfirmDialog from '../../../utils/components/ConfirmDialog'
import OpenTabsEditModal from './OpenTabsEditModal';
import AlertModal from './AlertModal';

import { ACTION } from '../../../constants';

import editMenu from '../../../assets/images/editMenu.svg'


const OpenTabs = () => {
  const { openedDocuments, dispatch, unsavedChanges } = useContext(StateContext)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editModalPosition, setEditModalPosition] = useState({})
  const [alert, setAlert] = useState(false)
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

  const openeditmodal = async (e) => {
    setShowEditModal(true)
    setEditModalPosition({ top: e.clientY, left: e.clientX });
    return
  }

  const handleEditModal = (e) => {
    e.stopPropagation()
    if (e.target.id !== "open-tabs-btn" && e.target.id !== "open-tabs-btn-img") {
      setShowEditModal(false)
    }
  }

  const closealltabs = () => {
    //check if any unsaved
    const unsaved_opened_tab = unsavedChanges.filter((doc, index) => JSON.stringify(openedDocuments[index]) !== JSON.stringify(doc))
    if (unsaved_opened_tab.length)
      setAlert(true)
    else
      dispatch(ACTION.SET_OPENDDOC, [])
  }

  const handleCloseWithoutSave = () => {
    dispatch(ACTION.SET_UNSAVED_CHANGE, [])
    dispatch(ACTION.SET_OPENDDOC, [])
  }

  useEffect(() => {
    window.addEventListener("click", handleEditModal)
    return () => {
      window.removeEventListener('click', handleEditModal);
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div id='open-scenarios-list' >
        {
          openedDocuments.map((doc) => <OpenTab key={doc._id} onClose={onClose} onTabClick={onTabClick} doc={doc} />)
        }
        {
          showConfirm && <ConfirmDialog dialog="Do you want to discard changes?" onAction={confirmAction} />
        }
      </div>
      <div style={{ display: "flex", flex: 1, borderBottom: "1px solid #424242", height: "4.8vh", minWidth: "5vw", flexGrow: 1 }}>
        <button id='open-tabs-btn' onClick={openeditmodal} style={{ userSelect: "none", width: "2vw", height: "3vh", alignSelf: "center", border: "none", backgroundColor: "transparent", cursor: "pointer" }}>
          <img id='open-tabs-btn-img' style={{ userSelect: "none", width: "2vw", height: "2vh" }} src={editMenu} />
        </button>
      </div>
      {
        showEditModal &&
        <OpenTabsEditModal onclose={closealltabs} position={editModalPosition} />
      }
      {
        alert &&
        <AlertModal title={"Alert!"} desc={"All unsaved changed will be discarded!"}
          oncancel={() => setAlert(false)} oncloseAll={handleCloseWithoutSave} />
      }
    </div>
  );
}
export default OpenTabs;
