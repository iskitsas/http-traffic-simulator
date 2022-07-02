import React, { useState } from 'react';
const HorizontalDragger = ({resizable}) => {
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);

  const initial = (e) => {
    setInitialPos(e.clientX);
    setInitialSize(resizable.offsetWidth);
  }

  const resize = (e) => {
    resizable.style.width = `${parseInt(initialSize) + parseInt(e.clientX - initialPos)}px`;
  }

  return (
    <>
      <div id='HorizontalDraggable'
        draggable={true}
        onDragStart={initial}
        onDrag={resize}
      />
    </>
  );
}
export default HorizontalDragger;