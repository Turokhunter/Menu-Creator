import React from 'react';
import {Form, Col} from 'react-bootstrap'
import Checked from './Checked';

const CheckBox = ({option, handleUpdate}) => {
  return (
     <Form>
       <Form.Row>
         <Form.Group as={Col}>
         <Checked 
            propName={"selected"} 
            propValue={option.selected} 
            label={"Checked"} 
            handleUpdate={handleUpdate}
            toolTip={"Is it checked or unchecked by default."}
          />
         </Form.Group>
       </Form.Row>
     </Form>
  )
}

export default CheckBox;
