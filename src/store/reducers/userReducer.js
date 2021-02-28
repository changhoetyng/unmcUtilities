import {ADD_TOKEN, ADD_REFRESH_TOKEN} from '../types/userTypes'

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TOKEN:
        return {...state, token: action.data};
      case ADD_REFRESH_TOKEN:
        return {...state, refreshToken: action.data};
      default:
        return state;
    }
  };
  
  export default userReducer;