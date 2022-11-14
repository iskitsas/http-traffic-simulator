import { useEffect, useState } from 'react';
import './deleteconfirmmodal.css'

const DeleteConfirmationModal = ({ documentName = "", onConfirm, onClose }) => {
  const [toDelete, setToDelete] = useState("")
  const [disable, setDisable] = useState(true)
  const check = (e) => {
    setToDelete(e.target.value)
  }
  useEffect(()=>{
  },[onConfirm])
  const deleteProject = () => {
    onConfirm()
    onClose()
  }
  useEffect(() => {
    if (toDelete === documentName)
      setDisable(false)
    else
      setDisable(true)
  }, [toDelete])
  return (
    <div className="delete-modal">
      <div className='delete-modal-form' style={{}}>
        <p style={{ fontSize: "1.3vw",textAlign:"center" }}>Are you sure want to delete ? You will loose all your saved data in {documentName} <br /> Type <span style={{ backgroundColor: "gray", padding: "0px 1vw", fontSize: "1.2vw", borderRadius: "3px" }}> {documentName}</span> to confirm?</p>
        <input autoFocus value={toDelete} onChange={check} className='delete-modal-input' placeholder='Type project name to confirm' />
        <div>
          <button onClick={onClose} className='delete-modal-cancel' style={{ cursor: "pointer" }} >cancel</button>
          <button onClick={deleteProject} className='delete-modal-confirm' style={{
            cursor: disable ? "not-allowed" : "pointer",
            backgroundColor: disable ? "#ad3c3c" : "#bc0505"
          }} disabled={disable} >confirm</button>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmationModal;