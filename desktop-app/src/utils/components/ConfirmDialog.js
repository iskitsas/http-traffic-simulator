const ConfirmDialog = ({ dialog, onAction }) => {
  return (
    <div className="blurbackground-container" >
      <div style={{
        display: "flex", width: "30vw", height: "18vh", flexDirection: "column", alignItems: "center",
        backgroundColor: "gray",borderRadius:"5px",justifyContent:"center", alignSelf: "center"
      }}>
        <p>{dialog}</p>
        <div>
          <button onClick={() => onAction(0)} style={{height:"100%",fontWeight:"600",borderRadius:"0.5vw",backgroundColor:"white",border:"none",margin:"5px",cursor:"pointer"}}>Cancel</button>
          <button onClick={() => onAction(1)} style={{height:"100%",fontWeight:"600",borderRadius:"0.5vw",backgroundColor:"red",border:"none",margin:"5px",cursor:"pointer",color:"#ffffff"}}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;