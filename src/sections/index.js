import React from 'react';
import CreateMenu from './CreateMenu'
import SplitPane from 'react-split-pane';
import {LeftPanel, RightPanel, Panels, ResizerPanel} from './style.js'
import {createMapping, createJsonFile, populateOptions} from './util';
import {addNewOption} from './addingNewOptions';
import MenuVis from './MenuVis';
import PriceSetVis from './PriceSetVis';

// {
//   id : "cb" + this.counter.cb++,
//   name : "Fully Assembled",
//   type : "checkbox",
//   priceDiff : false,
//   selected : false
// },{
//   id : "dd" + this.counter.dd++,
//     name : "Holder",
//     type : "dropdown",
//     priceDiff : false,
//     selected : "",
//     items : [{id:"dd0t1", name:"One Holder"},{id:"dd0t2", name:"Two Holder"}]
// },{
//   id : "cp" + this.counter.cp++,
//   name : "Color",
//   type : "colorpicker",
//   priceDiff : false,
//   colorId : "",
//   colorInclusion:"all",
//   items : [{id: "atm-neongreen", name: "Atomic Trans Neon Green"},
//           {id: "hb-green", name: "HatchBox Green"},
//           {id: "hb-gold", name: "HatchBox Gold"},
//           {id: "pru-opalgreen", name: "Prusa Opal Green"},
//           {id: "hb-blue", name: "HatchBox Blue"},
//           {id: "php-oceanblue", name: "Push Ocean Blue"}]
// },{
//   id : "cp" + this.counter.cp++,
//   name : "Color2",
//   type : "colorpicker",
//   priceDiff : false,
//   colorId : "",
//   colorInclusion:"all",
//   items : []
// }


class Sections extends React.Component {
  //TODO:Deal with a file being loaded with exisiting counters
  counter = {cb: 0, dd: 0, cp: 0};

  state = {
    height : window.innerHeight - 70,
    mapping : {},
    stl: {},
    models: [],
    numVarients : 0,
    options : []
  }

  determineNumberofVarients = (options) => {
    var res = options.reduce((sum, option) => {
      if(option.priceDiff){
        if(option.type === "colorpicker"){
          return sum * 3;
        } else if(option.type === "dropdown"){
          return sum * ((option.items.length === 0) ? 1 : option.items.length);
        } else if(option.type === "checkbox"){
          return sum * 2;
        } else {
          console.log("Type not implemented for Counting")
          return sum;
        }
      }
      return sum;
    }, 1);
    return res;
  }

  handleAddingNewOptions = (optiontype) => {
    if(optiontype === 'checkbox' || optiontype === 'dropdown'
      || optiontype === 'colorpicker' || optiontype === 'section'){
      const options = this.state.options.slice();
      options.push(addNewOption(optiontype, this.counter));
      this.setState({options : options,
        numVarients : this.determineNumberofVarients(options)});
    }  else if(optiontype === 'stl'){
      const newStl = {
        camera: {x:0, y:0, z:0},
        position: {x:0, y:0, z:0},
        scale: {x:1.0, y:1.0, z:1.0},
        mindist: 20,
        maxdist: 60,
        type : "stl",
      };
      this.setState({stl : newStl});
    } else if(optiontype === 'model'){
      const models = this.state.models.slice();
      models.push();
      this.setState({models : models});      
    } else {
      console.log("Option type "+ optiontype + " is not implemented for Add");
    }
    
  }

