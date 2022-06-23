import FilesNavigation from "./FilesNavigation";
import Request from "./Request/index";
import Response from "./Response";

const Body=()=>{
  return(
    <div style={{display:"flex",flex:1,height:"100%"}}>
      <FilesNavigation/>
      <div style={{display:"flex",height:"91.3vh",flexDirection:"column",justifyContent:"space-between"}}>
      <Request/>
      <Response />
      </div>
    </div>
  );
}
export default Body;