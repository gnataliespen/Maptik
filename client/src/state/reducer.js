import {
  LOGIN_USER,
  CLEAR_USER,
  LOGIN_FAIL,
  LOGOUT,
  CREATE_DRAFT,
  UPDATE_DRAFT,
  CLEAR_DRAFT,
  NEW_PIN,
  GET_PINS,
  SET_PIN,
  CLEAR_PIN,
  DELETE_PIN,
  UPDATE_PIN
} from "./types";

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    //Auth reducers
    case LOGIN_USER:
      return {
        ...state,
        currentUser: payload,
        isAuth: true
      };
    case CLEAR_USER:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuth: false
      };
    //Pin reducers
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
    case NEW_PIN: {
      return {
        ...state,
        draft: null,
        pins: [...state.pins, payload]
      };
    }
    case GET_PINS: {
      return {
        ...state,
        pinsLoaded: true,
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
    case UPDATE_PIN: {
      //Replace old pin with updated pin
      let newPins = state.pins.map(pin =>
        pin._id === payload._id ? payload : pin
      );
      //Update current pin if necessary
      let curPin =
        state.currentPin._id === payload._id ? payload : state.currentPin;
      return {
        ...state,
        pins: newPins,
        currentPin: curPin
      };
    }
    default:
      return state;
  }
};
