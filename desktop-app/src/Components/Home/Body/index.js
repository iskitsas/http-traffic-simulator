import { useContext } from "react";
import { StateContext } from "../../../store";
import FilesNavigation from "../FileNavigation/index";
import Request from "../Request/index";
import Response from "../Response/index";
import './style.css'
const Body = () => {
  const { openedDocuments } = useContext(StateContext)
  return (
    <div id="home-body" style={{ display: "flex", flex: 1, height: "100%",overflow:"hidden" }}>
      <FilesNavigation />
      <div style={{ display: "flex", height: "95vh", flexDirection: "column", justifyContent: "space-between" }}>
        {openedDocuments.length > 0 ?
          <>
            <Request />
            <Response />
          </> :
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, width: "75vw" }}>
            <p style={{fontSize:"20px"}}>Open request to start load testing</p>
          </div>
        }
      </div>
    </div>
  );
}
export default Body;