import * as React from "react";
import { render } from "react-dom";
import { Tag, Colors } from "@blueprintjs/core";
import "./styles.css";

import "@blueprintjs/core/lib/css/blueprint.css";
import { bool } from "prop-types";
//import "@blueprintjs/core/lib/css/blueprint-icons.css"

  // #################################################################

interface IRecursiveItemProps {
  name: string;
  x: number;
  y: number;
  depth?: number;
  onDimChanged?: (name:string, w: number, h: number, t:number, l:number) => void;
}

interface IRecursiveItemState {
  name: string;
  w: number;
  h: number;
  depth: number;
  renderedH: number;
  renderedW: number;
  updateDimPending:number;
}

  // #################################################################

class RecursiveItem extends React.Component<IRecursiveItemProps, IRecursiveItemState> {
  private static MarginLeft    = 20;
  private static MarginRight   = 20;
  private static MarginTop     = 10;
  private static MarginBottom  = 20;
  private static DefaultWidth  = 100;
  private static DefaultHeight = 100;
  private static DefaultBorderWitdh = 1;
  public constructor(props: IRecursiveItemProps) {
    super(props);
    console.log("constructor() " + props.name +" - " + props.depth);

    this.state = {
      name: props.name+' - ' + (props.depth !== undefined ? props.depth : 0),
      w: RecursiveItem.DefaultWidth,
      h: RecursiveItem.DefaultHeight,
      depth: props.depth !== undefined ? props.depth : 0,
      renderedW: 0,
      renderedH: 0,
      updateDimPending: 0
    };
  }

  // -------------------------------------------------------------------

  public componentDidMount() {
    this.setState((state)=> ({renderedW:state.w, renderedH:state.h}));

    console.log("componentDidMount() " + this.state.name +" | {" + this.state.w + "," + this.state.h + "}");
    if (this.props.onDimChanged !== undefined) {
      console.log("componentDidMount() " + this.state.name +" | propagate new dim to parent {" + this.state.w + "," + this.state.h + "}");
      this.props.onDimChanged(this.state.name, this.state.w, this.state.h, this.props.x, this.props.y);
    }
  }

  // -------------------------------------------------------------------

  public shouldComponentUpdate(nextProps:IRecursiveItemProps, nextState:IRecursiveItemState)
  {
    const r  = ((nextState.w !== this.state.w)||(nextState.h !== this.state.h));
    console.log("shouldComponentUpdate() " + this.state.name +" | previous {" + this.state.w + "," + this.state.h + "} / new {" + nextState.w + "," + nextState.h + "} returns " + r);
    return (r);
  }

  // -------------------------------------------------------------------

  public componentDidUpdate() {
    console.log("componentDidUpdate() " + this.state.name +" | previous {" + this.state.renderedW + "," + this.state.renderedH + "} / new {" + this.state.w + "," + this.state.h + "} - updateDimPending:"+ this.state.updateDimPending);

    if((this.state.w !== this.state.renderedW)||(this.state.h !== this.state.renderedH)|| this.state.updateDimPending>0){
      console.log("componentDidUpdate() - updateDimPending:"+ this.state.updateDimPending + " => "+ (this.state.updateDimPending-1));

      this.setState( (state) => ({ updateDimPending: state.updateDimPending - 1}) );
      if (this.props.onDimChanged !== undefined) {
        console.log("componentDidUpdate() " + this.state.name +" | propagate new dim to parent {" + this.state.w + "," + this.state.h + "}");
        this.props.onDimChanged(this.state.name, this.state.w, this.state.h, this.props.x, this.props.y);
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

  // -------------------------------------------------------------------

  public onChildDimChanged(name:string, width: number, height: number, left:number, top:number) {
    const w2 = Math.max(this.state.w, left + RecursiveItem.MarginLeft + width + RecursiveItem.MarginRight);
    const h2 = Math.max(this.state.h, top  + RecursiveItem.MarginTop + height + RecursiveItem.MarginBottom);

    console.log("onChildDimChanged() " + this.state.name + " | child: "+ name + " {" + width + "," + height + "} => {" + w2 + "," + h2 +"} - updateDimPending:"+ this.state.updateDimPending + " => "+ (this.state.updateDimPending+1));

    this.setState( (state) => ({ 
      w: Math.max(state.w, left + RecursiveItem.MarginLeft + width + RecursiveItem.MarginRight),
      h: Math.max(state.h, top + RecursiveItem.MarginTop + height + RecursiveItem.MarginBottom),
      updateDimPending: state.updateDimPending + 1 }) );
  }

  // -------------------------------------------------------------------

  public render() {
    console.log("render() " + this.state.name +" {" + this.state.w + "," + this.state.h + "}");
    if (this.state.depth < 5) {
      return (
        <div
          className="Item"
          style={{
            position: "absolute",
            top: RecursiveItem.MarginTop + this.props.y,
            left: RecursiveItem.MarginLeft + this.props.x,
            width: this.state.w,
            height: this.state.h,
            backgroundColor: Colors.COBALT4,
            borderColor: Colors.DARK_GRAY1,
            borderWidth: RecursiveItem.DefaultBorderWitdh
          }}
        >
          <Tag>
            {this.props.name} - {this.state.depth}
          </Tag>
          <RecursiveItem
            x={5}
            y={20}
            name={"Hello"}
            onDimChanged={(name,w,h,x,y) => this.onChildDimChanged(name,w,h,x,y)}
            depth={this.state.depth + 1}
          />
          <RecursiveItem
            x={100}
            y={100}
            name={"Coco"}
            onDimChanged={(name,w,h,x,y) => this.onChildDimChanged(name,w,h,x,y)}
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
            top: RecursiveItem.MarginTop + this.props.y,
            left: RecursiveItem.MarginLeft + this.props.x,
            width: this.state.w,
            height: this.state.h,
            backgroundColor: Colors.COBALT4,
            borderColor: Colors.DARK_GRAY1,
            borderWidth: RecursiveItem.DefaultBorderWitdh
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
