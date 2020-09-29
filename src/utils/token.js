import jwt from 'jsonwebtoken';

const ACCESS_EXP = 60 * 60;
const REFRESH_EXP = 24 * 60 * 60;

const secret = process.env.SERVER_JWT_KEY;

const getExp = exp => Math.floor(new Date().getTime() / 1000) + exp;
const createToken = data => jwt.sign(data, secret);

export const createTokens = userId => ({
  accessToken: createToken({ userId, type: 'access', exp: getExp(ACCESS_EXP) }),
  refreshToken: createToken({ userId, type: 'refresh', exp: getExp(REFRESH_EXP) })
});

export const getTokenUserId = ({ token, type }) => {
  try {
    const data = jwt.verify(token, secret);
    if (data.type === type) return data.userId;
  } catch {}
  return null;
};

export default {
  createTokens,
  getTokenUserId
};
