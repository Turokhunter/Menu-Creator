import React from 'react';
import {Row, Col} from 'react-bootstrap'
import {MyHeader, MyH5, MyMenuButton} from "./style";
import { GrClose } from 'react-icons/gr';
import { FiCopy } from 'react-icons/fi';

const Header = ({option, handleClickDeleteOption, handleClickDuplicateOption}) => {
  const type = option.type.charAt(0).toUpperCase() + option.type.slice(1);
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
          {'  '}
          <MyMenuButton variant="light" onClick={(e) => handleClickDuplicateOption(option)} >
            <FiCopy />
          </MyMenuButton>
          {' '}
          <MyMenuButton variant="light" onClick={(e) => handleClickDeleteOption(option)}>
            <GrClose />
          </MyMenuButton>
        </Col>
      </Row>
    </MyHeader>
  )
}

export default Header;
