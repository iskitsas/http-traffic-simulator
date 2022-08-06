import './style.css'
import { useEffect, useState } from 'react'
import { addProject, updateProject } from '../../../renderer-process/Project/project.renderer'
import ImportModal from '../../Home/MenuBar/ImportModal'

const WelcomeProjectScreen = ({ onNext, project }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showImport, setImport] = useState(false)
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
  useEffect(() => {
    if (project._id) {
      setName(project.projectName)
      setDescription(project.description)
    }
  }, [project])
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center",backgroundColor:"#282828" }}>
      <div style={{ height: "100%", width: "50%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} >
        <p style={{ color: "#ffffff", width: "75%", fontSize: 35 }}>Create project</p>
        <form onSubmit={createProject} id='welcome-create-project'>
          <textarea required={true} value={name} onChange={e => setName(e.target.value)} style={{ fontSize: 20, resize: "none", border: "none", width: "90%", height: "20%", borderRadius: 5, padding: 5, outline: "none" }} placeholder="Project name" />
          <textarea required={true} value={description} onChange={e => setDescription(e.target.value)} style={{ fontSize: 20, resize: "none", border: "none", width: "90%", height: "45%", borderRadius: 5, padding: 5, outline: "none" }} placeholder="Project description..." />
          <button type="submit" id='create-project-btn'>Create</button>
        </form>
      </div>
      <hr style={{ transform: [{ rotate: "90deg" }], height: "75vh", width: "0.2px", backgroundColor: "gray" }} />
      <div style={{ height: "100%", justifyContent: "center", width: "50%", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <p style={{ fontSize: "1.5vw",color:"#ffffff" }}>Already have project</p>
        <button onClick={() => setImport(true)} style={{
          height: "4vh", width: "15vw", border: "none", backgroundColor: "#05ccb1", borderRadius: "0.2vw",
          color: "#ffffff", fontSize: "1.2vw", cursor: "pointer"
        }}>Upload</button>
      </div>
      {
        showImport &&
        <ImportModal onClose={() => setImport(false)} />
      }
    </div>
  );
}
export default WelcomeProjectScreen;