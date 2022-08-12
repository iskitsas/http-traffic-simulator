const ConfirmDialog = ({ dialog, onAction }) => {
  return (
    <div className="blurbackground-container" >
      <div style={{
        display: "flex", width: "30vw", height: "18vh", flexDirection: "column", alignItems: "center",
        backgroundColor: "gray",borderRadius:"5px",justifyContent:"center", alignSelf: "center"
      }}>
        <p>{dialog}</p>
        <div>
          <button onClick={() => onAction(0)} style={{backgroundColor:"white",border:"none",margin:"5px",cursor:"pointer"}}>Cancle</button>
          <button onClick={() => onAction(1)} style={{backgroundColor:"red",border:"none",margin:"5px",cursor:"pointer"}}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;