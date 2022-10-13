import './style.css'
const CustomInput = ({ label, placeholder, value, onChange, inputname, requestNumber = null, required = false }) => {
  const oninputchange = (val) => {
    if (requestNumber === null)
      onChange(inputname, val)
    else
      onChange(inputname, val, requestNumber)
  }
  return (
    <div style={{
      width: "50%", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", marginBottom: 10
    }}>
      <label style={{ width: "90%", marginBottom: 5, fontSize: "1.2vw", color: "#52c2e0", fontWeight: "500" }}>{label}</label>
      <input className="custom-input-input" required={required}
        placeholder={placeholder} value={value} onChange={(e) => oninputchange(e.target.value)} />
    </div>
  );
}
export default CustomInput;