import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOrderDetail, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const OrderScreen = ({ match }) => {
  const [isSdk, setSdk] = useState(false);
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const orderDetail = useSelector((state) => state.orderDetail);
  const { Loading, order, error } = orderDetail;
  const orderPay = useSelector((state) => state.orderPay);
  const { Loading: LoadingPay, success: successPay } = orderPay;
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdk(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || orderId !== order._id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetail(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdk(true);
      }
    }
  }, [dispatch, orderId, order, successPay]);
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  return (
    <>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h3 className='my-1' style={{ color: '#121212' }}>
            Order {orderId}
          </h3>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 style={{ color: '#121212' }}>Shipping</h3>
                  <h6>Name : {order.user.name}</h6>
                  <h6>Email : {order.user.email}</h6>
                  <h6>
                    Address : {order.shippingAddress.address},
                    {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </h6>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered {order.delideliveredAt}{' '}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3 style={{ color: '#121212' }}>Payment Method</h3>
                  <h6>Method : {order.paymentMethod}</h6>
                  {order.isPaid ? (
                    <Message variant='success'>Paid {order.paidAt} </Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {order.orderItems.length === 0 ? (
                    <Message variant='info'>Your cart is empty </Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={2}>
                              <Image
                                src={item.image}
                                alt={item.title}
                                rounded
                                fluid
                              />
                            </Col>
                            <Col>
                              <Link
                                to={`/books/${item.book}`}
                                style={{ textDecoration: 'none' }}
                              >
                                {item.title}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty}x €{item.price} = €
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>
                  <h2 style={{ color: '#121212' }}>ORDER SUMMARY</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>€{order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>€{order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>€{order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>€{order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {LoadingPay && <Loader />}
                    {!isSdk ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
