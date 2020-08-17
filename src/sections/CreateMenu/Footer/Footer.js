import React from 'react';
import {MyFooterButton, MyText, MyFooter} from './style';
import {Button, Row, Col, Container} from 'react-bootstrap';

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
