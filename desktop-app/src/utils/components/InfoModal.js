const InfoModal = ({ title, desc, onclose }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
      <div style={{zIndex:10, display: "flex", backgroundColor: "gray", borderRadius: "1vw", padding: "1vw", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "50%" }}>
        <h1>{title}</h1>
        <p style={{ textAlign: "center", fontSize: "1.3vw" }}>{desc}</p>
        <button onClick={onclose} style={{ cursor: "pointer", width: "12%", borderRadius: "1vw", backgroundColor: "#007eff", color: "#ffffff", fontSize: "1vw", border: "none", height: "4vh" }}>Got it</button>
      </div>

    </div>
  );
}
export default InfoModal;