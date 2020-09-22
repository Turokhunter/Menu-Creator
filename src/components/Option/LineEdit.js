import React from 'react';
import {InputGroup, Form} from 'react-bootstrap'


const LineEdit = ({propVale, propName, label, placeholder, handleUpdate}) => {

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id= {propName + "Label"}>{label}</InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control
        value={propVale}
        name={propName}
        type="text"
        placeholder={placeholder}
        onChange = {handleUpdate}
      />
    </InputGroup>
  )
}

export default LineEdit;