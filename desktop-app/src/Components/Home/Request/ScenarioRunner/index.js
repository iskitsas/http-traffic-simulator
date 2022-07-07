import { useRef } from "react";
import HorizontalDragger from "../HorizontalDragger";
import ScenarioLeft from "./ScenarioLeft";
import ScenarioRight from "./ScenarioRight";
import './style.css'
const ScenarioRunner = () => {
  const resizable = useRef();
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <ScenarioLeft Ref={resizable} />
      <HorizontalDragger resizable={resizable} />
      <ScenarioRight />
    </div>
  );
}
export default ScenarioRunner;