import './style.css'
const MenuBar = () => {
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
        <select id='project-select'>
          <option>Project 1</option>
          <option>Project 2</option>
          <option>Project 3</option>
        </select>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ height: "25px", width: "25px", borderRadius: "50%", backgroundColor: "blue" }}></div>
        <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "1.1vw" }}>\/</button>
      </div>
    </div>
  );
}
export default MenuBar;