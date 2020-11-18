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
import EditUserScreen from './screens/EditUserScreen';
import BooksListScreen from './screens/BooksListScreen';
import EditBookScreen from './screens/EditBookScreen';
import CreateBookScreen from './screens/CreateBookScreen';
import OrdersListScreens from './screens/OrdersListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3'>
          <Route path='/admin/bookslist' component={BooksListScreen} exact />
          <Route
            path='/admin/bookslist/:pageNumber'
            component={BooksListScreen}
            exact
          />
          <Route path='/admin/userslist' component={UsersListScreen} />
          <Route path='/admin/orderslist' component={OrdersListScreens} />
          <Route path='/admin/book/create' component={CreateBookScreen} />
          <Route path='/admin/user/:id/edit' component={EditUserScreen} />
          <Route path='/admin/book/:id/edit' component={EditBookScreen} />
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/placeorder' component={PlaceOreders} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/books/:id' component={BookScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/search/:key' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:key/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
