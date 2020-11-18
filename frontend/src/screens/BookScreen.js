import React, { useEffect, useState } from 'react';
import StarsRating from 'stars-rating';
import { useSelector, useDispatch } from 'react-redux';
import { getBookById, createReview } from '../actions/bookActions';
import { BOOK_ADD_REVIEW_RESET } from '../constants/bookConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const bookDetail = useSelector((state) => state.bookDetail);
  const { book, reviews, Loading, error } = bookDetail;
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const {
    Loading: reviewLoading,
    error: reviewError,
    success: reviewSuccess,
  } = reviewCreate;
  // if (isEmpty(book) || book._id !== match.params.id) {
  //   dispatch(getBookById(match.params.id));
  //   // dispatch({ type: BOOK_ADD_REVIEW_RESET });
  // }
  useEffect(() => {
    if (reviewSuccess) {
      setComment('');
      setRating(0);
    }
    if (isEmpty(book) || book._id !== match.params.id || reviewSuccess) {
      dispatch(getBookById(match.params.id));
      dispatch({ type: BOOK_ADD_REVIEW_RESET });
    }
  }, [dispatch, match, reviewSuccess]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
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
        <>
          <Row>
            <Col md={3} xs={12}>
              <Image alt={book.title} src={book.image} thumbnail fluid />
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {Array.isArray(reviews) && reviews.length ? (
                <ListGroup>
                  {reviews.map((r) => (
                    <ListGroup.Item key={r._id}>
                      <h6>{r.name}</h6>
                      <Rating value={r.rating} />
                      <p>{r.createdAt.substring(0, 10)}</p>
                      <p>{r.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Message>No Reviews</Message>
              )}
              <ListGroup>
                <h2>Write a Review</h2>
                {reviewSuccess && (
                  <Message variant='success'>
                    Review submited with success
                  </Message>
                )}
                {reviewLoading && <Loader />}
                {reviewError && (
                  <Message variant='danger'>{reviewError}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating {rating}</Form.Label>
                      <StarsRating
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        color2={'#fddb3a'}
                      />
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={reviewLoading}
                      type='submit'
                      variant='primary'
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                      Please Sign in to Write a review
                    </Link>
                  </Message>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BookScreen;
