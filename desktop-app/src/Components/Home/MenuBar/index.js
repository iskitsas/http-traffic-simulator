import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../../../store';
import './style.css'
const MenuBar = () => {
  const { dispatch, projects } = useContext(StateContext)

  const changeProject = (id) => {
    const filteredProject = projects.filter(project => project._id === id)
    dispatch("SET_PROJECT", filteredProject[0])
  }
  useEffect(() => {
    if (projects.length)
      changeProject(projects[0]._id);
  }, [projects])
  return (
    <div id="menu-container">
      <div id='menu-options'>
        <div id='new-btn-container'>
          <button id="add-btn">
            <span id='plus-icon'>+</span> New
          </button>
          <button className='down-arrow bg-lightblue'>\/</button>
        </div>
        <button id='import-btn'>Import</button>
        <select onChange={(e) => changeProject(e.target.value)} id='project-select'>
          {
            projects.map((project, index) => <option value={project._id} >{project.projectName}</option>)
          }
        </select>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ height: "25px", width: "25px", borderRadius: "50%", backgroundColor: "blue" }}></div>
        <Link to="/welcome"><button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "1.1vw" }}>\/</button></Link>
      </div>
    </div>
  );
}
export default MenuBar;