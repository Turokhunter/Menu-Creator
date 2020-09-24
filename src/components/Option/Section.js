import React from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import Models from "./Models/Models"
import LineEdit from "./LineEdit";
import Checked from "./Checked";
import ColorChoices from "./ColorChoices"


class Section extends React.Component {
  render(){
    const parameterList = ["Stand", "Prem", "UltPrem"];
    return (
      <>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
            <LineEdit propName={"section"} 
                      propValue={this.props.option.section} 
                      label={"Section"} 
                      placeholder={"Section Name"}
                      handleUpdate={this.props.handleUpdate}
                      type={"text"}
                      toolTip={"Name of the option"}
                      />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Checked 
                propName={"hasCostTier"} 
                propValue={this.props.option.hasCostTier} 
                label={"Has Cost Tier"} 
                handleUpdate={this.props.handleUpdate}
                toolTip={"Choose if changing the option affect price."}
              />
            </Form.Group>

            <Form.Group as={Col}>
            <Checked 
                propName={"multiSelect"} 
                propValue={this.props.option.multiSelect} 
                label={"MultiSelect"} 
                handleUpdate={this.props.handleUpdate}
                toolTip={"Set true if more then one option can be selected. \
                Note: Every model has to belong to the same group"}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            {parameterList.map((parameter, index)=>
              <Col key={index}>
                <Form.Group >
                <LineEdit propName={"costTier." + parameter}
                      propValue ={this.props.option.costTier[parameter]} 
                      label={parameter+":"} 
                      handleUpdate={this.props.handleUpdate}
                      type={"Number"}
                      toolTip={"Visual show price for " + parameter }
                      />
                </Form.Group>
              </Col>
            )}
          </Form.Row>
        </Form>
        <ColorChoices option={this.props.option} 
                        handleUpdate={this.props.handleUpdate}
                        handleUpdatingTagOrder={this.props.handleUpdatingTagOrder}
                        handleClickDeleteTag={this.props.handleClickDeleteTag}
                        handleClickAddTag={this.props.handleClickAddTag}
          />
        <Button variant="info" onClick={this.props.handleClickAddModel}> Add Model</Button>
        <Models option={this.props.option}
          handleUpdatingModel = {this.props.handleUpdatingModel}
          reorderModels = {this.props.reorderModels}
          handleClickDupModel = {this.props.handleClickDupModel}
          handleDeleteModel = {this.props.handleDeleteModel}
        />
      </>
    )
  };
}

export default Section;
