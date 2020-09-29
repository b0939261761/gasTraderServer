import express from 'express';
import checkToken from './checkToken.js';
import { openRouter, authRouter } from './auth.js';
import company from './company.js';
import user from './user.js';

const routes = express.Router();

routes.get('', (req, res) => res.end('Gas Trader Server'));
routes.use('/auth', openRouter);
routes.use(checkToken);
routes.use('/auth', authRouter);
routes.use('/company', company);
routes.use('/user', user);

export default routes;
