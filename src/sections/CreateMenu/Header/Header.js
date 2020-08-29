import React from 'react';
import {Button, Modal, Form} from 'react-bootstrap'

function ImportModal({importJson}) {
  const [show, setShow] = React.useState(false);
  const [textArea, setTextArea] = React.useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSetArea = (e) => setTextArea(e.target.value);


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Import
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Import Existing JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Paste JSON:</Form.Label>
          <Form.Control as="textarea" rows="3" value={textArea} onChange={handleSetArea}/>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=> {importJson(textArea); handleClose();}} >Import</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Header = ({handleAdd, importJson}) => {
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
    <ImportModal importJson={importJson}/>
    </>
  )
}

export default Header;
