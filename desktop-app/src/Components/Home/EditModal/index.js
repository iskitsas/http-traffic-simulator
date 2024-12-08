import './style.css'

const EditModal = ({ onDelete, position }) => {
  return (
    <div id="filenav-edit-modal" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      {/* <p onClick={onEdit} className='filenav-editmodal-edit' >Edit</p> */}
      <p onClick={onDelete} className='filenav-editmodal-edit'>Delete</p>
    </div>
  );
}
export default EditModal;