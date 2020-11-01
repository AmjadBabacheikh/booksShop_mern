import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

const Book = ({ book }) => {
  return (
    <Card
      style={{ width: '17rem', height: '29.4rem' }}
      className='my-2 px-1 rounded'
    >
      <Link to={`/books/${book._id}`}>
        <Card.Img
          variant='top'
          src={book.image}
          style={{ height: '300px', width: '16.5rem' }}
        />
      </Link>

      <Card.Body>
        <Link to={`/books/${book._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title
            as='h4'
            style={{
              fontSize: '14px',
              color: '#121212',
              height: '3rem',
            }}
          >
            <strong>{book.title}</strong>
          </Card.Title>
        </Link>

        <Row>
          <Col
            style={{
              fontSize: '13px',
              height: '3rem',
            }}
          >
            {book.author}
          </Col>
        </Row>
        <Row>
          <Col style={{ color: '#ec0101' }} className='mr-auto'>
            {book.price}€
          </Col>
          <Col>
            <Rating value={book.rating} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Book;
