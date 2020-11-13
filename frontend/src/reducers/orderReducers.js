import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_MINE_REQUEST,
  ORDER_MINE_SUCCESS,
  ORDER_MINE_FAIL,
  ORDER_MINE_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

export const createOrderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { Loading: true };
    case ORDER_CREATE_SUCCESS:
      return { Loading: false, success: true, order: payload };
    case ORDER_CREATE_FAIL:
      return { Loading: false, success: false, error: payload };
    default:
      return state;
  }
};

export const orderDetailReducer = (
  state = { Loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAIL_REQUEST:
      return { ...state, Loading: true };
    case ORDER_DETAIL_SUCCESS:
      return { Loading: false, order: payload };
    case ORDER_DETAIL_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { Loading: true };
    case ORDER_PAY_SUCCESS:
      return { Loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { Loading: false, error: payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const ordersMineReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_MINE_REQUEST:
      return { Loading: true };
    case ORDER_MINE_SUCCESS:
      return { Loading: false, orders: payload };
    case ORDER_MINE_FAIL:
      return { Loading: false, error: payload };
    case ORDER_MINE_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const ordersListReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_LIST_REQUEST:
      return { Loading: true };
    case ORDER_LIST_SUCCESS:
      return { Loading: false, orders: payload };
    case ORDER_LIST_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return { Loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { Loading: false, success: true, order: payload };
    case ORDER_DELIVER_FAIL:
      return { Loading: false, error: payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
