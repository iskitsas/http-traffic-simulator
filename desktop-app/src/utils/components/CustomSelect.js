const CustomSelect = ({ label, placeholder, value, onChange, inputname, requestNumber = null,required=false,selectOptions=[] }) =>{
  const oninputchange = (val) => {
    if (requestNumber === null)
      onChange(inputname, val)
    else
      onChange(inputname, val, requestNumber)
  }

  return(
    <div style={{
      width: "50%", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", marginBottom: 10
    }}>
      <label style={{ width: "90%", marginBottom: 5, fontSize: "1.2vw" }}>{label}</label>
      <select required={required} style={{ fontSize: "1.1vw", padding: 5, height: "5.5vh", width: "93%", borderRadius: 5,color:"#ffffff", outline: "none", border: "none",backgroundColor:"#323232" }}
        placeholder={placeholder} value={value} onChange={(e) => oninputchange(e.target.value)} >
          <option style={{backgroundColor:""}} value="">Select method</option>
          {
            selectOptions.map(option=><option style={{backgroundColor:""}} value={option.value}>{option.name}</option>)
          }
        </select>
    </div>
  );
}
export default CustomSelect;