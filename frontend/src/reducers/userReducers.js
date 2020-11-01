import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../constants/userConstants';

export const loginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST: {
      return { Loading: true };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        Loading: false,
        userInfo: payload,
      };
    }
    case USER_LOGIN_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST: {
      return { Loading: true };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        Loading: false,
        userInfo: payload,
      };
    }
    case USER_REGISTER_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const userDetailReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS_REQUEST: {
      return { ...state, Loading: true };
    }
    case USER_DETAILS_SUCCESS: {
      return {
        Loading: false,
        user: payload,
      };
    }
    case USER_DETAILS_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST: {
      return { Loading: true };
    }
    case USER_UPDATE_PROFILE_SUCCESS: {
      return {
        Loading: false,
        userInfo: payload,
        success: true,
      };
    }
    case USER_UPDATE_PROFILE_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const usersListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LIST_REQUEST:
      return { Loading: true };
    case USER_LIST_SUCCESS:
      return { Loading: false, users: payload };
    case USER_LIST_FAIL:
      return { Loading: false, error: payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DELETE_REQUEST:
      return { Loading: true };
    case USER_DELETE_SUCCESS:
      return { Loading: false, successDelete: true };
    case USER_DELETE_FAIL:
      return { Loading: false, errorDelete: payload };
    default:
      return state;
  }
};
