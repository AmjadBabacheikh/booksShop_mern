import React from 'react';
import { Nav, Navbar, Container, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { Redirect, Route } from 'react-router-dom';
import Search from './Search';
import logo from '../logo.svg';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { Loading, error, userInfo } = userLogin;

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/' style={{ cursor: 'pointer' }}>
            <Image alt='booksShop logo' src={logo} />
          </LinkContainer>
          <LinkContainer to='/'>
            <Navbar.Brand style={{ fontFamily: 'Raleway' }}>
              BookShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <Search history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin ? (
                <NavDropdown title='ADMIN' id='ADMIN'>
                  <LinkContainer to='/admin/userslist'>
                    <NavDropdown.Item>users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/bookslist'>
                    <NavDropdown.Item>books</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderslist'>
                    <NavDropdown.Item>orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : null}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>profile</NavDropdown.Item>
                  </LinkContainer>
                  <Route
                    render={({ history }) => (
                      <NavDropdown.Item
                        history={history}
                        onClick={() => {
                          dispatch(logout());
                          history.push('/');
                        }}
                      >
                        logout
                      </NavDropdown.Item>
                    )}
                  />
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
