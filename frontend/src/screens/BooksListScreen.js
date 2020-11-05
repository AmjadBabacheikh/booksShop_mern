import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col, Container, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBooks } from '../actions/bookActions';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteBook } from '../actions/bookActions';

const BooksListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const listBook = useSelector((state) => state.listBooks);
  const { Loading, error, books } = listBook;
  const bookDelete = useSelector((state) => state.bookDelete);
  const { Loading: LoadingDelete, successDelete, errorDelete } = bookDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBooks());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);
  const deleteBookHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteBook(id));
    }
  };
  return (
    <>
      <h2 className='my-2'>Books</h2>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover className='md' responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Author</th>
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
      )}
    </>
  );
};

export default BooksListScreen;
