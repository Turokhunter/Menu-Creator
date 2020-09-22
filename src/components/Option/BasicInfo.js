import React from 'react';
import {Form, Col, InputGroup, OverlayTrigger, Tooltip} from 'react-bootstrap'
import LineEdit from './LineEdit';



const BasicInfo = ({option, handleUpdate}) => {
  return (
     <Form>
        <Form.Row>
          <Form.Group as={Col}>
          <LineEdit propName={"name"} propVale={option.name} label={"Name"} placeholder={"Name"}/>
            {/* <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="nameLabel">Name:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={option.name}
                name = "name"
                type="text"
                placeholder="Name"
                onChange = {handleUpdate}
              />
            </InputGroup> */}
          </Form.Group>
        </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <InputGroup>
            <InputGroup.Prepend>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={
                  <Tooltip id="button-tooltip">
                    Choose if option changes price.
                  </Tooltip>
                }
              >
                <InputGroup.Text id="priceDiffLabel">Price Difference:</InputGroup.Text>
              </OverlayTrigger>
            </InputGroup.Prepend>
            
            <InputGroup.Checkbox
              name ="priceDiff"
              aria-label="option 1"
              checked = {option.priceDiff}
              onChange = {handleUpdate}
            />
          </InputGroup>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}

export default BasicInfo;
