import * as React from "react";
import { render } from "react-dom";
import "./styles.css";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css";

import { RecursiveItem, IDataset } from "./RecursiveItem";


const dataset:IDataset = { name: "item1", begin:10, end:1000, data:
  [
    { name: "item11", begin:10, end:500, data:[
        { name: "item111", begin:60, end:80 },
        { name: "item112", begin:100, end:145 }
      ]
    },
    { name: "item12", begin:60, end:100 },
    { name: "item13", begin:600, end:800 }
  ]
};

  // #################################################################

function App() {
  return (
    <div className="App">
      <RecursiveItem key={-1} data={dataset} scale={1} />
    </div>
  );
}

  // #################################################################

const rootElement = document.getElementById("root");
render(<App />, rootElement);
