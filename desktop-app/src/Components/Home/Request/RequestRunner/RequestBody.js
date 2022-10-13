import { useEffect, useState } from 'react';
import './requestparam.css'

const RequestBody = ({ request, onchange }) => {
  const [bodyData, setBodyData] = useState(request.body || [{ key: "", value: "", type: "TEXT", description: "" }]);

  const statechange = (onIndex, key, value) => {
    setBodyData(
      bodyData.map((body, index) => {
        return index === onIndex ? { ...body, [key]: value } : body;
      })
    );
  }

  const addMoreParams = () => {
    addBodyField();
  }

  const addBodyField = () => {
    setBodyData([...bodyData, { key: "", value: "", type: "TEXT", description: "" }])
  }

  const deleteBodyField = (indexToDelete) => {
    setBodyData(bodyData.filter((bodyd, index) => index !== indexToDelete))
  }

  const deleteParam = (index) => {
    deleteBodyField(index);
  }

  const handleInputTypeChange = (index, name, value) => {
    bodyData[index].value = ""
    statechange(index, name, value)
  }

  const handleFileUplaod = (index, name, value) => {
    statechange(index, name, value.path)
  }

  useEffect(() => {
    if (JSON.stringify(request.body) !== JSON.stringify(bodyData))
      onchange("body", bodyData)
  }, [bodyData])

  useEffect(() => {
    if (JSON.stringify(request.body) !== JSON.stringify(bodyData))
      if (Array.isArray(request.body)) {
        setBodyData(request.body)
      }
  }, [request.body])

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <p id='requestparam-title'>Body data</p>
      <div>
        <div style={{ borderBottom: "1px solid rgb(66, 66, 66)", width: "100%", borderTop: "1px solid rgb(66, 66, 66)", height: "3vh", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <button className='add-param-box-btn' onClick={addMoreParams} >+</button>
          <p className='request-param-label'>KEY</p>
          <p className='request-param-label'>VALUE</p>
          <p className='request-param-label'>DESCRIPTION</p>
        </div>
        {
          bodyData.map((bodyd, index) =>
            <div key={`request-body${index}`} className='params-box'>
              {
                bodyData.length > 1 &&
                <button className='delete-param-box-btn' onClick={() => deleteParam(index)} >x</button>
              }
              <div className="request-key-value-input-wrapper" >
                <input className="request-key-value-input" value={bodyd.key} onChange={(e) => statechange(index, "key", e.target.value)} placeholder="Key" />
                {
                  bodyd.key !== "" ?
                    <select value={bodyd.type} onChange={(e) => handleInputTypeChange(index, "type", e.target.value)} className='key-type' >
                      <option value="TEXT">Text</option>
                      <option value="FILE">Files</option>
                    </select>
                    : <></>
                }
              </div>
              <div className="request-key-value-input-wrapper" >
                {
                  bodyd.type === "FILE" ?
                    <input className='body-data-file-input' onChange={(e) => handleFileUplaod(index, "value", e.target.files[0])} type="file" placeholder='Select file' /> :
                    <input className="request-key-value-input" value={bodyd.value} onChange={(e) => statechange(index, "value", e.target.value)} placeholder="Value" />
                }
              </div>
              <div className="request-key-value-input-wrapper" >
                <input className="request-key-value-input" value={bodyd.description} onChange={(e) => statechange(index, "description", e.target.value)} placeholder="Description" />
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
export default RequestBody;