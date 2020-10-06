import React from 'react';
import {Form, Col} from 'react-bootstrap'
import LineEdit from './LineEdit';

const Preset = ({option, handleUpdate}) => {
  const optionList = Object.entries(option);
  return (
     <Form>
       <Form.Row>
        <Form.Group as={Col}>
          <LineEdit propName={"name"} 
                  propValue={option.name} 
                  label={"Name:"} 
                  placeholder={"Name"}
                  handleUpdate={handleUpdate}
                  type={"text"}
                  toolTip={"Name of the Preset"}
                  />
        </Form.Group>
      </Form.Row>
     </Form>
  )
}

export default Preset;
