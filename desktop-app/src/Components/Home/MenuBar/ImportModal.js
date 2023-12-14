import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTION } from '../../../constants';
import { emitNotification } from '../../../renderer-process/notifications/notifications.renderer';
import { addProject, getProjects, importProject } from '../../../renderer-process/Project/project.renderer';
import { addRequest } from '../../../renderer-process/Request/request.renderer';
import { addScenario } from '../../../renderer-process/Scenario/scenario.renderer';
import { StateContext } from '../../../store';
import './importmodal.css'
const ImportModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { dispatch, projects } = useContext(StateContext)
  const [bordercolor, setBorder] = useState("#b4b4b4")
  const [loadedFile, setFile] = useState("")
  const onenter = (e) => {
    setBorder("green");
  }
  const onleave = (e) => {
    setBorder("#b4b4b4");
  }
  const oninvalid = (e) => {
    setBorder("red");
  }

  const importproject =async ()=>{
    const parsedData = await importProject()
    const project = parsedData.project
      const requests = parsedData.requests
      const scenarios = parsedData.scenarios
      if (parsedData && parsedData.project) {
        const alreadyExist = projects.filter((proj) => proj._id === project._id)
        if (alreadyExist.length === 0) {
          await Promise.all([
            addProject({ ...project, name: project.projectName }),
            addScenario(scenarios),
            addRequest({ requests: requests })
          ])
          dispatch(ACTION.SET_PROJECTS, getProjects());
          navigate("/")
        } else (
          emitNotification("Error", "Project already exist! 🛑")
        )
      } else {
        emitNotification("Error", "Invalid file 🛑")
      }
      onClose();
  }

  const setFiles = (e) => {
    var fr = new FileReader();
    fr.onload = async function () {
      const parsedData = JSON.parse(fr.result)
      const project = parsedData.project
      const requests = parsedData.requests
      const scenarios = parsedData.scenarios
      if (parsedData && parsedData.project) {
        const alreadyExist = projects.filter((proj) => proj._id === project._id)
        if (alreadyExist.length === 0) {
          await Promise.all([
            addProject({ ...project, name: project.projectName }),
            addScenario(scenarios),
            addRequest({ requests: requests })
          ])
          dispatch(ACTION.SET_PROJECTS, getProjects());
          navigate("/")
        } else (
          emitNotification("Error", "Project already exist! 🛑")
        )
      } else {
        emitNotification("Error", "Invalid file 🛑")
      }
      onClose();
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
          {/* <input onDragEnter={onenter} onDragLeave={onleave} onChange={setFiles} value={loadedFile} className='file-upload-input'
            accept=".flex" type="file" /> */}
          <button onClick={importproject} className='file-upload-btn'>Upload</button>
        </div>
      </div>
    </div>
  );
}
export default ImportModal;