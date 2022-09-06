import Body from "../../Components/Home/Body";
import CreateModal from "../../Components/Home/CreateScenarioRequestModal";
import MenuBar from "../../Components/Home/MenuBar";

const Home=()=>{
  return(
    <div style={{height:"100%",width:"100%"}}>
      <MenuBar/>
      <Body/>
      <CreateModal />
    </div>
  );
}
export default Home;