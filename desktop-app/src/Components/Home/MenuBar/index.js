import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ACTION } from '../../../constants';
import { getProjects } from '../../../renderer-process/Project/project.renderer';
import { StateContext } from '../../../store';
import RandomPattern from './RandomPattern';
import './style.css'
const MenuBar = () => {
  const { dispatch, projects } = useContext(StateContext)

  const changeProject = (id) => {
    const filteredProject = projects.filter(project => project._id === id)
    dispatch(ACTION.SET_CURRENT_PROJECT, filteredProject[0])
  }
  const getProjectss = async () => {
    dispatch(ACTION.SET_PROJECTS, await getProjects())
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
        <div id='new-btn-container'>
          <button id="add-btn">
            <span id='plus-icon'>+</span> New
          </button>
          <i style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff", height: "100%", borderRadius: "0px 3px 3px 0px", cursor: "pointer" }} className="workspace-switcher__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.00004 9.29294L4.35359 5.64649L3.64648 6.3536L8.00004 10.7072L12.3536 6.3536L11.6465 5.64649L8.00004 9.29294Z" fill="#000000"></path>
            </svg>
          </i>
        </div>
        <button id='import-btn'>Import</button>
        <select onChange={(e) => changeProject(e.target.value)} id='project-select'>
          {
            projects.map((project, index) => <option key={project._id} value={project._id} >{project.projectName}</option>)
          }
        </select>
      </div>
      <div style={{ display: "flex" }}>
        <RandomPattern />
        <Link to="/welcome"><button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "1.1vw" }}>\/</button></Link>
      </div>
    </div>
  );
}
export default MenuBar;