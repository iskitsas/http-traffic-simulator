import React, { useState } from 'react';
import './style.css'
const Dragger = ({resizable}) => {
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const initial = (e) => {
    setInitialPos(e.clientY);
    setInitialSize(resizable.current.offsetHeight);
  }

  const resize = (e) => {
    resizable.current.style.height = `${parseInt(initialSize) + parseInt(e.clientY - initialPos)}px`;
  }

  return (
        <div id='Draggable'
          onDragStart={initial}
          onDrag={resize}
        ></div>
  );
}
export default Dragger;

