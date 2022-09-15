import './canclerequest.css'
const CancleRequest = ({ endReq }) => {
  return (
    <div className="cancle-req-container">
      <div className="cancle-req-layer"></div>
      <button onClick={endReq}>Cancel</button>
    </div>
  );
}
export default CancleRequest;