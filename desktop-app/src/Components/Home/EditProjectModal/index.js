import './style.css'
const EditModal=({isOpen,onDelete,position})=>{
  return(
    <div id="filenav-edit-modal" style={{display:isOpen?"flex":"none",top:`${position.top}px`,left:`${position.left}px`}}>
      <p className='filenav-editmodal-edit' >Edit</p>
      <p onClick={onDelete} className='filenav-editmodal-edit' >Delete</p>
    </div>
  );
}
export default EditModal;