import { useEffect, useState } from "react";
import CustomInput from "../../../utils/components/CustomInput";
import CustomSelect from "../../../utils/components/CustomSelect";
import { requestoptions } from "./constants";

const RequestConfiguration = ({ onSet }) => {
  const [requestConfiguration, setConfiguration] = useState([{ requestName: "", port: "", url: "", protocol: "", path: "", host: "", method: "" }])

  const onChange = (name, value, requestIndex) => {
    setConfiguration(
      requestConfiguration.map((request, index) => {
        return index === requestIndex ? { ...request, [name]: value } : request;
      })
    );
  }

  const addMoreRequest = () => {
    setConfiguration([...requestConfiguration, { requestName: "", port: "", path: "", url: "", protocol: "", host: "", method: "" }])
  }

  const deleteRequest = (indexToDelete) => {
    setConfiguration(requestConfiguration.filter((request, index) => index !== indexToDelete))
  }

  useEffect(() => {
    onSet("request", requestConfiguration)
  }, [requestConfiguration])

  return (
    <div style={{ fontFamily: "sans-serif", color: "#ffffff", width: "100%", display: "flex", flexWrap: "wrap", height: "30%", marginTop: 30 }}>
      <div style={{ display: "flex", width: "100%" }}>
        <p style={{ fontSize: "1.5vw", fontWeight: "bold", width: "95%", margin: "5px 5px 5px 30px", color: "#3ea79b" }}>Request configuration</p>
        <button onClick={addMoreRequest} title="add more request" style={{ backgroundColor: "#bfd8ff", marginRight: 10, width: "10%", height: "2.8vh", fontSize: "1.2vw", textAlign: "center", padding: 0, borderRadius: 3, border: "none", cursor: "pointer", alignSelf: "center" }}>Add</button>
      </div>
      {
        requestConfiguration.map(
          (requestconfig, requestIndex) =>
            <div key={requestIndex} style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
              <p style={{ width: "80%", margin: "1vh", marginLeft: "2vw", fontSize: "1.2vw", color: "#52c2e0", fontWeight: "900" }}>Request {requestIndex + 1}</p>
              {
                requestConfiguration.length > 1 ? <button id="welcome-request-minus-btn" onClick={() => deleteRequest(requestIndex)} title="delete this request" >x</button> : <></>
              }
              {
                requestoptions.map((option, index) => {
                  const options = {
                    key: option.name,
                    required: true,
                    inputname: option.name,
                    label: option.label,
                    onChange: onChange,
                    placeholder: option.placeholder,
                    requestNumber: requestIndex,
                    value: requestconfig[option.name]
                  }
                  if (option.name === "method") {
                    options.selectOptions = option.selectOptions
                    return <CustomSelect {...options} />
                  }
                  return <CustomInput {...options} />
                })
              }
            </div>)
      }
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" style={{ cursor: "pointer", margin: 10, height: "4vh", border: "none", borderRadius: 5, backgroundColor: "#3859CC", color: "#ffffff", fontSize: "1.3vw" }}>Create</button>
      </div>
    </div>
  );
}
export default RequestConfiguration;