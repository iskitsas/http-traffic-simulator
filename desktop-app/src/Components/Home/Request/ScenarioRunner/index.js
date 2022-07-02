import { useRef } from "react";
import HorizontalDragger from "../HorizontalDragger";
import './style.css'
const ScenarioRunner = () => {
  const resizable = useRef();
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div ref={resizable} className='Block'>

      </div>
      <HorizontalDragger resizable={resizable.current} />
      <div style={{ minWidth: "20%", width: "40%",flex:1, height: "100%",borderRight: "1px solid #424242" }}>
        <p>Hi</p>
      </div>
    </div>
  );
}
export default ScenarioRunner;