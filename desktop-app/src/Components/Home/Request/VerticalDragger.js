import React, { useState } from 'react';
import './style.css'
const VerticalDragger = ({resizable}) => {
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const initial = (e) => {
    // e.target.style.backgroundColor="transparent"
    setInitialPos(e.clientY);
    setInitialSize(resizable.current.offsetHeight);
  }

  const resize = (e) => {
    resizable.current.style.height = `${parseInt(initialSize) + parseInt(e.clientY - initialPos)}px`;
  }

  return (
        <div id='Draggable'
        draggable={true}
          onDragStart={initial}
          onDrag={resize}
        ></div>
  );
}
export default VerticalDragger;


