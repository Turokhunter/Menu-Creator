import React from 'react';
import {Form, Col, InputGroup} from 'react-bootstrap'

const STLWindow = ({option, handleUpdate}) => {
  return (
     <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="minDist">Name:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={option.name}
                name = "mindist"
                type="text"
                placeholder="20"
                onChange = {handleUpdate}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="minDist">Name:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={option.name}
                name = "mindist"
                type="text"
                placeholder="20"
                onChange = {handleUpdate}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

    </Form>
  )
}

export default STLWindow;
