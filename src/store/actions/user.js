import {ADD_TOKEN, ADD_REFRESH_TOKEN, LOG_OUT,IS_AUTH} from '../types/userTypes';

export const addToken = (token) => ({
  type: ADD_TOKEN,
  data: token,
});

export const addRefreshToken = (refreshToken) => ({
  type: ADD_REFRESH_TOKEN,
  data: refreshToken,
});

export const logout = () => ({
  type: LOG_OUT,
})

export const isAuth = (auth) => ({
  type: IS_AUTH,
  data: auth,
})