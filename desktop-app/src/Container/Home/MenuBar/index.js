const MenuBar = () => {
  return (
    <div style={{ height: "5vh", backgroundColor: "#7B7B7B", display: "flex", alignItems: "center", padding: "0px 1.5vw" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ marginRight: 10, height: "3.4vh", width: "5.6vw", display: "flex", alignItems: "center" }}>
          <button style={{borderRadius:"3px 0px 0px 3px",textAlign:"center",padding:"0px", backgroundColor: "#3859CC", cursor: "pointer", border: "none",justifyContent:"center", height: "100%", display: "flex", flex: 1, color: "#ffffff", fontSize: "1vw",lineHeight:"30px", alignItems: "center",paddingRight:5 }}>
            <span style={{ backgroundColor: "#ffffff", width: "30%", color: "#3859CC", margin: "0px 5px",alignSelf:"center",height:"80%",lineHeight:"23px",borderRadius:3,fontSize:"1.4vw",fontWeight:"600" }}>+</span> New
          </button>
          <button style={{ backgroundColor: "#bfd8ff", cursor: "pointer", border: "none", height: "100%", fontSize: 10 ,borderRadius:"0px 3px 3px 0px"}}>\/</button>
        </div>
        <button style={{backgroundColor:"#949494",border:"none",borderRadius:"3px",color:"#ffffff",cursor:"pointer",margin:"0px 8px",fontSize:"1.1vw"}}>Import</button>
        <button style={{backgroundColor:"transparent",margin:"0px 5px",border:"none",cursor:"pointer",color:"#ffffff",fontSize:"1.1vw"}}>Project \/</button>
      </div>
      <div style={{display:"flex"}}>
        <div style={{height:"25px",width:"25px",borderRadius:"50%",backgroundColor:"blue"}}></div>
        <button style={{backgroundColor:"transparent",border:"none",cursor:"pointer",fontSize:"1.1vw"}}>\/</button>
      </div>
    </div>
  );
}
export default MenuBar;