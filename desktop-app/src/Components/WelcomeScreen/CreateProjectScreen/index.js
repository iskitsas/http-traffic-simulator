import './style.css'
import { useEffect, useState } from 'react'
import { addProject, updateProject } from '../../../renderer-process/Project/project.renderer'
import ImportModal from '../../Home/MenuBar/ImportModal'
import folderIcon from "../../../assets/images/folderIcon.png"
import infoIcon from "../../../assets/images/infoIcon.png"
import InfoModal from '../../../utils/components/InfoModal'

const WelcomeProjectScreen = ({ onNext, project }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showImport, setImport] = useState(false)
  const [showInfo, setInfo] = useState(false)
  const createProject = (e) => {
    e.preventDefault();
    if (project._id)
      updateProject(name, description, project._id).then(savedProject => {
        onNext(savedProject);
      })
    else
      addProject({ name: name, description: description }).then(savedProject => {
        onNext(savedProject);
      });
  }
  const toggleInfo = () => {
    setInfo(prev => !prev)
  }
  useEffect(() => {
    if (project._id) {
      setName(project.projectName)
      setDescription(project.description)
    }
  }, [project])
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "#282828" }}>
      <div style={{ height: "100%", width: "50%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} >
        <div style={{ width: "70%", justifyContent: "space-around", alignItems: "center", display: "flex", flexDirection: "row" }}>
          <p className='welcome-create-project-title' >Create project</p>
          <button title='what is project' onClick={toggleInfo} style={{ alignItems: "center", backgroundColor: "transparent", border: "none", cursor: "pointer" }}><img style={{ width: "1.5vw" }} src={infoIcon} /></button>
        </div>
        <form onSubmit={createProject} id='welcome-create-project'>
          <textarea className='welcome-create-project-proj-name' required={true} value={name} onChange={e => setName(e.target.value)} placeholder="Project name" />
          <textarea className='welcome-create-project-proj-desc' required={true} value={description} onChange={e => setDescription(e.target.value)} placeholder="Project description..." />
          <button type="submit" id='create-project-btn'>Create</button>
        </form>
      </div>
      {/* <hr style={{ transform: [{ rotate: "90deg" }],marginTop:"20vh", height: "75vh", borderColor: "#646464" }} /> */}
      <div style={{ height: "100%", backgroundColor: "#343436", justifyContent: "center", width: "50%", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <p className='welcome-create-project-title' style={{width:"65%"}} >Already have project</p>
        <div style={{ backgroundColor: "#282828", height: "55%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", borderRadius: "0.3vw", width: "65%" }}>
          <img style={{ width: "30%" }} src={folderIcon} />
          {/* <p style={{ fontSize: "1.5vw", color: "#ffffff", fontFamily: "monospace", fontWeight: "600" }}>Already have project</p> */}
          <button onClick={() => setImport(true)} style={{
            height: "10%", width: "15vw", border: "none", backgroundColor: "orange", borderRadius: "0.5vw",
            color: "#ffffff", fontSize: "1.2vw", cursor: "pointer"
          }}>Upload</button>
        </div>
      </div>
      {
        showImport &&
        <ImportModal onClose={() => setImport(false)} />
      }
      {
        showInfo &&
        <InfoModal title="What is Project?" onclose={toggleInfo} desc={"It is a simple folder or collextion of scenarios to organise all the scenarios related to a particular project."} />
      }
    </div>
  );
}
export default WelcomeProjectScreen;