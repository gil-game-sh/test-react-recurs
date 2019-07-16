import { Tag, Colors, Navbar, Alignment, Popover, Tooltip, Position, Text } from "@blueprintjs/core";
import React from "react";


// #################################################################

interface IRecursiveItemHeaderProps{
  title:string;
  value:string;
}

class RecursiveItemHeader extends React.Component<IRecursiveItemHeaderProps>{
  public render(){
    return (
      <div className="TimelineItemHeader" style={{backgroundColor:Colors.LIGHT_GRAY1, borderWidth:1, fontSize:10, textAlign:"center", height:12, width:"100%"}} >
      <Popover content={<h1>{this.props.value}</h1>} position={Position.TOP}>
        <Tooltip content={this.props.title} position={Position.TOP}>
          <Text ellipsize={true}>{this.props.title}</Text>
        </Tooltip>
      </Popover>
      </div>
    );
  }  
}

// #################################################################
export interface IDataset {
  name:string,
  begin:number,
  end?:number,
  data?:IDataset[]
}



// #################################################################

  export interface IRecursiveItemProps {
    depth?: number;
    data:IDataset,
    onDimChanged?: (name:string, w: number, h: number, x:number, y:number) => void;
    scale:number;
//    key:number;
    offset_date?:number;
    offset_x?:number;
  }
  
