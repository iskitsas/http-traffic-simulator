import { useEffect, useState } from "react";

const RandomPattern = () => {
  const [patternArray,setPattern] = useState([[],[],[],[],[]])
  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const random = Math.random()
        setPattern([...patternArray,patternArray[i][j]=Math.round(random)]);
      }
    }
  }, [])
  return (
    <div style={{height:"4vh",width:"2.5vw",backgroundColor:"red",display:"flex",flexWrap:"wrap",borderRadius:"5px",overflow:"hidden"}}>
      {
        patternArray[0]?.map((pattern,index) => <div key={`${pattern} ${index} 0`} style={{ width: "0.5vw", height: "1vh",backgroundColor:pattern?"#000000":"#ffffff" }}></div>)
      }
      {
        patternArray[1]?.map((pattern,index) => <div key={`${pattern} ${index} 1`} style={{ width: "0.5vw", height: "1vh",backgroundColor:pattern?"#000000":"#ffffff" }}></div>)
      }
      {
        patternArray[2]?.map((pattern,index) => <div key={`${pattern} ${index} 2`} style={{ width: "0.5vw", height: "1vh",backgroundColor:pattern?"#000000":"#ffffff" }}></div>)
      }
      {
        patternArray[3]?.map((pattern,index) => <div key={`${pattern} ${index} 3`} style={{ width: "0.5vw", height: "1vh",backgroundColor:pattern?"#000000":"#ffffff" }}></div>)
      }
      {
        patternArray[4]?.map((pattern,index) => <div key={`${pattern} ${index} 4`} style={{ width: "0.5vw", height: "1vh",backgroundColor:pattern?"#000000":"#ffffff" }}></div>)
      }
    </div>
  );
}
export default RandomPattern;