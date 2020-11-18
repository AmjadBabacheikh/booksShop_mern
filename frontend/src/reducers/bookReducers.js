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
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_RESET,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_DETAIL_RESET,
  BOOK_ADD_REVIEW_REQUEST,
  BOOK_ADD_REVIEW_SUCCESS,
  BOOK_ADD_REVIEW_FAIL,
  BOOK_ADD_REVIEW_RESET,
  BOOK_TOPRATED_REQUEST,
  BOOK_TOPRATED_SUCCESS,
  BOOK_TOPRATED_FAIL,
} from '../constants/bookConstants';

export const listBookReducer = (state = { books: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOK_LIST_REQUEST: {
      return { Loading: true };
    }
    case BOOK_LIST_SUCCESS: {
      return {
        Loading: false,
        books: payload.books,
        page: payload.page,
        pages: payload.pages,
      };
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

export const topRatedBookReducer = (state = { books: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOK_TOPRATED_REQUEST: {
      return { Loading: true };
    }
    case BOOK_TOPRATED_SUCCESS: {
      return {
        Loading: false,
        books: payload,
      };
    }
    case BOOK_TOPRATED_FAIL: {
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
    case BOOK_DETAIL_RESET: {
      return {};
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

export const bookUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOK_UPDATE_REQUEST: {
      return { Loading: true };
    }
    case BOOK_UPDATE_SUCCESS: {
      return {
        Loading: false,
        book: payload,
        success: true,
      };
    }
    case BOOK_UPDATE_RESET:
      return {};
    case BOOK_UPDATE_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const bookCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOK_CREATE_REQUEST: {
      return { Loading: true };
    }
    case BOOK_CREATE_SUCCESS: {
      return {
        Loading: false,
        book: payload,
        success: true,
      };
    }
    case BOOK_CREATE_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const reviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOK_ADD_REVIEW_REQUEST: {
      return { Loading: true };
    }
    case BOOK_ADD_REVIEW_SUCCESS: {
      return {
        Loading: false,
        success: true,
      };
    }
    case BOOK_ADD_REVIEW_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    case BOOK_ADD_REVIEW_RESET: {
      return {};
    }
    default:
      return state;
  }
};
