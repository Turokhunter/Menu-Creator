import React from 'react';
import CreateMenu from './CreateMenu'

class Sections extends React.Component {
  state = {
    mapping : {},
    options : []
  }

  handleAddingNewOptions = (event) => {
    const options = this.state.options.slice();
    var optiontype = event.target.value;
    if(optiontype === 'checkbox'){
      options.push({
        id : "",
        name : "",
        type : "",
        priceDiff : false,
        selected : false
      });
    } else if(optiontype === 'dropdown'){
      options.push({
        id : "",
        name : "",
        type : "",
        priceDiff : false,
        selected : "",
        items : []
      });
    } else if(optiontype === 'colorpicker'){
      options.push({
        id : "",
        name : "",
        type : "",
        priceDiff : false,
        colorId : ""
        //Optional: includeColor : []
        //Optional: excludeColor : []
      });
    }
    this.setState({options : options})
  }

  render(){
    return (
      <CreateMenu
        data = {this.state}
        handleAdd = {this.handleAddingNewOptions}/>
    );
  }
}


export default Sections;
