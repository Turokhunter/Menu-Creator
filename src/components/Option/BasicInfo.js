import React from 'react';
import {Form, Col, InputGroup} from 'react-bootstrap'

const BasicInfo = ({option, handleUpdate}) => {
  return (
     <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
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
            </InputGroup>
          </Form.Group>
        </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="priceDiffLabel">Price Difference:</InputGroup.Text>
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
