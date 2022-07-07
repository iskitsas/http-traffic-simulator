import { useContext, useEffect, useState } from "react";
import { ACTION } from "../../../../constants";
import { getRequests } from "../../../../renderer-process/Request/request.renderer";
import { StateContext } from "../../../../store";
import RequestCard from "../../FileNavigation/RequestCard";
import folderIcon from '../../../../assets/images/folderIcon.png'

const ScenarioRight = () => {
  const { currentDocument, dispatch } = useContext(StateContext)
  const [requests, setRequests] = useState([])
  const fetchAllRequest = async () => {
    const respo = await getRequests(currentDocument._id);
    setRequests(respo)
  }

  const setcurrentdocument = (document) => {
    dispatch(ACTION.PUSH_DOCUMENT, document)
  }

  useEffect(() => {
    // console.log(requests)
  }, [requests])

  useEffect(() => {
    fetchAllRequest();
  }, [currentDocument])
  return (
    <div style={{ overflow: "hidden", userSelect: "none", minWidth: "10%", paddingLeft: "1vw", width: "40%", flex: 1, height: "100%", borderRight: "1px solid #424242" }}>
      <p style={{ userSelect: "none", borderBottom: "0.5px solid #424242", paddingBottom: "5px" }}>Requests in this scenario</p>
      <div style={{display:"flex",alignItems:"center"}}>
        <img style={{height:"4vh"}} src={folderIcon} />
        <p>{currentDocument.scenarioname}</p>
      </div>
      {
        requests.map(request => <RequestCard request={request} openMenu={() => { }} currentDocument={currentDocument} onSelect={setcurrentdocument} />)
      }
    </div>
  );
}
export default ScenarioRight;