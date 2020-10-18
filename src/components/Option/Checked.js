import React from 'react';
import {InputGroup, OverlayTrigger, Tooltip} from 'react-bootstrap'


const checked = ({propValue, propName, label, handleUpdate, toolTip, disabled}) => {

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
      <InputGroup.Checkbox
              name ={propName}
              aria-label="option 1"
              checked = {propValue}
              onChange = {handleUpdate}
              disabled = {disabled}
        />
    </InputGroup>
  )
}

export default checked;