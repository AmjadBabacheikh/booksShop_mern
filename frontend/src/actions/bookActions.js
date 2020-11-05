import axios from 'axios';
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

export const listBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });
    const { data } = await axios.get('/api/books');
    dispatch({ type: BOOK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBookById = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/books/${id}`);
    dispatch({ type: BOOK_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBook = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/books/${id}`, config);
    dispatch({ type: BOOK_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
