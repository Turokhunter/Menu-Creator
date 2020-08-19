import React from 'react';
import {Button, InputGroup, FormControl, Container, Row, Col} from 'react-bootstrap'

class Header extends React.Component {
  constructor(props){
    super(props);
    this.variantName = "";
  }

  handleEnterAddVarient = (e) => {
    if(e.key === 'Enter' && this.tagName.value !== ""){
      // this.handleClickAddTag();
      e.preventDefault();
    }
  }

  setVariantText = text =>{
    this.variantName = text;
  }

  render(){
    return (
      <Container fluid>
        <Row>
          Add a Varient:
          <Col sm={3}>
          
            <InputGroup>
                <FormControl
                  placeholder="Varient Name"
                  onKeyDown={this.handleEnterAddVarient}
                  ref={this.setVariantText}
                />
                <InputGroup.Append>
                  <Button variant="info">Add</Button>
                </InputGroup.Append>
              </InputGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Header;