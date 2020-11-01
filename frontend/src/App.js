import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOreders from './screens/PlaceOrders';
import OrderScreen from './screens/OrderScreen';
import UsersListScreen from './screens/UsersListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3'>
          <Route path='/admin/userslist' component={UsersListScreen} />
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/placeorder' component={PlaceOreders} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/books/:id' component={BookScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
