import React from 'react';
import {Form, Col, InputGroup} from 'react-bootstrap'

const CheckBox = ({option, handleUpdate}) => {
  return (
     <Form>
       <Form.Row>
         <Form.Group as={Col}>
           <InputGroup>
             <InputGroup.Prepend>
               <InputGroup.Text id="prceDiffLabel">Checked:</InputGroup.Text>
             </InputGroup.Prepend>
             <InputGroup.Checkbox
               name ="selected"
               aria-label="option 1"
               checked = {option.selected}
               onChange = {handleUpdate}
             />
           </InputGroup>
         </Form.Group>
       </Form.Row>
     </Form>
  )
}

export default CheckBox;
