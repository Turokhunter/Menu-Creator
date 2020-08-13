import React from 'react';
import {Button, Row, Col} from 'react-bootstrap'
import {MyHeader,MyH5} from "./style";
import { GrClose } from 'react-icons/gr';
import { FiCopy } from 'react-icons/fi';

//Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const Header = ({option}) => {
  const type = option.type.charAt(0).toUpperCase() + option.type.slice(1)
  // console.log(option);
  return (
    <MyHeader>
      <Row>
        <Col xs={9}>
          <div className="MyDragHandleClassName">
            <MyH5>{type}:{option.id}</MyH5>
          </div>
        </Col>
        <Col>
          <Button variant="light">
            <FiCopy />
          </Button>
          <Button variant="light">
            <GrClose />
          </Button>
        </Col>
      </Row>
    </MyHeader>
  )
}

export default Header;
