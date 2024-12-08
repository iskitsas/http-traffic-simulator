//functions
import { getBg, getColor } from '../../../utils/helper'

//images-icons
import editMenu from '../../../assets/images/editMenu.svg'

const RequestCard = ({ request, onSelect, currentDocument, openMenu }) => {
  const openRequest = () => {
    onSelect(request);
  }

  const openEditMenu = (e) => {
    e.stopPropagation();
    onSelect(request);
    openMenu(e, request.requestName);
  }

  return (
    <div className='sidebar-request-card card-hover' onClick={openRequest} style={{ backgroundColor: getBg(request._id, currentDocument._id), borderLeft: currentDocument._id === request._id ? "5px solid #0e4fbe" : "5px solid transparent" }}>
      <p className='sidebar-request-title sidebar-request-title1' style={{ color: getColor(request.method) }}>{request.method}</p>
      <p title={request.requestName} className='sidebar-request-title sidebar-request-title2'>{request.requestName}</p>
      <button onClick={openEditMenu} title='edit request' className='sidebar-request-edit'>
        <img className='sidebar-request-edit-icon' style={{ height: "1.5vh", cursor: "pointer" }} src={editMenu} />
      </button>
    </div>
  );
}
export default RequestCard;