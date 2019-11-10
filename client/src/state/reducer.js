import {
  LOGIN_USER,
  CLEAR_USER,
  LOGIN_FAIL,
  LOGOUT,
  CREATE_DRAFT,
  UPDATE_DRAFT,
  CLEAR_DRAFT,
} from "./types";
export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: payload,
        isAuth: true,
      };
    case CREATE_DRAFT:
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0,
        },
      };
    case UPDATE_DRAFT:
      return {
        ...state,
        draft: payload,
      };
    case CLEAR_DRAFT:
      return {
        ...state,
        draft: null,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isAuth: false,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuth: false,
      };
    default:
      return state;
  }
};
