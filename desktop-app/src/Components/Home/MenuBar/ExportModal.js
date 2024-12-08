import { useContext, useState } from 'react';
import { exportProject } from '../../../renderer-process/Project/project.renderer';
import { StateContext } from '../../../store';
import './exportmodal.css'
const ImportModal = ({ onClose }) => {
  const { projects } = useContext(StateContext)
  const [selectedProject, setProject] = useState("")
  const exportproject = async () => {
    try {
      const response = exportProject(selectedProject);
      onClose()
    } catch (error) {
      onClose()
    }
  }
  return (
    <div className="create-modal-wrapper">
      <div className="export-modal">
        <button className="close-modal-btn" onClick={onClose}>X</button>
        <div className='' style={{ display: "flex", flexDirection: "column", height: "50%", alignItems: "center", justifyContent: "space-evenly" }}>
          <label>Select project to export</label>
          <select onChange={(e) => setProject(e.target.value)} className='export-project-select'>
            <option value="">select project</option>
            {
              projects.map(project => <option key={project._id + "export"} value={project._id}>{project.projectName}</option>)
            }
          </select>
          <button disabled={selectedProject === ""} type='download' onClick={exportproject} className='modal-export-btn'>Export</button>
        </div>
      </div>
    </div>
  );
}
export default ImportModal;