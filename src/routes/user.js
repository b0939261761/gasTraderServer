import express from 'express';
import { catchAsyncRoute } from '../utils/tools.js';
import { apiGetUser } from '../api/user.js';

// -----------------------------------

const getUser = async (req, res) => res.send(await apiGetUser(res.locals.userId));

// -----------------------------------

const changePassword = async (req, res) => {
  const response = res.send(await apiGetUser(res.locals.userId));

  switch (response) {
    case 0: return res.status(204).send();
    case 1: return res.status('400').send('WRONG_PASSWORD');
    default: return res.status('400').send('NOT_STATUS');
  }
};

export default express.Router()
  .get('', catchAsyncRoute(getUser))
  .post('change-password', catchAsyncRoute(changePassword));
