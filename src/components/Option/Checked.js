import React from 'react';
import {InputGroup, OverlayTrigger, Tooltip} from 'react-bootstrap'


const checked = ({propVale, propName, label, handleUpdate, toolTip}) => {

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
              checked = {propVale}
              onChange = {handleUpdate}
        />
    </InputGroup>
  )
}

export default checked;