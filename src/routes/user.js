import express from 'express';
import { catchAsyncRoute } from '../utils/tools.js';
import { apiGetUser } from '../api/user.js';

// -----------------------------------

const getCompany = async (req, res) => res.send(await apiGetUser(res.locals.userId));

// -----------------------------------

export default express.Router().get('', catchAsyncRoute(getCompany));
