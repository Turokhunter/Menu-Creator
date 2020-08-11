import React from 'react';
import CreateMenu from './CreateMenu'

class Sections extends React.Component {
  state = {
    data : {}
  }

  render(){
    return (
      <CreateMenu data = {this.data}/>
    );
  }
}


export default Sections;
