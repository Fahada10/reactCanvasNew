import sample from "./reactImage.png"
import React, { useRef, useEffect, useState } from "react";
import CanvasDrag from "./canvasDND";

function App() {
  return (
    <div className="App">
      <CanvasDrag />
    </div>
  );
}

export default App;