interface IChildCtx{
    idx:number;
    offset_x:number;
    col_idx:number;
  }

  interface IRecursiveItemState {
    name: string;
    x: number; // a remplacer par begin
    y: number; // a gerer automatiquement
    w: number; // a calculer a partir de data.begin
    h: number; // a calculer a partir de data.end -begin
    renderedH: number;
    renderedW: number;
    updateDimPending:number;
    childrenCtx:IChildCtx[];
  }
  
    // #################################################################
  
    export class RecursiveItem extends React.Component<IRecursiveItemProps, IRecursiveItemState> {
    public static MarginLeft    = 10;
    public static MarginRight   = 10;
    public static MarginTop     = 0;
    public static MarginBottom  = 0;
    public static DefaultWidth   = 100;
    public static DefaultHeight = 100; // Default height when item end is not defined, otherwise value is IDataset.end-IDataset.begin
    public static columnMargin  = 0;
    public static columnWidth    = 250;
    public static DefaultBorderWitdh = 1;

    // -------------------------------------------------------------------

    private static keycount = 0;

    // -------------------------------------------------------------------

    public constructor(props: IRecursiveItemProps) {
      super(props);
      console.log("constructor() " + props.data.name +" - depth:" + props.depth);
  
      this.state = {
        name: props.data.name+' - ' + (props.depth !== undefined ? props.depth : 0),
        x:props.offset_x!==undefined?props.offset_x:0,
        y:0,
        w: RecursiveItem.DefaultWidth,
        h: 0,
        renderedW: 0,
        renderedH: 0,
        updateDimPending: 0,
        childrenCtx: new Array(props.data.data?props.data.data.length:0)
      };
    }
  
    // -------------------------------------------------------------------
    // getDerivedStateFromProps()
    // Brief : After construction or state change, calculate new state
    // return new state
    public static getDerivedStateFromProps(props:IRecursiveItemProps, state:IRecursiveItemState){
      console.log("getDerivedStateFromProps() " + props.data.name );

      const name = props.data.name;

      // manage colum, for each child select on which column is displayed
      let col_end:number[] = new Array(10); // col_end contains the higher date in the column
      let col_idx:number = 0;   // idx for column analyse

      
      // calculate position of each child
      let idx=0;
      if( undefined !== props.data.data){
        state.childrenCtx = new Array(props.data.data.length);
        props.data.data.forEach(d => {
          let offset_x = RecursiveItem.columnMargin;
          col_idx = 0;
          const h:number = d.end?d.end-d.begin:10;
          while( (col_idx < col_end.length) && (d.begin < col_end[col_idx]) ) { col_idx++; } ;
          col_end[col_idx] = d.begin + h;
          offset_x += col_idx*RecursiveItem.columnWidth;
          state.childrenCtx[idx++] = { idx, offset_x, col_idx}
        });
      }

      // calc position
      const y = props.data.begin * props.scale - (props.offset_date!==undefined ?props.offset_date:0);
      // calc dimension
      const h = ((props.data.end !== undefined)?props.data.end - props.data.begin:RecursiveItem.DefaultHeight)* props.scale;
      // return updated state
      if(state.updateDimPending>0){
        return Object.assign({}, {name, y, w:state.w, h }  );
      }
      else{
        return Object.assign({}, {name, y, h }  );
      }
    }

    // -------------------------------------------------------------------
    // componentDidMount()
    // Brief : After first render(), notify parent to adjust it size if position/dimension has changed 
    public componentDidMount() {
      this.setState((state)=> ({renderedW:this.state.w, renderedH:this.state.h}));
  
      if (this.props.onDimChanged !== undefined) {
        console.log("componentDidMount() " + this.state.name +" | propagate new dim to parent {x:" + this.state.x + ", y:" + this.state.y + ", w:" + this.state.w + ", h:" + this.state.h + "}");
        this.props.onDimChanged(this.state.name, this.state.w, this.state.h, this.state.x, this.state.y);
      }
      else{
        console.log("componentDidUpdate() " + this.state.name +" | cannot propagate new dim to parent (no callback)");
      }
    }
    
    // -------------------------------------------------------------------
    // componentDidUpdate()
    // Brief : After render(), notify parent to adjust it size if position/dimension has changed 
  
    public componentDidUpdate() {
      console.log("componentDidUpdate() " + this.state.name +" | previous {" + this.state.renderedW + "," + this.state.renderedH + "} / new {" + this.state.w + "," + this.state.h + "} - updateDimPending:"+ this.state.updateDimPending);
  
      if((this.state.w !== this.state.renderedW) || (this.state.h !== this.state.renderedH) || this.state.updateDimPending>0){
        console.log("componentDidUpdate() - updateDimPending:"+ this.state.updateDimPending + " => "+ (this.state.updateDimPending-1));
  
        this.setState( (state) => ({ updateDimPending: state.updateDimPending - 1}) );
        if (this.props.onDimChanged !== undefined) {
          console.log("componentDidUpdate() " + this.state.name +" | propagate new dim to parent {" + this.state.w + "," + this.state.h + "}");
          this.props.onDimChanged(this.state.name, this.state.w, this.state.h, this.state.x, this.state.y);
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
  
      public shouldComponentUpdate(nextProps:IRecursiveItemProps, nextState:IRecursiveItemState)
      {
        const r  = ( (nextState.w !== this.state.w)||(nextState.h !== this.state.h)||(this.state.updateDimPending>0) );
        console.log("shouldComponentUpdate() " + this.state.name +" | previous {" + this.state.w + "," + this.state.h + "} / new {" + nextState.w + "," + nextState.h + "} / updatePending : " + this.state.updateDimPending +" returns " + r);
        return (r);
      }

    // -------------------------------------------------------------------

    public onChildDimChanged(name:string, width: number, height: number, left:number, top:number) {
      const w2 = Math.max(this.state.w, left + RecursiveItem.MarginLeft + width + RecursiveItem.MarginRight);
      const h2 = Math.max(this.state.h, top  + RecursiveItem.MarginTop + height + RecursiveItem.MarginBottom);

      console.log("onChildDimChanged() " + this.state.name + " actual size {w:" + this.state.w + ", h:" + this.state.h +"} | child: "+ name + " dim = {" + width + "," + height + "} => new parent dim = {" + w2 + "," + h2 +"} - updateDimPending:"+ this.state.updateDimPending + " => "+ (this.state.updateDimPending+1));

      if( (this.state.w != w2) || (this.state.h != h2) ){
        this.setState( (state) => ({ 
          w: Math.max(this.state.w, left + RecursiveItem.MarginLeft + width + RecursiveItem.MarginRight),
          h: Math.max(this.state.h, top + RecursiveItem.MarginTop + height + RecursiveItem.MarginBottom),
          updateDimPending: 1 }) );
      }
    }
  
    // -------------------------------------------------------------------
    public render_child(s:IDataset,ctx:IChildCtx){
      console.log("render_child() " + s.name + " | begin: "+ s.begin + " end:" + s.end + " offset_pos: " + ctx.offset_x);
      return(
          <RecursiveItem key={RecursiveItem.keycount++} offset_x={ctx.offset_x} data={s} offset_date={this.props.data.begin} scale={this.props.scale} depth={ (this.props.depth!==undefined)?(this.props.depth+1):1 } onDimChanged={(name, w,h,x,y) => this.onChildDimChanged(name, w,h,x,y) } />
        );
    }
    public render_children(){
      if(this.props.data.data !== undefined){
        console.log("render_children() " + this.props.data.name + " | children count: "+ this.props.data.data.length );
        let idx=0;
        return ( this.props.data.data.map( dataset => 
          this.render_child(dataset,this.state.childrenCtx[idx++])
        ) );
      }
      else{
        console.log("render_children() " + this.props.data.name + " | NO child " );
      }
    }
    // -------------------------------------------------------------------

    public render() {
      console.log("render() " + this.state.name +" {x:" + this.state.x +", y:" + this.state.y +", w:" + this.state.w + ", h:" + this.state.h + "}");

      return (
        <div
          className="Item"
          style={{
            position: "absolute",
            top: RecursiveItem.MarginTop + this.state.y,
            left: RecursiveItem.MarginLeft + this.state.x,
            width: this.state.w,
            height: this.state.h,
            backgroundColor:"#00FFAA22",
            borderColor:Colors.BLUE3,
            borderWidth: RecursiveItem.DefaultBorderWitdh,
            fontSize:10,
          }}
        >
          {/* header */}
          <RecursiveItemHeader title={this.props.data.begin +' - ' + this.props.data.end} value={this.props.data.name} />
          <Tag> {this.props.data.begin} - {this.props.data.end} </Tag>

          {/* Render Children */ }
          { this.render_children() }

        </div>
      );
    }
  }
  