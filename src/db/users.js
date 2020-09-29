import { connection, sql } from './database.js';

export const setUserToken = ({ userId, token }) => connection.maybeOne(sql`
  INSERT INTO "Users" (id, token) 
    VALUES (${userId}, ${token})
    ON CONFLICT (id) DO UPDATE SET token = EXCLUDED.token
`);

export const checkUserToken = async ({ userId, token }) => (await connection.maybeOne(sql`
  SELECT EXISTS(SELECT 1 FROM "Users" WHERE id = ${userId} AND token = ${token}) AS exists;
`)).exists;

export default {
  setUserToken,
  checkUserToken
};
