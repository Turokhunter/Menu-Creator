import React from 'react';
import {InputGroup, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'


const LineEdit = ({propValue, propName, label, type,  placeholder, handleUpdate, toolTip}) => {
  return (
    <InputGroup>
      <InputGroup.Prepend>
      <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={
                  <Tooltip id="button-tooltip">
                    {toolTip}
                  </Tooltip>
                }
              >
          <InputGroup.Text id= {propName + "Label"}>{label}</InputGroup.Text>
        </OverlayTrigger>
      </InputGroup.Prepend>
      <Form.Control
        value={propValue}
        name={propName}
        type={type}
        placeholder={placeholder === undefined ? propValue : placeholder}
        onChange = {handleUpdate}
      />
    </InputGroup>
  )
}

export default LineEdit;