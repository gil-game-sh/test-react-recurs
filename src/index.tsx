import * as React from "react";
import { render } from "react-dom";
import { Tag, Colors } from "@blueprintjs/core";
import "./styles.css";

import "@blueprintjs/core/lib/css/blueprint.css";
//import "@blueprintjs/core/lib/css/blueprint-icons.css"

interface IITemProps {
  name: string;
  x: number;
  y: number;
  depth?: number;
  onDimChanged?: (w: number, h: number) => void;
}

interface IITemState {
  w: number;
  h: number;
  depth: number;
  propagatedH: number;
  propagatedW: number;
}

class Item extends React.Component<IITemProps, IITemState> {
  public constructor(props: IITemProps) {
    super(props);
    this.state = {
      w: 50,
      h: 50,
      depth: props.depth !== undefined ? props.depth : 0,
      propagatedW: 0,
      propagatedH: 0
    };
  }

  static getDerivedStateFromProps(props: IITemProps, state: IITemState) {
    return {
      w: 100,
      h: 100
    };
  }

  public componentDidMount() {
    if (
      this.state.w !== this.state.propagatedW ||
      this.state.w !== this.state.propagatedW
    ) {
      this.setState({ propagatedW: this.state.w, propagatedH: this.state.h });
      if (this.props.onDimChanged !== undefined) {
        this.props.onDimChanged(this.state.w, this.state.h);
      }
    }
  }
  private onChildDimChanged(w: number, h: number) {
    console.log("onChildDimChanged" + w + " " + h);
    //    this.setState({ w: w * 2, h: h * 2 });
  }

  public render() {
    if (this.state.depth < 4) {
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
          <Item
            x={5}
            y={20}
            name={"Hello"}
            onDimChanged={this.onChildDimChanged}
            depth={this.state.depth + 1}
          />
        </div>
      );
    } else {
      return (
        <div
          classItem="Item"
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
      <Item x={5} y={5} name={"Hello"} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
