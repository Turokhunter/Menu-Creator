import React from 'react';

import {Button} from 'react-bootstrap'

const Header = ({handleAdd}) => {
  return (
    <>
    Options:{' '}
    <Button
      variant="outline-primary"
      value = "checkbox"
      onClick={handleAdd} >
        Checkbox
    </Button>{' '}
    <Button
      variant="outline-primary"
      value = "dropdown"
      onClick={handleAdd} >
        Dropdown
    </Button>{' '}
    <Button
      variant="outline-primary"
      value = "colorpicker"
      onClick={handleAdd} >
      Color Picker
    </Button>{' '}
    <hr/>
    </>
  )
}

export default Header;
