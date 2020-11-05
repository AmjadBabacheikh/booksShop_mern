import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  listBookReducer,
  bookDetailReducer,
  bookDeleteReducer,
} from './reducers/bookReducers';
import {
  loginReducer,
  registerReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDeleteReducer,
  userInformationsReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  createOrderReducer,
  orderDetailReducer,
  orderPayReducer,
  ordersMineReducer,
} from './reducers/orderReducers';

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const reducer = combineReducers({
  listBooks: listBookReducer,
  bookDetail: bookDetailReducer,
  userLogin: loginReducer,
  cart: cartReducer,
  userRegister: registerReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  createOrder: createOrderReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  ordersMine: ordersMineReducer,
  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  userInformations: userInformationsReducer,
  userUpdate: userUpdateReducer,
  bookDelete: bookDeleteReducer,
});
const initialState = {
  userLogin: {
    userInfo: userLoginFromStorage,
  },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
};
const middlewares = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
