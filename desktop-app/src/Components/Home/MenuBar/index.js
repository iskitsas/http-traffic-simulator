import { useContext, useEffect, useState } from 'react';
import { ACTION } from '../../../constants';
import { getProjects } from '../../../renderer-process/Project/project.renderer';
import { StateContext } from '../../../store';
import CreateModal from './CreateModal';
import ExportModal from './ExportModal';
import ImportModal from './ImportModal';
import './style.css'
const MenuBar = () => {
  const { dispatch, projects, currentProject } = useContext(StateContext)
  const [showModal, setModal] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showExport, setShowExport] = useState(false)

  const changeProject = (id) => {
    localStorage.setItem("currentproject", id)
    const filteredProject = projects.filter(project => project._id === id)
    if (filteredProject.length !== 0)
      dispatch(ACTION.SET_CURRENT_PROJECT, filteredProject[0]);
    else
      dispatch(ACTION.SET_CURRENT_PROJECT, projects[0]);
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
  const checksession = async () => {
    const savedprojectid = await localStorage.getItem("currentproject");
    if (toString(savedprojectid) !== "undefined")
      changeProject(savedprojectid)
    else
      changeProject(projects[0]._id)
  }
  useEffect(() => {
    if (projects.length)
      checksession();
    else
      getProjectss();

  }, [projects])

  return (
    <div id="menu-container">
      <div id='menu-options'>
        <button id="add-btn" onClick={() => setModal(true)}>New</button>
        <button onClick={openexportmodal} className="export-btn" >Export</button>
        <button onClick={openImportModal} className="import-btn" >Import</button>
        <select value={currentProject._id} onChange={(e) => changeProject(e.target.value)} id='project-select'>
          {
            projects.map((project, index) => <option key={project._id} value={project._id} >{project.projectName}</option>)
          }
        </select>
      </div>
      <div style={{ display: "flex" }}>
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