import { getTokenUserId } from '../utils/token.js';

export default (req, res, next) => {
  const token = req.get('Authorization');
  const userId = getTokenUserId({ token, type: 'access' });
  if (!userId) res.status('400').send('ACCESS_TOKEN_INVALID');
  res.locals.userId = userId;
  next();
};
