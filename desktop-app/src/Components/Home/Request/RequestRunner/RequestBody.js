const RequestBody=({bodyData})=>{
  return(
    <div style={{ height: "90%", width: "100%" }}>
    {/* <p style={{ margin: "2px 5px" }}>configs</p> */}
    <div>
      <div style={{ borderBottom: "1px solid rgb(66, 66, 66)", width: "100%", borderTop: "1px solid rgb(66, 66, 66)", height: "3vh", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <p style={{ padding: "0px 1%", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "30%", margin: 0 }}>KEY</p>
        <p style={{ padding: "0px 1%", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "30%", margin: 0 }}>VALUE</p>
        <p style={{ padding: "0px 1%", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "30%", margin: 0 }}>DESCRIPTION</p>
      </div>
      {
        bodyData.map(param =>
          <div style={{ borderBottom: "1px solid rgb(66, 66, 66)", width: "100%", height: "3vh", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <div style={{ padding: "0px", margin: "0px", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "32%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <input style={{outline:"none", width: "96%" }} placeholder="Key" />
            </div>
            <div style={{ padding: "0px", margin: "0px", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "32%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <input style={{outline:"none", width: "96%" }} placeholder="Value" />
            </div>
            <div style={{ padding: "0px", margin: "0px", borderLeft: "1px solid rgb(66, 66, 66)", height: "100%", width: "32%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <input style={{outline:"none", width: "96%" }} placeholder="Description" />
            </div>
          </div>
        )
      }
    </div>
  </div>
  );
}
export default RequestBody;