import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookById } from '../actions/bookActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  Col,
  Row,
  ListGroup,
  Button,
  Image,
  Container,
  Card,
  Form,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '../components/Rating';

const BookScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const Book = useSelector((state) => state.bookDetail);
  const { book, Loading, error } = Book;

  useEffect(() => {
    dispatch(getBookById(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <Container>
      <LinkContainer to='/'>
        <Button variant='secondary' className='my-3'>
          GO BACK
        </Button>
      </LinkContainer>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={3} xs={12}>
            <Image src={book.image} thumbnail fluid />
          </Col>
          <Col md={5} xs={12} className='mx-1'>
            <Row>
              <h3 style={{ color: '#121212' }}>{book.title}</h3>
            </Row>
            <Row className='my-2'>
              <h6>{book.author}</h6>
            </Row>
            <Row className='my-2'>
              <div>{book.description}</div>
            </Row>
            <Row className='my-2'>
              <Col>
                <div>Year : {book.year}</div>
              </Col>
              <Col>
                <Rating value={book.rating} />
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price :</Col>
                  <Col>
                    <span style={{ color: '#ec0101' }}>{book.price}€</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status :</Col>
                  <Col>
                    {book.countInStock > 0 ? ' In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {book.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(book.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className='primary'
                  block
                  disabled={book.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BookScreen;
