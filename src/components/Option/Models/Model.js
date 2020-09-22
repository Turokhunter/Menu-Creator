import React from 'react';
import { ModelStyle } from './style';
import { Draggable } from 'react-beautiful-dnd';
import { Form, Col, InputGroup, Row, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MyModelHeader, MyModelH5, MyModelMenuButton, MyForm } from "./style";
import { GrClose } from 'react-icons/gr';
import { FiCopy } from 'react-icons/fi';
import LineEdit from '../LineEdit';
import Checked from '../Checked';



const CheckedGroup = ({propVale, propName, label, handleUpdate, toolTip}) => {

  return (
    <InputGroup>
      <InputGroup.Prepend>
      <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={
                  <Tooltip id="button-tooltip">
                    {toolTip}
                  </Tooltip>
                }
              >
          <InputGroup.Text style={{backgroundColor:"#bfdcd1"}}  id= {propName + "Label"}>{label}</InputGroup.Text>
        </OverlayTrigger>
      </InputGroup.Prepend>
      <InputGroup.Checkbox
              name ={propName}
              aria-label="option 1"
              checked = {propVale}
              onChange = {handleUpdate}
        />
    </InputGroup>
  )
}
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
                <MyModelMenuButton variant="light" onClick={(e) => this.props.handleClickDupModel(model)} >
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
              <LineEdit propName={"name"} 
                      propValue={model.name} 
                      label={"Name:"} 
                      placeholder={"Name"}
                      handleUpdate={this.props.handleUpdatingModel}
                      type={"text"}
                      toolTip={"Name of the Model"}
                      />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <LineEdit propName={"filename"} 
                      propValue={model.filename} 
                      label={"Filename:"} 
                      placeholder={"Name of the STL"}
                      handleUpdate={this.props.handleUpdatingModel}
                      type={"text"}
                      toolTip={"Name of the Model"}
                      />
              </Form.Group>
            </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
            <Checked 
                propName={"show"} 
                propVale={model.show} 
                label={"Show:"} 
                handleUpdate={this.props.handleUpdatingModel}
                toolTip={"Should the model be shown"}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <CheckedGroup 
                propName={"group"} 
                propVale={model.group} 
                label={"Group:"} 
                handleUpdate={this.props.handleUpdatingModel}
                toolTip={"Is this model part of Group. Group allow the user to \
                choose between a set of models. If Multiselect is on, they can \
                add all models with same group."}
              />
            </Form.Group>
            <Form.Group as={Col}>
            <CheckedGroup 
                propName={"selected"} 
                propVale={model.selected} 
                label={"Selected:"} 
                handleUpdate={this.props.handleUpdatingModel}
                toolTip={"Is this model selected at the start. Note: \
                If mutlselect is not on, only one model should be select per group."}
              />
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