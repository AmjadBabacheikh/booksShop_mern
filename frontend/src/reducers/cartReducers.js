import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: '' },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;
      const existedItem = state.cartItems.find((x) => x.book === item.book);
      if (existedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.book === existedItem.book ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.book !== payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: payload,
      };
    }
    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: payload,
      };
    }
    default:
      return state;
  }
};
