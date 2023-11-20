// src/store/actions/userActions.js
import { LOGIN_SUCCESS } from './types';

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};
