import {
  BOOK_DETAIL_FAIL,
  BOOK_DETAIL_SUCCESS,
  BOOK_DETAIL_REQUEST,
  BOOK_LIST_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
} from '../constants/bookConstants';

export const listBookReducer = (state = { books: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOK_LIST_REQUEST: {
      return { Loading: true };
    }
    case BOOK_LIST_SUCCESS: {
      return { Loading: false, books: payload };
    }
    case BOOK_LIST_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const bookDetailReducer = (state = { book: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOK_DETAIL_REQUEST: {
      return { Loading: true };
    }
    case BOOK_DETAIL_SUCCESS: {
      return { Loading: false, book: payload };
    }
    case BOOK_DETAIL_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const bookDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOK_DELETE_REQUEST:
      return { Loading: true };
    case BOOK_DELETE_SUCCESS:
      return { Loading: false, successDelete: true };
    case BOOK_DELETE_FAIL:
      return { Loading: false, errorDelete: payload };
    default:
      return state;
  }
};
