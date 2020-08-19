import React from 'react';
import {MyFooterButton, MyText} from './style';
import { Row, Col, Container} from 'react-bootstrap';

const Footer = ({data}) => {
  return (
    <Container>
      <Row className="d-flex justify-content-between">
        <Col>
          <MyText>
            Number of Varients: {data.numVarients}
          </MyText>
        </Col>
          <MyFooterButton>Set Price</MyFooterButton>
      </Row>
    </Container>
  )
}

export default Footer;
