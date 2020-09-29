import express from 'express';
import { catchAsyncRoute } from '../utils/tools.js';
import { apiSignIn, apiSignUp, apiRecovery } from '../api/auth.js';
import { createTokens, getTokenUserId } from '../utils/token.js';
import { checkUserToken, setUserToken } from '../db/users.js';

// -----------------------------------

const sendTokens = async ({ userId, res }) => {
  const { accessToken, refreshToken } = createTokens(userId);
  await setUserToken({ userId, token: refreshToken });
  const headers = { 'Access-Token': accessToken, 'Refresh-Token': refreshToken };
  res.status(204).set(headers).send();
};

// -----------------------------------

const signUp = async (req, res) => {
  const data = {
    e_mail: req.body.email,
    password: req.body.password,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    edrpou: req.body.edrpou,
    organization_name: req.body.organizationName,
    client_type: '1'
  };

  const { result } = await apiSignUp(data);

  switch (result) {
    case 0: return res.status(204).send();
    case 1: return res.status('400').send('ACTIVE_USER_EXISTS');
    case 2: return res.status('400').send('NOT_ACTIVE_USER_EXISTS');
    case 3: return res.status('400').send('BACKEND_ERROR');
    default: return res.status('400').send('NOT_STATUS');
  }
};

// -----------------------------------

const signIn = async (req, res) => {
  const data = {
    e_mail: req.body.email,
    password: req.body.password
  };

  const response = await apiSignIn(data);
  const userId = response.client_code;
  if (userId) {
    await sendTokens({ userId, res });
    return;
  }
  res.status('400').send('FAIL_AUTH');
};

// -----------------------------------

const recovery = async (req, res) => {
  const { result } = await apiRecovery({ recovery_data: req.body.email });

  switch (+result) {
    case 0: return res.status(204).send();
    case 1: return res.status('400').send('USER_NOT_EXISTS');
    case 2: return res.status('400').send('USER_NOT_ACTIVE');
    default: return res.status('400').send('NOT_STATUS');
  }
};

// -----------------------------------

const getToken = async (req, res) => {
  const token = req.get('Authorization');
  const userId = getTokenUserId({ token, type: 'refresh' });
  const isValidToken = userId && await checkUserToken({ userId, token });

  if (isValidToken) {
    await sendTokens({ userId, res });
    return;
  }
  res.status('400').send('REFRESH_TOKEN_INVALID');
};

// -----------------------------------

const signOut = async (req, res) => {
  await setUserToken({ userId: res.locals.userId, token: '' });
  res.sendStatus('204');
};

// -----------------------------------

export const openRouter = express.Router()
  .post('/sign-in', catchAsyncRoute(signIn))
  .post('/sign-up', catchAsyncRoute(signUp))
  .post('/recovery', catchAsyncRoute(recovery))
  .post('/token', catchAsyncRoute(getToken));

export const authRouter = express.Router()
  .post('/sign-out', catchAsyncRoute(signOut));

export default {
  openRouter,
  authRouter
};
