import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getOrders, deliverOrder } from '../actions/orderActions';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const OrdersListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const ordersList = useSelector((state) => state.ordersList);
  const { Loading, orders, error } = ordersList;
  const userLogin = useSelector((state) => state.userLogin);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: deliverSuccess } = orderDeliver;
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, deliverSuccess]);

  const handleDelivered = (id) => {
    dispatch(deliverOrder(id));
    if (deliverSuccess) {
      dispatch({ type: ORDER_DELIVER_RESET });
      history.push('/admin/orderslist');
    }
  };
  return (
    <>
      <h2 className='my-2'>Orders</h2>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover className='sm' responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>TOTAL PRICE</th>
              <th>IS PAID</th>
              <th>IS DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant='primary'
                    className='btn-md'
                    onClick={() => {
                      handleDelivered(order._id);
                    }}
                    style={{ marginLeft: '5px' }}
                  >
                    Marked Delivered
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

export default OrdersListScreen;
