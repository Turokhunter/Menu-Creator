import React from 'react';
import {Button, InputGroup, FormControl, Container, Row, Col} from 'react-bootstrap'
import {Text, VariantAdd} from './sytle'
import {BsArrowsExpand, BsArrowsCollapse} from 'react-icons/bs';


class Header extends React.Component {
  constructor(props){
    super(props);
    this.variantName = "";
  }


  addVarient = () => {
    if(this.variantName.value !== ""){
      this.props.addColumns(this.variantName.value);
      this.variantName.value = "";
    }
  }
  handleEnterAddVarient = (e) => {
    if(e.key === 'Enter'){
      this.addVarient();
      e.preventDefault();
    }
  }

  setVariantText = text =>{
    this.variantName = text;
  }

  render(){
    return (
    <>
      <Text>Add a Varient:</Text> 
      <VariantAdd>
        <InputGroup>
          <FormControl
            placeholder="Varient Name"
            onKeyDown={this.handleEnterAddVarient}
            ref={this.setVariantText}
          />
          <InputGroup.Append>
            <Button onClick={this.addVarient} variant="info">Add</Button>
          </InputGroup.Append>
        </InputGroup>
      </VariantAdd>
      <Button onClick={this.props.exportJson}>
        Export
      </Button>  
      <Button>
        <BsArrowsExpand/>
      </Button>         
      <Button>
        <BsArrowsCollapse/>
      </Button>
    </>
    )
  }
}

export default Header;