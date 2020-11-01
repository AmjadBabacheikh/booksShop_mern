import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-1'>
            Made With <span>❤️</span> By BABACHEIKH AMJAD
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-2 my-1'>
            Copyright &copy; BooksShop
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
