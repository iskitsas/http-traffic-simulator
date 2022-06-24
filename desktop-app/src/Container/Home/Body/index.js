import FilesNavigation from "./FileNavigation/index";
import Request from "./Request/index";
import Response from "./Response/index";
import './style.css'
const Body=()=>{
  return(
    <div id="home-body" style={{display:"flex",flex:1,height:"100%"}}>
      <FilesNavigation/>
      <div style={{display:"flex",height:"91.3vh",flexDirection:"column",justifyContent:"space-between"}}>
      <Request/>
      <Response />
      </div>
    </div>
  );
}
export default Body;