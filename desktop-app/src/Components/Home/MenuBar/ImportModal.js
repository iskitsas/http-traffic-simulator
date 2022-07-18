import { useState } from 'react';
import './importmodal.css'
const ImportModal = ({ onClose }) => {
  const [bordercolor, setBorder] = useState("#b4b4b4")
  const [loadedFile, setFile] = useState("")
  const onenter = (e) => {
    setBorder("green");
  }
  const onleave = (e) => {
    setBorder("#b4b4b4");
  }
  const oninvalid = (e) => {
    console.log(e.target.value)
    setBorder("red");
  }

  const setFiles = (e) => {
    var fr = new FileReader();
    fr.onload = function () {
      const parsedData = JSON.parse(fr.result)
      const requests = parsedData.requests
      const scenarios = parsedData.scenarios
      
    }
    const fname = e.target.files[0].name
    if (fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1) === "flex") {
      fr.readAsText(e.target.files[0]);
      setFile(e.target.value)
    }
  }

  return (
    <div className="create-modal-wrapper">
      <div className="import-modal">
        <button className="close-modal-btn" onClick={onClose}>X</button>
        <div className='drop-zone' style={{ border: `2px dashed ${bordercolor}` }}>
          <p style={{ marginTop: "15%", color: "#b8b8b8" }}>drop files here</p>
          <input onDragEnter={onenter} onDragLeave={onleave} onChange={setFiles} value={loadedFile} className='file-upload-input'
            accept=".flex" type="file" />
          <button className='file-upload-btn'>Upload</button>
        </div>
      </div>
    </div>
  );
}
export default ImportModal;