import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { listBooks } from '../actions/bookActions';
import Book from '../components/Book';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import BookCarousel from '../components/BookCarousel';

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const listBook = useSelector((state) => state.listBooks);
  const { Loading, error, books, page, pages } = listBook;
  const key = match.params.key;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listBooks(key, pageNumber));
  }, [dispatch, key, pageNumber]);

  return (
    <Container>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <h2 className='px-3'>Top Books</h2>
          </Row>
          <BookCarousel />
          <Row>
            {books.map((book) => (
              <Col xs={12} md={6} lg={4} xl={3} key={book._id}>
                <Book book={book} />
              </Col>
            ))}
          </Row>
          <Row>
            <Paginate keyword={key ? key : ''} page={page} pages={pages} />
          </Row>
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
