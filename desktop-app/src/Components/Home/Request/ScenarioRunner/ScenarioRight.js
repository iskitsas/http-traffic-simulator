import { useContext, useEffect, useState } from "react";
import { ACTION } from "../../../../constants";
import { StateContext } from "../../../../store";
import RequestCard from "../../FileNavigation/RequestCard";
import folderIcon from '../../../../assets/images/folderIcon.png'

const ScenarioRight = ({requestss}) => {
  const { currentDocument, dispatch } = useContext(StateContext)

  const setcurrentdocument = (document) => {
    dispatch(ACTION.PUSH_DOCUMENT, document)
  }

  return (
    <div style={{ overflow: "hidden", userSelect: "none", minWidth: "10%", paddingLeft: "1vw", width: "40%", flex: 1, height: "100%", borderRight: "1px solid #424242" }}>
      <p style={{ userSelect: "none", borderBottom: "0.5px solid #424242", paddingBottom: "5px" }}>Requests in this scenario</p>
      <div style={{display:"flex",alignItems:"center"}}>
        <img style={{height:"4vh",margin:"0vh 0.5vw 0vh 1.5vw"}} src={folderIcon} />
        <p>{currentDocument.scenarioname}</p>
      </div>
      {
        requestss.map(request => <RequestCard key={`scenarioright${request._id}`} request={request} openMenu={() => { }} currentDocument={currentDocument} onSelect={setcurrentdocument} />)
      }
    </div>
  );
}
export default ScenarioRight;