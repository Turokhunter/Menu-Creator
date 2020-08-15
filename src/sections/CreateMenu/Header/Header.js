import React from 'react';

import {Button, Navbar} from 'react-bootstrap'

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
    </>
  )
}

export default Header;
