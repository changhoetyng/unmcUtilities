import {ADD_TOKEN, ADD_REFRESH_TOKEN, IS_AUTH} from '../types/userTypes';

const initialState = {auth: false};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {...state, token: action.data};
    case ADD_REFRESH_TOKEN:
      return {...state, refreshToken: action.data};
    case IS_AUTH:
      return {...state, auth: action.data};
    default:
      return state;
  }
};

export default userReducer;
