//functions
import { getBg, getColor } from '../../../utils/helper'

const RequestCard = ({request, onSelect, currentDocument }) => {
  const openRequest = () => {
    onSelect(request)
  }
  return (
    <div className='sidebar-request-card card-hover' onClick={openRequest} style={{ backgroundColor: getBg(request._id, currentDocument._id),borderLeft:currentDocument._id===request._id?"5px solid #0e4fbe":"5px solid transparent"  }}>
      <p className='sidebar-request-title sidebar-request-title1' style={{ color: getColor(request.method) }}>{request.method}</p>
      <p title={request.requestName} className='sidebar-request-title sidebar-request-title2'>{request.requestName}</p>
    </div>
  );
}
export default RequestCard;