import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from '../components/FormContainer';
import { getUser, updateUser } from '../actions/userActions';
import { USER_EDIT_RESET } from '../constants/userConstants';

const EditUserScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setAdmin] = useState(false);

  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  const userInformations = useSelector((state) => state.userInformations);
  const { Loading, user, error } = userInformations;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    Loading: LoadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_EDIT_RESET });
      history.push('/admin/userslist');
    } else {
      if (isEmpty(user) || user._id !== userId) {
        dispatch(getUser(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, { name, email, isAdmin }));
  };

  return (
    <FormContainer>
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {successUpdate && <Message> User updated</Message>}
      <h2>Edit User</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder=''
            value={name || ''}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder=''
            value={email || ''}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Check
          inline
          label='isAdmin'
          type='checkbox'
          onChange={(e) => setAdmin(e.target.checked)}
          checked={isAdmin}
        />
        <br />
        <Button className='my-3' type='submit'>
          Edit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EditUserScreen;
