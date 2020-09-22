import React from 'react';
import {Form, Col, InputGroup} from 'react-bootstrap'

const  MultiParameterInput = ({option, handleUpdate, propertyName, parameterList}) => {
  const capPropertyName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
  return (
    <Form.Row>
      {parameterList.map((parameter, index)=>
        <Col sm={index === 0 ? 5 : undefined} >
          <Form.Group >
            <InputGroup >
              <InputGroup.Prepend>
                <InputGroup.Text >{index === 0 && capPropertyName} {parameter}:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value= {option[propertyName][parameter]}
                name= {propertyName + "." + parameter}
                type= "number"
                onChange = {handleUpdate}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      )}
  </Form.Row>
  );
}


const STLWindow = ({option, handleUpdate}) => {
  const xyzList = ["x","y","z"];
  return (
     <Form>
      <MultiParameterInput 
        option={option} 
        handleUpdate={handleUpdate} 
        propertyName="camera" 
        parameterList= {xyzList}
      />
      <MultiParameterInput 
        option={option} 
        handleUpdate={handleUpdate} 
        propertyName="position" 
        parameterList= {xyzList}
      />
      <MultiParameterInput 
        option={option} 
        handleUpdate={handleUpdate} 
        propertyName="scale" 
        parameterList= {xyzList}
      />

        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="minDist">Min Dist:</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
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
