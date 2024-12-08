import "./style.css"
const CustomSelect = ({ label, placeholder, value, onChange, inputname, requestNumber = null, required = false, selectOptions = [] }) => {
  const oninputchange = (val) => {
    if (requestNumber === null)
      onChange(inputname, val)
    else
      onChange(inputname, val, requestNumber)
  }

  return (
    <div className="custom-select-div">
      <label style={{ width: "90%", marginBottom: 5, fontSize: "1.2vw", color: "#52c2e0" }}>{label}</label>
      <select required={required} className="custom-select-select"
        placeholder={placeholder} value={value} onChange={(e) => oninputchange(e.target.value)} >
        <option style={{ color: "#b0b0b0" }} value="">Select method</option>
        {
          selectOptions.map(option => <option style={{ backgroundColor: "" }} value={option.value}>{option.name}</option>)
        }
      </select>
    </div>
  );
}
export default CustomSelect;