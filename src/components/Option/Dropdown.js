import React from 'react';
import {Form, Col, Button, InputGroup, FormControl} from 'react-bootstrap';
import deleteBtn from '../img/delete.png';
import {DraggableArea} from 'react-draggable-tags';
import {AddAndDelete, DeleteIcon, Tag} from "./style";

class Dropdown extends React.Component {
  constructor(props){
    super(props);
    this.tagName = "";
    this.tagId = 0;
    if(props.option.items.length !== 0){
      this.tagId = props.option.items.reduce(function(a,b){
        return Math.max(a.id, b.id);
      }) + 1;
    }
  }

  setTagText = text =>{
    this.tagName = text;
  }

  handleClickAddTag = () => {
      this.props.handleClickAddTag({tagId: this.tagId, tagName:this.tagName.value});
      this.tagId += 1;
      this.tagName.value = "";
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
            <Form.Group as={Col} md="8" controlId="validSelected">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="selectedLabel">Selected:</InputGroup.Text>
                </InputGroup.Prepend>
                  <Form.Control as="select" name="selected" onChange={this.props.handleUpdate}>
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
          <FormControl
            placeholder="Tag"
            onKeyDown={this.handleEnterAddTag}
            ref={this.setTagText}
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
                {tag.name}
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
