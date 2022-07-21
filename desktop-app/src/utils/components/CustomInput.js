const CustomInput = ({ label, placeholder, value, onChange, inputname, requestNumber = null,required=false }) => {
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
      <label style={{ width: "90%", marginBottom: 5, fontSize: "1.2vw" }}>{label}</label>
      <input required={required} style={{color:"#ffffff",backgroundColor:"#323232", fontSize: "1.1vw", padding: 5, height: "4vh", width: "90%", borderRadius: 5, outline: "none", border: "none" }}
        placeholder={placeholder} value={value} onChange={(e) => oninputchange(e.target.value)} />
    </div>
  );
}
export default CustomInput;