import * as React from "react";
import { render } from "react-dom";
import "./styles.css";

import { RecursiveItem } from "./ReactiveItem";


  // #################################################################

function App() {
  return (
    <div className="App">
      <RecursiveItem x={50} y={50} name={"Root"} />
    </div>
  );
}

  // #################################################################

const rootElement = document.getElementById("root");
render(<App />, rootElement);