  handleUpdateingOptions = (idx, event) => {
    const options = this.state.options.slice();
    const {name, value, type, checked} = event.target
    if (type === "checkbox") {
      options[idx][name] = checked;
    } else {
      options[idx][name] = value;
    }
    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)});
  }

  handleUpdatingTagOrder = (idx, tags) => {
    const options = this.state.options.slice();
    options[idx].items = tags;
    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)});
  }

  handleClickDeleteTag = (idx, tagInfo) => {
    const options = this.state.options.slice();
    const tags = options[idx].items.filter(t => tagInfo.id !== t.id);
    options[idx].items = tags;
    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)})
  }

  handleClickAddTag = (idx, tagInfo) => {
    const options = this.state.options.slice();
    if(options[idx].type === "colorpicker"){
      options[idx]["items"].push({id: tagInfo.tagId, name: tagInfo.tagName});
    } else {
      options[idx]["items"].push({id: options[idx].id + "t" + tagInfo.tagId, name: tagInfo.tagName});
    }

    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)})
  }

  handleClickDeleteOption = (panelInfo) => {
    const options = this.state.options.slice();
    const newOptions = options.filter(t => panelInfo.id !== t.id);
    this.setState({options: newOptions,
                   numVarients : this.determineNumberofVarients(newOptions)});
  }
  handleUpdatingOptionOrder = (layout) => {
    layout.sort((a,b)=>{return a.y - b.y});
    const layoutOrder = layout.map(l => l.i);
    const newOptions = this.state.options.slice().sort((a,b) =>
                                      {
                                        var A = a["id"], B = b["id"]
                                        return layoutOrder.indexOf(A) - layoutOrder.indexOf(B)
                                      });
    this.setState({options: newOptions,
                   numVarients : this.determineNumberofVarients(newOptions)});
  }
  handleClickDuplicateOption = (panel) => {
    const newPanel = JSON.parse(JSON.stringify(panel));
    if(newPanel.type === "checkbox"){
      newPanel.id = "cb" + this.counter.cb++;
    } else if(newPanel.type === "dropdown"){
      newPanel.id = "dd" + this.counter.dd++;
    } else if(newPanel.type === "colorpicker"){
      newPanel.id = "cp" + this.counter.cp++;
    } else {
      console.log("Duplicate is not implement for this type");
    }
    const options = this.state.options.slice();
    options.push(newPanel);
    this.setState({options: options});
  }

  handleSetPrice = () => {

    for(var i = 0; i < this.state.options.length; i++){
      var option = this.state.options[i];
      if(option.selected === "" || option.colorId === ""){
        alert("Option " + option.name + " does not have default selected.");
        return;
      }
    };

    const newMapping = createMapping(this.state.options);
    if(Object.keys(newMapping).length === Object.keys(this.state.mapping).length){
      var match = true;
      for(const [key, column] of Object.entries(this.state.mapping)){
        if(newMapping.hasOwnProperty(key) === false){
          match = false;
          break;
        }
      }
      if(match){
        return;
      }
    }
    this.setState({mapping: newMapping});
    this.setState({height: window.innerHeight/2})
  }
  exportJson = (columns) => {
    createJsonFile(this.state, columns);
  }
  importJson = (textArea)=>{
    const newState = populateOptions(textArea);
    this.setState({options: newState.options,
                    mapping: newState.mapping});
  }
  changeHeight=(direction)=>{
    if(direction ==="up"){
      this.setState({height: 50});
    } else {
      this.setState({height: window.innerHeight-70});
    }
  }

  updateHeight = (size)=>{
    this.setState({height: size});
  }
  

  render(){
    const height = window.innerHeight - this.state.height - 70;
    const width = window.innerWidth - 505;
    return (
      <Panels>
      <LeftPanel>
        <CreateMenu
          data = {this.state}
          handleAdd = {this.handleAddingNewOptions}
          handleUpdate = {this.handleUpdateingOptions}
          handleUpdatingTagOrder = {this.handleUpdatingTagOrder}
          handleClickDeleteTag = {this.handleClickDeleteTag}
          handleClickAddTag = {this.handleClickAddTag}
          handleClickDeleteOption = {this.handleClickDeleteOption}
          handleUpdatingOptionOrder = {this.handleUpdatingOptionOrder}
          handleClickDuplicateOption = {this.handleClickDuplicateOption}
          handleSetPrice = {this.handleSetPrice}
          importJson = {this.importJson}
        />
      </LeftPanel>
      <RightPanel>
        <ResizerPanel>
          <SplitPane split="horizontal" 
            style={{position:"relative"}} 
            paneStyle={{overflow:"auto", display:"inline", width:width}}
            size={this.state.height}
            onDragFinished={this.updateHeight}
            >
            <MenuVis data={this.state} />          
            <PriceSetVis 
              mapping={this.state.mapping} 
              exportJson={this.exportJson} 
              changeHeight={this.changeHeight}
              height={height}
              />
          </SplitPane>
        </ResizerPanel>
      </RightPanel>
    </Panels>
    );
  }
}


export default Sections;
