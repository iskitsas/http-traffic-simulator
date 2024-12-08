import { useEffect, useState } from "react";
import CustomInput from "../../../utils/components/CustomInput";
import { scenariooptions } from "./constants";
import infoIcon from "../../../assets/images/infoIcon.png"
import InfoModal from '../../../utils/components/InfoModal'

const ScenarioConfiguration = ({ onSet }) => {
  const [showInfo, setInfo] = useState(false)
  const [scenarioConfiguration, setConfiguration] = useState({
    scenarioname: "",
    duration: "", workers: "", totalclients: "", throttling: "", delay: ""
  })

  const onChange = (name, value) => {
    setConfiguration({ ...scenarioConfiguration, [name]: value })
  }
  const toggleInfo = () => {
    setInfo(prev => !prev)
  }
  useEffect(() => {
    onSet("scenario", scenarioConfiguration)
  }, [scenarioConfiguration])

  return (
    <div style={{ fontFamily: "sans-serif", color: "#ffffff", width: "100%", display: "flex", flexWrap: "wrap", height: "40%" }}>
      <div style={{ display: "flex", width: "100%" }}>
        <p style={{ fontSize: "1.5vw", width: "100%", margin: "5px 5px 5px 30px", fontWeight: "bold", color: "#3ea79b" }}>Scenario configuration</p>
        <button title='what is scenario' type="button" onClick={toggleInfo} style={{ alignItems: "center", backgroundColor: "transparent", border: "none", cursor: "pointer" }}><img style={{ width: "1.5vw" }} src={infoIcon} /></button>
      </div>
      {
        scenariooptions.map(option => {
          const options = {
            key: option.name,
            required: true,
            inputname: option.name,
            label: option.label,
            onChange: onChange,
            placeholder: option.placeholder,
            value: scenarioConfiguration[option.name],
          }
          return <CustomInput {...options} />
        })
      }
      {
        showInfo &&
        <InfoModal title="What is Scenario?"
         onclose={toggleInfo} 
         desc={"Scenario is a set of configurations that is used to stimulate the http request"} />
      }
    </div>
  );
}
export default ScenarioConfiguration;