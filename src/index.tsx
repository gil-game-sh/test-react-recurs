import * as React from "react";
import { render } from "react-dom";
import { Tag, Colors } from "@blueprintjs/core";
import "./styles.css";

import "@blueprintjs/core/lib/css/blueprint.css";
//import "@blueprintjs/core/lib/css/blueprint-icons.css"

interface IRecursiveItemProps {
  name: string;
  x: number;
  y: number;
  depth?: number;
  onDimChanged?: (name:string, w: number, h: number) => void;
}

interface IRecursiveItemState {
  name: string;
  w: number;
  h: number;
  depth: number;
  propagatedH: number;
  propagatedW: number;
}

class RecursiveItem extends React.Component<IRecursiveItemProps, IRecursiveItemState> {
  public constructor(props: IRecursiveItemProps) {
    super(props);
    console.log("constructor() " + props.name +" - " + props.depth);

    this.state = {
      name: props.name+' - ' + (props.depth !== undefined ? props.depth : 0),
      w: 50,
      h: 50,
      depth: props.depth !== undefined ? props.depth : 0,
      propagatedW: 0,
      propagatedH: 0
    };
  }

  public componentDidMount() {
    console.log("componentDidMount() " + this.state.name +" {" + this.state.w + "," + this.state.h + "}");
    if (this.props.onDimChanged !== undefined) {
      console.log("componentDidMount() " + this.state.name +" propagate new dim to parent");
      this.props.onDimChanged(this.state.name, this.state.w, this.state.h);
    }
  }
  public onChildDimChanged(name:string, width: number, height: number) {
    const w2 = width*2;
    const h2 = height*2;
    console.log("onChildDimChanged() " + this.state.name + " / child: "+ name + " {" + width + "," + height + "} => {" + w2 + "," + h2 +"}");
    this.setState({ w: w2, h: h2 });
  }

  public render() {
    console.log("render() " + this.state.name +" {" + this.state.w + "," + this.state.h + "}");
    if (this.state.depth < 2) {
      return (
        <div
          className="Item"
          style={{
            position: "absolute",
            top: this.props.y,
            left: this.props.x,
            width: this.state.w,
            height: this.state.h,
            backgroundColor: Colors.COBALT1,
            borderColor: Colors.DARK_GRAY1,
            borderWidth: 5
          }}
        >
          <Tag>
            {this.props.name} - {this.state.depth}
          </Tag>
          <RecursiveItem
            x={5}
            y={20}
            name={"Hello"}
            onDimChanged={(name,w,h) => this.onChildDimChanged(name,w,h)}
            depth={this.state.depth + 1}
          />
        </div>
      );
    } else {
      return (
        <div
          className="Item"
          style={{
            position: "absolute",
            top: this.props.y,
            left: this.props.x,
            width: this.state.w,
            height: this.state.h,
            backgroundColor: Colors.COBALT1,
            borderColor: Colors.DARK_GRAY1,
            borderWidth: 5
          }}
        >
          <Tag>
            {this.props.name} - {this.state.depth}
          </Tag>
        </div>
      );
    }
  }
}

function App() {
  return (
    <div className="App">
      <RecursiveItem x={5} y={5} name={"Hello"} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
