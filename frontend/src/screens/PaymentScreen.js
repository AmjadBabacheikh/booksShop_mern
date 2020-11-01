import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutOperations from '../components/CheckoutOperations';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  useEffect(() => {
    if (Object.entries(shippingAddress).length === 0) {
      history.push('/shipping');
    }
  }, [history, shippingAddress, Object]);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckoutOperations step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <h4>Select Method</h4>
        <Col>
          <Form.Check
            type='radio'
            label='PayPal'
            id='PayPal'
            name='PaymentMethod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Form.Check
            type='radio'
            label='Stripe'
            name='PaymentMethod'
            value='Stripe'
            id='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Col>

        <Button type='submit' className='my-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
