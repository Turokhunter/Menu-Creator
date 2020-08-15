import React from 'react';
import CreateMenu from './CreateMenu'
import GridLayout from 'react-grid-layout';
import {LeftPanel, RightPanel, Panels} from './style.js'

class Sections extends React.Component {
  //TODO:Deal with a file being loaded with exisiting counters
  counter = {cb: 0, dd: 0, cp: 0};

  state = {
    mapping : {},
    options : [{
      id : "cb" + this.counter.cb++,
      name : "",
      type : "checkbox",
      priceDiff : false,
      selected : false
    },{
      id : "cp" + this.counter.cp++,
      name : "",
      type : "colorpicker",
      priceDiff : false,
      colorId : "",
      colorEnclusion:"all",
      items : []
      //Optional: includeColor : []
      //Optional: excludeColor : []
    },{
      id : "cp" + this.counter.cp++,
      name : "",
      type : "colorpicker",
      priceDiff : false,
      colorId : "",
      colorEnclusion:"all",
      items : []
      //Optional: includeColor : []
      //Optional: excludeColor : []
    },{
      id : "cp" + this.counter.cp++,
      name : "",
      type : "colorpicker",
      priceDiff : false,
      colorId : "",
      colorEnclusion:"all",
      items : []
      //Optional: includeColor : []
      //Optional: excludeColor : []
    }]
  }

  handleAddingNewOptions = (event) => {
    const options = this.state.options.slice();
    var optiontype = event.target.value;
    if(optiontype === 'checkbox'){
      options.push({
        id : "cb" + this.counter.cb++,
        name : "",
        type : "checkbox",
        priceDiff : false,
        selected : false
      });
    } else if(optiontype === 'dropdown'){
      options.push({
        id : "dd" + this.counter.dd++,
        name : "",
        type : "dropdown",
        priceDiff : false,
        selected : "",
        items : []
      });
    } else if(optiontype === 'colorpicker'){
      options.push({
        id : "cp" + this.counter.cp++,
        name : "",
        type : "colorpicker",
        priceDiff : false,
        colorId : "",
        colorEnclusion:"all",
        items : []
        //Optional: includeColor : []
        //Optional: excludeColor : []
      });
    }
    this.setState({options : options})
  }

  handleUpdateingOptions = (idx, event) => {
    const options = this.state.options.slice();
    const {name, value, type, checked} = event.target
    if (type === "checkbox") {
      options[idx][name] = checked;
    } else {
      options[idx][name] = value;
    }
    this.setState({options : options})
  }

  handleUpdatingTagOrder = (idx, tags) => {
    const options = this.state.options.slice();
    options[idx].items = tags;
    this.setState({options : options})
  }

  handleClickDeleteTag = (idx, tagInfo) => {
    const options = this.state.options.slice();
    const tags = options[idx].items.filter(t => tagInfo.id !== t.id);
    options[idx].items = tags;
    this.setState({options : options})
  }

  handleClickAddTag = (idx, tagInfo) => {
    const options = this.state.options.slice();
    options[idx]["items"].push({id: tagInfo.tagId, name: tagInfo.tagName});
    this.setState({options : options})
  }

  handleClickDeleteOption = (panelInfo) => {
    const options = this.state.options.slice();
    const newOptions = options.filter(t => panelInfo.id !== t.id);
    this.setState({options: newOptions});
  }
  handleUpdatingOptionOrder = (layout) => {
    layout.sort((a,b)=>{return a.y - b.y});
    const layoutOrder = layout.map(l => l.i);
    const newOption = this.state.options.slice().sort((a,b) =>
                                      {
                                        var A = a["id"], B = b["id"]
                                        return layoutOrder.indexOf(A) - layoutOrder.indexOf(B)
                                      });
    this.setState({options: newOption});
  }
  handleClickDuplicateOption = (panel) => {
    const newPanel = JSON.parse(JSON.stringify(panel));
    if(newPanel.type === "checkbox"){
      newPanel.id = "cb" + this.counter.cb++;
    } else if(newPanel.type === "dropdown"){
      newPanel.id = "dd" + this.counter.dd++;
    } else if(newPanel.type === "colorpicker"){
      newPanel.id = "cp" + this.counter.cp++;
    }
    const options = this.state.options.slice();
    options.push(newPanel);
    this.setState({options: options});
  }

  render(){
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
        />
      </LeftPanel>
      <RightPanel>
        <GridLayout className="layout"
                    cols={1} rows = {12}
                    rowHeight={35} width={1000}
                    autoSize={true}
                    >
          <div key="MenuVisualization" data-grid={{x: 0, y: 0, w: 1, h: 2}}>b</div>
          <div key="PriceSetVis" data-grid={{x: 0, y: 2, w: 1, h: 2}}>b</div>
        </GridLayout>
      </RightPanel>
    </Panels>
    );
  }
}


export default Sections;
