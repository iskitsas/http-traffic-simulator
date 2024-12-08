import './requestparam.css'
const RequestParams = ({ params, onchange, onAdd, onDelete }) => {
  const addMoreParams = () => {
    onAdd();
  }

  const deleteParam = (index) => {
    onDelete(index);
  }

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <p id='requestparam-title'>Query params</p>
      <div style={{}}>
        <div className='request-param-label-box'>
          <button className='add-param-box-btn' onClick={addMoreParams} >+</button>
          <p className='request-param-label'>KEY</p>
          <p className='request-param-label'>VALUE</p>
          <p className='request-param-label'>DESCRIPTION</p>
        </div>
        {
          params.map((param, index) =>
            <div key={`requestparamrow${index}`} className='params-box'>
              {
                params.length > 1 &&
                <button className='delete-param-box-btn' onClick={() => deleteParam(index)} >x</button>
              }
              <div className='request-key-value-input-wrapper'>
                <input className="request-key-value-input" value={param.key} onChange={(e) => onchange(index, "key", e.target.value)} placeholder="Key" />
              </div>
              <div className='request-key-value-input-wrapper'>
                <input className="request-key-value-input" value={param.value} onChange={(e) => onchange(index, "value", e.target.value)} placeholder="Value" />
              </div>
              <div className='request-key-value-input-wrapper'>
                <input className="request-key-value-input" value={param.description} onChange={(e) => onchange(index, "description", e.target.value)} placeholder="Description" />
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
export default RequestParams;