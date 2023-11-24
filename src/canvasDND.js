import React, { useRef, useEffect } from "react";
import sampleImage from "./reactImage.png"

function CanvasDrag() {
  const canvas = useRef();
  let getCtx = null;
  const [canBoxes, setCanBoxes] = React.useState({ x: 0, y: 0, w: 120, h: 70 });
  let isMoveDown = false;
  let targetCanvas = null;
  let startX = null;
  let startY = null;

  useEffect(() => {
    const canvasDimensions = canvas.current;
    canvasDimensions.width = canvasDimensions.clientWidth;
    canvasDimensions.height = canvasDimensions.clientHeight;
    getCtx = canvasDimensions.getContext("2d");
  }, [canBoxes]);
  useEffect(() => {
    canvasDraw();
  }, [canBoxes]);
  const canvasDraw = () => {
    fillCanvas(canBoxes);
  };
  const fillCanvas = (info) => {
    console.log(info)
    const { x, y, w, h } = info;
    const image = new Image();
    image.src = sampleImage;
    image.onload = () => {
      getCtx?.clearRect(
        0,
        0,
        canvas.current.clientWidth,
        canvas.current.clientHeight,
      );
      getCtx?.drawImage(image, x, y, w, h);
    };
  };
  const moveableItem = (x, y) => {
    let isCanvasTarget = null;
    const block = canBoxes;
    if (
      x >= block.x &&
      x <= block.x + block.w &&
      y >= block.y &&
      y <= block.y + block.h
    ) {
      targetCanvas = block;
      isCanvasTarget = true;
    }

    return isCanvasTarget;
  };
  const onMouseDown = (e) => {
    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    isMoveDown = moveableItem(startX, startY);
  };
  const onMouseMove = (e) => {
    if (!isMoveDown) return;
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const mouseStartX = mouseX - startX;
    const mouseStartY = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    targetCanvas.x += mouseStartX;
    targetCanvas.y += mouseStartY;
    canvasDraw();
  };
  const onMouseUp = (e) => {
    targetCanvas = null;
    isMoveDown = false;
  };
  const onMouseOut = (e) => {
    onMouseUp(e);
  };
  const deleImage = () => {
    getCtx?.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight,
    );
  }

  const resetCanvas = () => {
    setCanBoxes({ x: 0, y: 0, w: 120, h: 70 })
  }

  return (
    <div style={{ display: "flex", width: "100%", height: "80vh", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <canvas
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        ref={canvas}
        width={700}
        height={500}
        style={{
          border: "2px solid #333",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      ></canvas>
      <div>
        <button
          onClick={deleImage}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Delete
        </button>
        <button
          onClick={resetCanvas}
          style={{
            backgroundColor: "#4CAF50", // Green background
            marginLeft: "5px",
            color: "white", // White text
            padding: "10px 20px", // Padding
            border: "none", // No border
            borderRadius: "5px", // Rounded corners
            cursor: "pointer", // Pointer cursor on hover
            fontSize: "16px", // Font size
          }}
        >
          Reset
        </button>
      </div>

    </div>
  );

}
export default CanvasDrag;