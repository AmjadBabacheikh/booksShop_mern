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
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_ADD_REVIEW_REQUEST,
  BOOK_ADD_REVIEW_SUCCESS,
  BOOK_ADD_REVIEW_FAIL,
  BOOK_TOPRATED_REQUEST,
  BOOK_TOPRATED_SUCCESS,
  BOOK_TOPRATED_FAIL,
} from '../constants/bookConstants';

export const listBooks = (key = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/books?key=${key}&pageNumber=${pageNumber}`
    );
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

export const listTopRatedBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_TOPRATED_REQUEST });
    const { data } = await axios.get('/api/books/top');
    dispatch({ type: BOOK_TOPRATED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_TOPRATED_FAIL,
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

export const updateBook = (id, book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST,
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
    await axios.put(`/api/books/${id}`, book, config);
    dispatch({ type: BOOK_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_CREATE_REQUEST,
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
    await axios.post(`/api/books`, book, config);
    dispatch({ type: BOOK_CREATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createReview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_ADD_REVIEW_REQUEST,
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
    await axios.post(`/api/books/${id}/reviews`, review, config);
    dispatch({ type: BOOK_ADD_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOOK_ADD_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
