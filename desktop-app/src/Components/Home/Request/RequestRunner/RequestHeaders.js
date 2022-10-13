import { useEffect, useState } from 'react';
import './requestparam.css'

const RequestHeaders = ({ request, onchange }) => {
  const [headerData, setHeaderData] = useState(request.header || []);

  const statechange = (onIndex, key, value) => {
    setHeaderData(
      headerData.map((header, index) => {
        return index === onIndex ? { ...header, [key]: value } : header;
      })
    );
  }

  const addHeaderField = () => {
    setHeaderData([...headerData, { key: "", value: "", description: "" }])
  }

  const deleteHeaderField = (indexToDelete) => {
    setHeaderData(headerData.filter((headerd, index) => index !== indexToDelete))
  }

  const deleteParam = (index) => {
    deleteHeaderField(index);
  }

  useEffect(() => {
    if (JSON.stringify(request.header) !== JSON.stringify(headerData))
      onchange("header", headerData)
  }, [headerData])

  useEffect(() => {
    if (JSON.stringify(request.header) !== JSON.stringify(headerData))
      if (Array.isArray(request.header)) {
        setHeaderData(request.header)
      }
  }, [request.header])

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <p id='requestparam-title'>Header data</p>
      <div>
        <div style={{ borderBottom: "1px solid rgb(66, 66, 66)", width: "100%", borderTop: "1px solid rgb(66, 66, 66)", height: "3vh", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <button className='add-param-box-btn' onClick={addHeaderField} >+</button>
          <p className='request-param-label'>KEY</p>
          <p className='request-param-label'>VALUE</p>
          <p className='request-param-label'>DESCRIPTION</p>
        </div>
        {
          headerData.map((headerd, index) =>
            <div key={`requestheaderrow${index}`} className='params-box'>
              {
                headerData.length > 1 &&
                <button className='delete-param-box-btn' onClick={() => deleteParam(index)} >x</button>
              }
              <div className="request-key-value-input-wrapper" >
                <input className="request-key-value-input" value={headerd.key} onChange={(e) => statechange(index, "key", e.target.value)} placeholder="Key" />
              </div>
              <div className="request-key-value-input-wrapper" >
                <input className="request-key-value-input" value={headerd.value} onChange={(e) => statechange(index, "value", e.target.value)} placeholder="Value" />
              </div>
              <div className="request-key-value-input-wrapper" >
                <input className="request-key-value-input" value={headerd.description} onChange={(e) => statechange(index, "description", e.target.value)} placeholder="Description" />
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
export default RequestHeaders;