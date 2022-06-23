import React, { useState } from 'react';
import { useRef } from 'react';
import './response.css'
const Response = () => {
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const resizable = useRef()
  const initial = (e) => {
    // let resizable = document.getElementById('Resizable');
    setInitialPos(resizable.current.offsetTop);
    setInitialSize(resizable.current.offsetHeight);

  }

  const enddrag=()=>{
    if ((resizable.current.offsetTop - initialPos) > 0) { 
      resizable.current.style.height = `${parseInt(initialSize) - parseInt(resizable.current.offsetTop - initialPos)}px`;
    } else {
      resizable.current.style.height = `${parseInt(initialSize) + parseInt(initialPos - resizable.current.offsetTop)}px`;
    }
  }

  const resize = (e) => {
    console.log(resizable.current.offsetTop)
    if ((e.clientY - initialPos) > 0) { 
      resizable.current.style.height = `${parseInt(initialSize) - parseInt(e.clientY - initialPos)}px`;
    } else {
      resizable.current.style.height = `${parseInt(initialSize) + parseInt(initialPos - e.clientY)}px`;
    }
  }

  return (
    // <div className='Block'>
      <div ref={resizable} id='Resizable' >
        <div id='Draggable'
          onDragStart={initial}
          onDrag={resize}
          // onDragEnd={enddrag}
        ></div>
      </div>
      // </div>
  );
  // return(
  //   <div style={{resize:"vertical",overflowY:"auto", borderTop:"1px solid black",width:"75vw",minHeight:"10vh",bottom:0}}>
  //     <div draggable={true} style={{borderTop:"1px solid gray",height:"3px",backgroundColor:"gray",cursor:"n-resize"}}></div>
  //   </div>
  // );
}
export default Response;


