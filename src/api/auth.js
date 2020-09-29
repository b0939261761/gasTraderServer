import http from './http.js';

export const apiSignIn = async params => (await http.post('auth', params)).data;
export const apiSignUp = async params => (await http.post('registration', params)).data;
export const apiRecovery = async params => (await http.post('recovery_password', params)).data;

export default {
  apiSignIn,
  apiSignUp,
  apiRecovery
};
