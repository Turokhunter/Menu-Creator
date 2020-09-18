import React from 'react';
import {Form, Col, InputGroup} from 'react-bootstrap'

const STLWindow = ({option, handleUpdate}) => {
  return (
     <Form>
       <Form.Row className="aalign-items-center">
            <Col sm={6}>
              <Form.Group >
                <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Text id="camera">Camera x:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={option.camera.x}
                    name= "camera.x"
                    type= "number"
                    onChange = {handleUpdate}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group >
                <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Text id="camera">y:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={option.camera.y}
                    name= "camera.y"
                    type= "number"
                    onChange = {handleUpdate}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group > 
                <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Text id="camera">z:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={option.camera.z}
                    name= "camera.z"
                    type= "number"
                    onChange = {handleUpdate}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
        </Form.Row>

        <Form.Row>
          <Col sm={5}>
            <Form.Group >
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="position">Position x:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  value={option.position.x}
                  name= "position.x"
                  type= "number"
                  onChange = {handleUpdate}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group >
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="position">y:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  value={option.position.y}
                  name= "position.y"
                  type= "number"
                  onChange = {handleUpdate}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group >
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="position">z:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  value={option.position.z}
                  name= "position.z"
                  type= "number"
                  onChange = {handleUpdate}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col sm={5}>
            <Form.Group >
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="scale">Scale x:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  value={option.scale.x}
                  name= "scale.x"
                  type= "number"
                  onChange = {handleUpdate}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col sm={3}>
          <Form.Group >
            
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="scale">y:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={option.scale.y}
                name= "scale.y"
                type= "number"
                onChange = {handleUpdate}
              />
            </InputGroup>
          </Form.Group>
          </Col>
          <Col sm={3}>
          <Form.Group >          
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="scale">z:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={option.scale.z}
                name= "scale.z"
                type= "number"
                onChange = {handleUpdate}
              />
            </InputGroup>
          </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="minDist">Min Dist:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={option.minDist}
                name= "mindist"
                type= "number"
                onChange = {handleUpdate}
              />
            </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="maxDist">Max Dist:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={option.maxDist}
                name= "maxdist"
                type= "number"
                onChange = {handleUpdate}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

    </Form>
  )
}

export default STLWindow;
