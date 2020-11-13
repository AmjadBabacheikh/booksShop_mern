import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { updateBook } from '../actions/bookActions';
import { getBookById } from '../actions/bookActions';
import {
  BOOK_UPDATE_RESET,
  BOOK_DETAIL_RESET,
} from '../constants/bookConstants';
import Loader from '../components/Loader';
import axios from 'axios';

const EditBookScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(null);
  const [author, setAuthor] = useState('');
  const [countInStock, setCountInStock] = useState(null);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const bookDetail = useSelector((state) => state.bookDetail);
  const { Loading, book } = bookDetail;
  const bookUpdate = useSelector((state) => state.bookUpdate);
  const { error: updateError, success: updateSuccess } = bookUpdate;
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: BOOK_UPDATE_RESET });
      dispatch({ type: BOOK_DETAIL_RESET });
      history.push('/admin/bookslist');
    } else {
      if (isEmpty(book) || match.params.id !== book._id) {
        dispatch(getBookById(match.params.id));
      } else {
        setTitle(book.title);
        setCategory(book.category);
        setAuthor(book.author);
        setLanguage(book.language);
        setImage(book.image);
        setDescription(book.description);
        setPrice(book.price);
        setCountInStock(book.countInStock);
      }
    }
  }, [dispatch, match, book, updateSuccess, history]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBook(match.params.id, {
        title,
        author,
        description,
        price,
        language,
        countInStock,
        category,
        image,
      })
    );
  };

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <Button
            onClick={() => {
              history.push('/admin/bookslist');
            }}
            style={{ float: 'right' }}
          >
            Go Back
          </Button>
          {updateError && <Message variant='danger'>{updateError}</Message>}
          <h2>Edit Book</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='title'
                as='textarea'
                rows={2}
                placeholder=''
                value={title || ''}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={4}
                type='text'
                placeholder=''
                value={description || ''}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={author || ''}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder=''
                value={price || ''}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={category || ''}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>countInStock</Form.Label>
              <Form.Control
                type='number'
                placeholder=''
                value={countInStock || ''}
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='language'>
              <Form.Label>Language</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={language || ''}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
              />
            </Form.Group>
            {/* <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='Image'
                placeholder=''
                value={image || ''}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </Form.Group> */}

            <Button className='my-3' type='submit'>
              Edit
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default EditBookScreen;
