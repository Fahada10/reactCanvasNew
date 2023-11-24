import React, { useRef, useEffect, useState } from "react";

import CanvasDrag from "./canvasDND";

import sample from "./reactImage.png"

function App() {
  return (
    <div className="App">
      <CanvasDrag />
    </div>
  );
}

export default App;
