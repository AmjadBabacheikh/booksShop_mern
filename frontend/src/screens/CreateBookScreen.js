import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { createBook } from '../actions/bookActions';
import Loader from '../components/Loader';
import axios from 'axios';

const CreateBookScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(null);
  const [author, setAuthor] = useState('');
  const [countInStock, setCountInStock] = useState(null);
  const [year, setYear] = useState(null);
  const [rating, setRating] = useState(null);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const bookCreate = useSelector((state) => state.bookCreate);
  const { Loading, success, error } = bookCreate;

  useEffect(() => {
    if (success) {
      history.push('/admin/bookslist');
    }
  }, [success, history]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    // try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    //   const { data } = await axios.post('/api/upload', formData, config);
    await axios
      .post('/api/upload', formData, config)
      .then((res) => {
        setImage(res.data);
        setUploading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });

    //   setImage(data);
    //   setUploading(false);
    // } catch (error) {
    //   console.error(error);
    //   setUploading(false);
    // }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBook({
        title,
        author,
        description,
        price,
        language,
        countInStock,
        category,
        year,
        image,
        rating,
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
          {error && <Message variant='danger'>{error}</Message>}
          <h2>Create Book</h2>
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
            <Form.Group controlId='year'>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={year || ''}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='rating'>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type='number'
                placeholder=''
                value={rating || ''}
                onChange={(e) => {
                  setRating(e.target.value);
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

            <Button className='my-3' type='submit'>
              Create
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default CreateBookScreen;
