import React from 'react';
import CreateMenu from './CreateMenu'

class Sections extends React.Component {
  state = {
    mapping : {},
    options : [
      {
        id : "cb1",
        name : "",
        type : "checkbox",
        priceDiff : false,
        selected : false
      },
      {
        id : "dd1",
        name : "",
        type : "dropdown",
        priceDiff : false,
        selected : "",
        items : []
      },
      {
        id : "cp1",
        name : "",
        type : "colorpicker",
        priceDiff : false,
        colorId : "",
        colorEnclusion:"all",
        items : []
      }
  ]
  }
  //TODO:Deal with a file being loaded with exisiting counters
  counter = {cb: 0, dd: 0, cp: 0};

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

  render(){
    return (
      <CreateMenu
        data = {this.state}
        handleAdd = {this.handleAddingNewOptions}
        handleUpdate = {this.handleUpdateingOptions}
        handleUpdatingTagOrder = {this.handleUpdatingTagOrder}
        handleClickDeleteTag = {this.handleClickDeleteTag}
        handleClickAddTag = {this.handleClickAddTag}
      />
    );
  }
}


export default Sections;
