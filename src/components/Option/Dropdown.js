import React from 'react';
import {Form, Col, Button, InputGroup, FormControl} from 'react-bootstrap';
import deleteBtn from '../img/delete.png';
import {DraggableArea} from 'react-draggable-tags';
import {AddAndDelete, DeleteIcon, Tag} from "./style";

class Dropdown extends React.Component {
  constructor(props){
    super(props);
    this.tagName = "";
    this.price = "0";
    this.tagId = 0;
    if(props.option.items.length !== 0){
      this.tagId = props.option.items.reduce(function(a,b){
        var aId, bId;
        if(typeof a === 'number'){
           aId = a;
        } else {
          const atsplit = a.id.split("t");
          aId = parseInt(atsplit[atsplit.length - 1]);
        }
        
        if(typeof b === 'number'){
          bId = b;
        } else {
          const btsplit = b.id.split("t");
          bId = parseInt(btsplit[btsplit.length - 1]);
        }
        return Math.max(aId, bId);
      }) + 1;
    }
  }

  setTagText = text =>{
    this.tagName = text;
  }
  setTagPrice = price => {
    this.price = price;
  }

  handleClickAddTag = () => {
    if(this.tagName.value === ""){
      return;
    } else if(this.price.value === ""){
      this.price.value = 0;
    }
    this.props.handleClickAddTag({tagId: this.tagId, tagName:this.tagName.value, price: this.price.value});
    this.tagId += 1;
    this.tagName.value = "";
    this.price.value = ""
  }

  handleEnterAddTag = (e) => {
    if(e.key === 'Enter' && this.tagName.value !== ""){
      this.handleClickAddTag();
      e.preventDefault();
    }
  }

  render(){
    return (
      <>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="8">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text >Selected:</InputGroup.Text>
                </InputGroup.Prepend>
                  <Form.Control as="select" name="selected" onChange={this.props.handleUpdate} value ={this.props.option.selected}>
                    <option key="-1" value ="-1">{" "}</option>
                    {this.props.option.items.map((item) =>(
                       <option key={item.id} value={item.id} >{item.name}</option>
                     ))}
                  </Form.Control>
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Form>
        <InputGroup>
          <FormControl style={{width:"60%"}}
            placeholder="Tag"
            onKeyDown={this.handleEnterAddTag}
            ref={this.setTagText}
          />
          <FormControl 
            placeholder="Price"
            onKeyDown={this.handleEnterAddTag}
            ref={this.setTagPrice}
          />
          <InputGroup.Append>
            <Button onClick={this.handleClickAddTag} variant="info">Add</Button>
          </InputGroup.Append>
        </InputGroup>
        <AddAndDelete>
          <DraggableArea
            tags={this.props.option.items}
            render={({tag, index}) => (
              <Tag>
                <DeleteIcon
                  src={deleteBtn}
                  onClick={() => this.props.handleClickDeleteTag(tag)}
                />
                <b>{tag.price !== undefined && "$" + tag.price}</b>{' '}{tag.name}
              </Tag>
            )}
            onChange={tags => this.props.handleUpdatingTagOrder(tags)}
          />
        </AddAndDelete>
      </>
    )
  };
}

export default Dropdown;
