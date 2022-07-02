import './requestparam.css'
const RequestParams = ({ params, onChange, onAdd, onDelete }) => {
  const addMoreParams = () => {
    onAdd();
  }

  const deleteParam = (index) => {
    onDelete(index);
  }

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <p id='requestparam-title'>Query params</p>
      <div style={{ }}>
        <div style={{ borderBottom: "1px solid rgb(66, 66, 66)", width: "100%", borderTop: "1px solid rgb(66, 66, 66)", height: "3vh", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <button onClick={addMoreParams} style={{ backgroundColor: "transparent",color:"gray", border: "none", cursor: "pointer", fontSize: "1.3vw" }}>+</button>
          <p style={{ userSelect: "none", padding: "0px 1%", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "30%", margin: 0 }}>KEY</p>
          <p style={{ userSelect: "none", padding: "0px 1%", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "30%", margin: 0 }}>VALUE</p>
          <p style={{ userSelect: "none", padding: "0px 1%", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "30%", margin: 0 }}>DESCRIPTION</p>
        </div>
        {
          params.map((param, index) =>
            <div style={{ borderBottom: "1px solid rgb(66, 66, 66)", width: "100%", height: "3vh", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              {params.length > 1 &&
                <button onClick={() => deleteParam(index)} style={{ backgroundColor: "transparent",color:"gray", border: "none", cursor: "pointer", fontSize: "1.1vw" }}>x</button>
              }
              <div className='request-key-value-input-wrapper'>
                <input className="request-key-value-input" value={param.key} onChange={(e) => onChange("key", e.target.value, index)} placeholder="Key" />
              </div>
              <div className='request-key-value-input-wrapper'>
                <input className="request-key-value-input" value={param.value} onChange={(e) => onChange("value", e.target.value, index)} placeholder="Value" />
              </div>
              <div className='request-key-value-input-wrapper'>
                <input className="request-key-value-input" value={param.description} onChange={(e) => onChange("description", e.target.value, index)} placeholder="Description" />
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
export default RequestParams;