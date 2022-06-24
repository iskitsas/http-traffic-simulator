const RequestParams = ({ params, onChange, onAdd, onDelete }) => {

  const addMoreParams = () => {
    onAdd();
  }

  const deleteParam = (index) => {
    onDelete(index);
  }

  return (
    <div style={{ height: "94%", width: "100%" }}>
      <p style={{ margin: "2px 5px" }}>Query params</p>
      <div>
        <div style={{ borderBottom: "1px solid rgb(66, 66, 66)", width: "100%", borderTop: "1px solid rgb(66, 66, 66)", height: "3vh", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <button onClick={addMoreParams} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "1vw" }}>+</button>
          <p style={{userSelect:"none", padding: "0px 1%", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "30%", margin: 0 }}>KEY</p>
          <p style={{userSelect:"none", padding: "0px 1%", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "30%", margin: 0 }}>VALUE</p>
          <p style={{userSelect:"none", padding: "0px 1%", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "30%", margin: 0 }}>DESCRIPTION</p>
        </div>
        {
          params.map((param, index) =>
            <div style={{ borderBottom: "1px solid rgb(66, 66, 66)", width: "100%", height: "3vh", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              {params.length > 1 &&
                <button onClick={() => deleteParam(index)} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "1vw" }}>-</button>
              }
              <div style={{ padding: "0px", margin: "0px", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "32%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <input value={param.key} onChange={(e) => onChange("key", e.target.value, index)} style={{userSelect:"none", outline: "none", width: "96%" }} placeholder="Key" />
              </div>
              <div style={{ padding: "0px", margin: "0px", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "32%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <input value={param.value} onChange={(e) => onChange("value", e.target.value, index)} style={{userSelect:"none", outline: "none", width: "96%" }} placeholder="Value" />
              </div>
              <div style={{ padding: "0px", margin: "0px", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "32%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <input value={param.description} onChange={(e) => onChange("description", e.target.value, index)} style={{userSelect:"none", outline: "none", width: "96%" }} placeholder="Description" />
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
export default RequestParams;