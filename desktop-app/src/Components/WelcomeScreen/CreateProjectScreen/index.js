import './style.css'
import welcomeImage from '../../../assets/images/welcome-form.jpg'
import { useEffect, useState } from 'react'
import { addProject, updateProject } from '../../../renderer-process/Project/project.renderer'

const WelcomeProjectScreen = ({ onNext, project }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createProject = (e) => {
    e.preventDefault();
    if (project._id)
      updateProject(name, description, project._id).then(savedProject => {
        onNext(savedProject);
      })
    else
      addProject(name, description).then(savedProject => {
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
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div style={{ height: "100%", width: "50%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} >
        <p style={{ color: "#000000", width: "75%", fontSize: 35 }}>Create project</p>
        <form onSubmit={createProject} id='welcome-create-project'>
          <textarea required={true} value={name} onChange={e => setName(e.target.value)} style={{ fontSize: 20, resize: "none", border: "none", width: "90%", height: "20%", borderRadius: 5, padding: 5, outline: "none" }} placeholder="Project name" />
          <textarea required={true} value={description} onChange={e => setDescription(e.target.value)} style={{ fontSize: 20, resize: "none", border: "none", width: "90%", height: "45%", borderRadius: 5, padding: 5, outline: "none" }} placeholder="Project description..." />
          <button type="submit" id='create-project-btn'>Create</button>
        </form>
      </div>
      <div style={{ height: "100%", width: "50%", display: "flex", alignItems: "center" }}>
        <img id='welcome-img' src={welcomeImage} />
      </div>
    </div>
  );
}
export default WelcomeProjectScreen;