import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createOrderItem } from '../actions/orderActions';
import CheckoutOperations from '../components/CheckoutOperations';
import Message from '../components/Message';

const PlaceOrders = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const totalPrice = (qty, price) => {
    return (qty * price).toFixed(2);
  };
  const totalToPay = () => {
    let total = 0;
    cartItems.forEach((element) => {
      total += element.qty * element.price;
    });
    return total.toFixed(2);
  };
  const taxPrice = () => {
    return Number((totalToPay() * 0.15).toFixed(2));
  };
  const shippingPrice = () => {
    const a = 0;
    const b = 100;
    if (totalToPay() > 100) {
      return a.toFixed(2);
    } else {
      return b.toFixed(2);
    }
  };
  const totalToPayAfterTax = () => {
    return (
      Number(taxPrice()) +
      Number(totalToPay()) +
      Number(shippingPrice())
    ).toFixed(2);
  };
  const createOrder = useSelector((state) => state.createOrder);
  const { order, success, error } = createOrder;
  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
  }, [history, success]);
  const createOrderHandler = () => {
    dispatch(
      createOrderItem({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: totalToPay(),
        taxPrice: taxPrice(),
        shippingPrice: shippingPrice(),
        totalPrice: totalToPayAfterTax(),
      })
    );
  };
  return (
    <>
      <CheckoutOperations step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3 style={{ color: '#121212' }}>Shipping</h3>
              <h6>
                Address : {shippingAddress.address},{shippingAddress.city}{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3 style={{ color: '#121212' }}>Payment Method</h3>
              <h6>Method : {paymentMethod}</h6>
            </ListGroup.Item>
            <ListGroup.Item>
              {cartItems.length === 0 ? (
                <Message variant='info'>Your cart is empty </Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
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
                          {totalPrice(item.qty, item.price)}
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
                <Col>€{totalToPay()}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>€{shippingPrice()}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>€{taxPrice()}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>€{totalToPayAfterTax()}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={createOrderHandler} block>
                PLACE ORDER
              </Button>
            </ListGroup.Item>
            {error && <Message variant='danger'>{error}</Message>}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrders;
