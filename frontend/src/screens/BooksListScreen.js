import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col, Container, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBooks } from '../actions/bookActions';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteBook } from '../actions/bookActions';
import Paginate from '../components/Paginate';

const BooksListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const listBook = useSelector((state) => state.listBooks);
  const { Loading, error, books, page, pages } = listBook;
  const bookDelete = useSelector((state) => state.bookDelete);
  const { Loading: LoadingDelete, successDelete, errorDelete } = bookDelete;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBooks('', pageNumber));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo, pageNumber]);
  const deleteBookHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteBook(id));
    }
  };
  return (
    <>
      <Row>
        <Col>
          <h2 className='my-2'>Books</h2>
        </Col>
        <Col>
          <Button
            className='my-2'
            onClick={() => {
              history.push('/admin/book/create');
            }}
            style={{ float: 'right' }}
          >
            Create book
          </Button>
        </Col>
      </Row>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover className='sm' responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Author</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book._id}</td>
                  <td>{book.title}</td>
                  <td>{book.price}€</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>
                    <LinkContainer to={`/admin/book/${book._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteBookHandler(book._id)}
                      style={{ marginLeft: '5px' }}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default BooksListScreen;
