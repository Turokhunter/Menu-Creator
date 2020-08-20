import React from 'react';
import {MyFooterButton, MyText} from './style';
import { Row, Col, Container} from 'react-bootstrap';

const Footer = ({data, handleSetPrice}) => {
  return (
    <Container>
      <Row className="d-flex justify-content-between">
        <Col>
          <MyText>
            Number of Varients: {data.numVarients}
          </MyText>
        </Col>
          <MyFooterButton onClick={handleSetPrice}>Set Price</MyFooterButton>
      </Row>
    </Container>
  )
}

export default Footer;
