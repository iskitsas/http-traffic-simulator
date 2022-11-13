import { useEffect } from "react";
import "./opentabseditmodal.css"
const OpenTabsEditModal = ({ onclose, position }) => {
  return (
    <div id="filenav-edit-modal" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      {/* <p onClick={onEdit} className='filenav-editmodal-edit' >Edit</p> */}
      <button className="close-all-tab-btn" onClick={onclose}>Close all tabs</button>
      {/* <p onClick={onDelete} className='filenav-editmodal-edit'>Delete</p> */}
    </div>
  );
}
export default OpenTabsEditModal;