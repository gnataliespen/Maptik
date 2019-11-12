import {
  LOGIN_USER,
  CLEAR_USER,
  LOGIN_FAIL,
  LOGOUT,
  CREATE_DRAFT,
  UPDATE_DRAFT,
  CLEAR_DRAFT,
  CREATE_PIN,
  GET_PINS,
  SET_PIN,
  CLEAR_PIN,
  DELETE_PIN,
  CREATE_COMMENT
} from "./types";

import setAuthToken from "../util/setAuthToken";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: payload,
        isAuth: true
      };
    case CLEAR_USER:
    case LOGIN_FAIL:
    case LOGOUT:
      //Remove token from req headers
      setAuthToken(null);
      return {
        ...state,
        currentUser: null,
        isAuth: false
      };
    case CREATE_DRAFT:
      return {
        ...state,
        currentPin: null,
        draft: {
          latitude: 0,
          longitude: 0
        }
      };
    case UPDATE_DRAFT:
      return {
        ...state,
        draft: payload
      };
    case CLEAR_DRAFT:
      return {
        ...state,
        draft: null
      };
    case CREATE_PIN: {
      return {
        ...state,
        draft: null,
        pins: [...state.pins, payload]
      };
    }
    case GET_PINS: {
      return {
        ...state,
        pins: [...payload]
      };
    }
    case SET_PIN: {
      return {
        ...state,
        currentPin: payload,
        draft: null
      };
    }
    case CLEAR_PIN: {
      return {
        ...state,
        currentPin: null
      };
    }
    case DELETE_PIN: {
      //Remove deleted pin from pin arr
      let newPins = state.pins.filter(pin => pin._id !== payload);
      return {
        ...state,
        currentPin: null,
        pins: newPins
      };
    }
    case CREATE_COMMENT: {
      //Replace old pin with updated pin
      let newPins = state.pins.map(pin =>
        pin._id === payload._id ? payload : pin
      );
      return {
        ...state,
        pins: newPins,
        currentPin: payload
      };
    }
    default:
      return state;
  }
};
