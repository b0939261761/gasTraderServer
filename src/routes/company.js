import express from 'express';
import { catchAsyncRoute } from '../utils/tools.js';
import { apiGetCompany } from '../api/company.js';

// -----------------------------------

const getCompany = async (req, res) => res.send(await apiGetCompany(res.locals.userId));

// -----------------------------------

export default express.Router().get('', catchAsyncRoute(getCompany));
