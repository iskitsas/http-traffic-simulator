import './style.css'
const EditModal=({isOpen,onDelete})=>{
  
  return(
    <div id="filenav-edit-modal" style={{display:isOpen?"flex":"none"}}>
      <p className='filenav-editmodal-edit' >Edit</p>
      <p onClick={onDelete} className='filenav-editmodal-edit' >Delete</p>
    </div>
  );
}
export default EditModal;