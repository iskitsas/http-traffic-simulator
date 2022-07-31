import './style.css'
const FilesNavigation = () => {
  return (
    <div style={{ display: "flex", borderRight: "1px solid rgb(66, 66, 66)", flexDirection: "column", justifyContent: "space-between", height: "91.3vh", width: "25vw" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10%",borderBottom:"1px solid rgb(66, 66, 66)"}}>
        <input id='search-files-input' placeholder="Search scenario"
         style={{ padding: 5, justifyContent: "center",
          alignItems: "center", display: "flex",
           border: "1px solid rgb(66, 66, 66)", borderRadius: "5px", height: "30%",outline:"none", width: "80%" }} />
      </div>
    </div>
  );
}
export default FilesNavigation;