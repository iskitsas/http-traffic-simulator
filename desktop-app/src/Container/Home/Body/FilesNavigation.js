const FilesNavigation = () => {
  return (
    <div style={{ display: "flex", borderRight: "1px solid gray", flexDirection: "column", justifyContent: "space-between", height: "91.3vh", width: "25vw" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10%",borderBottom:"1px solid black"}}>
        <input placeholder="Search scenario"
         style={{ padding: 5, justifyContent: "center",
          alignItems: "center", display: "flex", backgroundColor: "#d6d6d6",
           border: "1px solid black", borderRadius: "5px", height: "30%",outline:"none", width: "80%", color: "#000000" }} />
      </div>
    </div>
  );
}
export default FilesNavigation;