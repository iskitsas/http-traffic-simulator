import './opentabs.css'
import { useContext } from "react";
import { StateContext } from "../../../store";
import OpenTab from './OpenTab';

const OpenTabs = () => {
  const { openedDocuments, currentDocument, dispatch } = useContext(StateContext)
  const onTabClick=(doc)=>{
    dispatch("SET_CURRENT_DOCUMENT",doc)
  }
  const onClose=(doc)=>{
    dispatch("POP_DOCUMENT",doc)
  }
  return (
    <div id='open-scenarios-list' >
      {openedDocuments.map((doc) => <OpenTab onClose={onClose} onTabClick={onTabClick} doc={doc} currentDocument={currentDocument} />)}
    </div>
  );
}
export default OpenTabs;
