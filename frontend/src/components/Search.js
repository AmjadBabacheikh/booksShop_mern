import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
const Search = ({ history }) => {
  const [key, setKey] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (key.trim()) {
      history.push(`/search/${key}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='r'
        onChange={(e) => setKey(e.target.value)}
        placeholder='Search Books...'
        className='mr-sm-2 my-sm-1'
      ></Form.Control>
      <Button
        type='submit'
        style={{ color: '#e8e8e8', background: 'primary' }}
        className='my-sm-2'
        className='p-2'
      >
        Search
      </Button>
    </Form>
  );
};

export default Search;
