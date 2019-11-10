import {
  LOGIN_USER,
  CLEAR_USER,
  LOGIN_FAIL,
  LOGOUT,
  CREATE_DRAFT,
  UPDATE_DRAFT,
} from "./types";
export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: payload,
        isAuth: true,
        loading: false,
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
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isAuth: false,
        loading: true,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuth: false,
        loading: false,
      };
    default:
      return state;
  }
};
