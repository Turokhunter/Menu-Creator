import React from 'react';
import {Button, InputGroup, FormControl, Dropdown} from 'react-bootstrap'
import {Text, 
        VariantAdd,
        LeftSideHeader,
        RightSideHeader,
        MyMenuButton,
        MyExport,
        MyDropdown} from './sytle'
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
        <MyDropdown title="Auto Populate Variant" onSelect={(value)=>(this.props.generateVarient(value))} variant="outline-primary">
          <Dropdown.Item  eventKey="onetoone" >For Each Remaining</Dropdown.Item >
          <Dropdown.Item  eventKey="price">By Price</Dropdown.Item >
          <Dropdown.Item  eventKey="priceBuckets">By Price Bucket</Dropdown.Item >
        </MyDropdown>{' '}
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