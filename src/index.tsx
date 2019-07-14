import * as React from "react";
import { render } from "react-dom";
import { Tag, Colors } from "@blueprintjs/core";
import "./styles.css";

import "@blueprintjs/core/lib/css/blueprint.css";
import { bool } from "prop-types";
//import "@blueprintjs/core/lib/css/blueprint-icons.css"

interface IRecursiveItemProps {
  name: string;
  x: number;
  y: number;
  depth?: number;
  onDimChanged?: (name:string, w: number, h: number) => void;
}

interface IChild{
  key:string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface IRecursiveItemState {
  name: string;
  w: number;
  h: number;
  depth: number;
  renderedH: number;
  renderedW: number;
  children?:IChild[];
  updateDimPending:number;
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
      renderedW: 0,
      renderedH: 0,
      children:undefined,
      updateDimPending: 0
    };
  }

  public componentDidMount() {
    this.setState((state)=> ({renderedW:state.w, renderedH:state.h}));

    console.log("componentDidMount() " + this.state.name +" | {" + this.state.w + "," + this.state.h + "}");
    if (this.props.onDimChanged !== undefined) {
      console.log("componentDidMount() " + this.state.name +" | propagate new dim to parent {" + this.state.w + "," + this.state.h + "}");
      this.props.onDimChanged(this.state.name, this.state.w, this.state.h);
    }
  }

  public shouldComponentUpdate(nextProps:IRecursiveItemProps, nextState:IRecursiveItemState)
  {
    const r  = ((nextState.w !== this.state.w)||(nextState.h !== this.state.h));
    console.log("shouldComponentUpdate() " + this.state.name +" | previous {" + this.state.w + "," + this.state.h + "} / new {" + nextState.w + "," + nextState.h + "} returns " + r);
    return (r);
  }

  public componentDidUpdate() {
    console.log("componentDidUpdate() " + this.state.name +" | previous {" + this.state.renderedW + "," + this.state.renderedH + "} / new {" + this.state.w + "," + this.state.h + "} - updateDimPending:"+ this.state.updateDimPending);

    if((this.state.w !== this.state.renderedW)||(this.state.h !== this.state.renderedH)|| this.state.updateDimPending>0){
      console.log("componentDidUpdate() - updateDimPending:"+ this.state.updateDimPending + " => "+ (this.state.updateDimPending-1));

      this.setState( (state) => ({ updateDimPending: state.updateDimPending - 1}) );
      if (this.props.onDimChanged !== undefined) {
        console.log("componentDidUpdate() " + this.state.name +" | propagate new dim to parent {" + this.state.w + "," + this.state.h + "}");
        this.props.onDimChanged(this.state.name, this.state.w, this.state.h);
      }
      else{
        console.log("componentDidUpdate() " + this.state.name +" | cannot propagate new dim to parent (no callback)");
      }
    }
    else
    {
      console.log("componentDidUpdate() " + this.state.name +" | don't propagate new dim to parent (unchanged)");
    }
    this.setState((state)=> ({renderedW:state.w, renderedH:state.h}));
  }

  public onChildDimChanged(name:string, width: number, height: number) {
    const w2 = this.state.w + width*2;
    const h2 = this.state.w + height*2;
    console.log("onChildDimChanged() " + this.state.name + " | child: "+ name + " {" + width + "," + height + "} => {" + w2 + "," + h2 +"} - updateDimPending:"+ this.state.updateDimPending + " => "+ (this.state.updateDimPending+1));

    // following form is prefered because 
    this.setState( (state) => ({ 
      w: state.w + width, 
      h: state.h + height,
      updateDimPending: state.updateDimPending + 1 }) );
  }

  public render() {
    console.log("render() " + this.state.name +" {" + this.state.w + "," + this.state.h + "}");
    if (this.state.depth < 3) {
      return (
        <div
          className="Item"
          style={{
            position: "absolute",
            top: this.props.y,
            left: this.props.x,
            width: this.state.w,
            height: this.state.h,
            backgroundColor: Colors.COBALT4,
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
            backgroundColor: Colors.COBALT4,
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
