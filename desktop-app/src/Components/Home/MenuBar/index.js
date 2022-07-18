import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ACTION } from '../../../constants';
import { getProjects } from '../../../renderer-process/Project/project.renderer';
import { StateContext } from '../../../store';
import CreateModal from './CreateModal';
import ExportModal from './ExportModal';
import ImportModal from './ImportModal';
import RandomPattern from './RandomPattern';
import './style.css'
const MenuBar = () => {
  const { dispatch, projects, currentProject } = useContext(StateContext)
  const [showModal, setModal] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showExport, setShowExport] = useState(false)

  const changeProject = (id) => {
    const filteredProject = projects.filter(project => project._id === id)
    dispatch(ACTION.SET_CURRENT_PROJECT, filteredProject[0]);
  }
  const getProjectss = async () => {
    dispatch(ACTION.SET_PROJECTS, await getProjects())
  }

  const openImportModal = () => {
    setShowImport(true)
  }
  const openexportmodal = () => {
    setShowExport(true)
  }

  useEffect(() => {
    if (projects.length)
      changeProject(projects[0]._id);
    else
      getProjectss();

  }, [projects])

  return (
    <div id="menu-container">
      <div id='menu-options'>
        <button id="add-btn" onClick={() => setModal(true)}>New</button>
        <button onClick={openexportmodal} className="export-btn" >Export</button>
        <button onClick={openImportModal} className="import-btn" >Import</button>
        <select onChange={(e) => changeProject(e.target.value)} id='project-select'>
          {
            projects.map((project, index) => <option key={project._id} value={project._id} >{project.projectName}</option>)
          }
        </select>
      </div>
      <div style={{ display: "flex" }}>
        {/* <RandomPattern /> */}
        {/* <Link to="/welcome"><button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "1.1vw" }}>\/</button></Link> */}
      </div>
      {
        showModal &&
        <CreateModal onClose={() => setModal(false)} />
      }
      {
        showImport &&
        <ImportModal onClose={() => setShowImport(false)} />
      }
      {
        showExport &&
        <ExportModal onClose={() => setShowExport(false)} />
      }
    </div>
  );
}
export default MenuBar;