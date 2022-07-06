import './style.css'
import VerticalDragger from './VerticalDragger';
import OpenTabs from './OpenTabs';
import ScenarioRunner from './ScenarioRunner';
import RequestRunner from './RequestRunner';
import { useContext, useRef } from 'react';
import { StateContext } from '../../../store';
const Request = () => {
  const resizable = useRef();
  const { currentDocument } = useContext(StateContext)

  return (
    <>
      <div id='request-container-wrapper' ref={resizable} style={{ overflow: "hidden" }} >
        <OpenTabs />
        {
          currentDocument.scenarioId ?
            <RequestRunner /> :
            <ScenarioRunner />
        }
      </div>
      <VerticalDragger resizable={resizable} />
    </>
  );
}
export default Request;