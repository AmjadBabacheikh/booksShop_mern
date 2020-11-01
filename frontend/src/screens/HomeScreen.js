import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { listBooks } from '../actions/bookActions';
import Book from '../components/Book';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const listBook = useSelector((state) => state.listBooks);
  const { Loading, error, books } = listBook;

  useEffect(() => {
    dispatch(listBooks());
  }, [dispatch]);

  return (
    <Container>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {books.map((book) => (
            <Col xs={12} md={6} lg={4} xl={3} key={book._id}>
              <Book book={book} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default HomeScreen;
