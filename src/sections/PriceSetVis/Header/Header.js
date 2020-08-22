import React from 'react';
import {Button, InputGroup, FormControl} from 'react-bootstrap'
import {Text, 
        VariantAdd,
        LeftSideHeader,
        RightSideHeader,
        MyMenuButton,
        MyExport} from './sytle'
import {MdExpandLess, MdExpandMore} from 'react-icons/md';


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
      <LeftSideHeader>
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
        <MyExport onClick={this.props.genereteOnetoOne}>
          Create Variant for Each
        </MyExport>
        <MyExport onClick={this.props.exportJson}>
          Export
        </MyExport>  
      </LeftSideHeader>
      <RightSideHeader>
        <MyMenuButton onClick={(e)=>this.props.changeHeight("down")} variant="light">
          <MdExpandMore/>
        </MyMenuButton>
        <MyMenuButton onClick={(e)=>this.props.changeHeight("up")}variant="light">
          <MdExpandLess/>
        </MyMenuButton>  
      </RightSideHeader>
    </>
    )
  }
}

export default Header;