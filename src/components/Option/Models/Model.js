import React from 'react';
import {ModelStyle} from './style';
import {Draggable} from 'react-beautiful-dnd';
import {Form, Col, InputGroup, Row} from 'react-bootstrap'
import {MyModelHeader, MyModelH5, MyModelMenuButton, MyForm} from "./style";
import { GrClose } from 'react-icons/gr';
import { FiCopy } from 'react-icons/fi';


export default class Model extends React.Component{
  render(){
    const model = this.props.model;
    return (
      <Draggable draggableId={model.id} index={this.props.index}>
        {provided => (
        <ModelStyle
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref = {provided.innerRef}
        >
          <MyModelHeader>
            <Row>
              <Col xs={9}>
                  <MyModelH5>Model:{model.id}</MyModelH5>
              </Col>
              <Col>
                {' '}
                <MyModelMenuButton variant="light" onClick={(e) => this.props.handleDupModel(model)} >
                  <FiCopy />
                </MyModelMenuButton>
                {' '}
                <MyModelMenuButton variant="light" onClick={(e) => this.props.handleDeleteModel(model.id)} >
                  <GrClose />
                </MyModelMenuButton>
              </Col>
            </Row>
          </MyModelHeader>
          <MyForm>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="nameLabel">Name:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={model.name}
                    name = "name"
                    type="text"
                    placeholder="Name"
                    onChange = {this.props.handleUpdatingModel}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="nameLabel">Filename:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={model.filename}
                    name = "filename"
                    type="text"
                    placeholder="name of the STL"
                    onChange = {this.props.handleUpdatingModel}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="show">Show:</InputGroup.Text>
                </InputGroup.Prepend>
                <InputGroup.Checkbox
                  name ="show"
                  aria-label="option 1"
                  checked = {model.show}
                  onChange = {this.props.handleUpdatingModel}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend >
                  <InputGroup.Text style={{backgroundColor:"#bfdcd1"}} id="group">Group:</InputGroup.Text>
                </InputGroup.Prepend>
                <InputGroup.Checkbox
                  name ="group"
                  aria-label="option 1"
                  checked = {model.group}
                  onChange = {this.props.handleUpdatingModel}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text style={{backgroundColor:"#bfdcd1"}} id="selected">Selected:</InputGroup.Text>
                </InputGroup.Prepend>
                <InputGroup.Checkbox
                  name ="selected"
                  aria-label="option 1"
                  checked = {model.selected}
                  onChange = {this.props.handleUpdatingModel}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{backgroundColor:"#bfdcd1"}}  id="groupName">Group Name:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={model.groupName}
                    name = "groupName"
                    type="text"
                    placeholder="Groups model by name"
                    onChange = {this.props.handleUpdatingModel}
                    disabled = {!model.group}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
        </MyForm>
        </ModelStyle>
        )}
      </Draggable>
    )
  }
}