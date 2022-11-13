const AlertModal = ({ title, desc, oncancel, oncloseAll }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
      <div style={{ zIndex: 10, display: "flex", backgroundColor: "gray", borderRadius: "1vw", padding: "1vw", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "50%" }}>
        <h1>{title}</h1>
        <p style={{ textAlign: "center", fontSize: "1.3vw" }}>{desc}</p>
        <div style={{ display: "flex", width: "60%", justifyContent: "space-evenly", alignItems: "center" }}>
          <button onClick={oncancel} style={{ cursor: "pointer", width: "30%", borderRadius: "1vw", backgroundColor: "#2d2d2d", color: "#ffffff", fontSize: "1vw", border: "none", height: "4vh" }}>Cancel</button>
          <button onClick={oncloseAll} style={{ cursor: "pointer", width: "30%", borderRadius: "1vw", backgroundColor: "#007eff", color: "#ffffff", fontSize: "1vw", border: "none", height: "4vh" }}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
export default AlertModal;