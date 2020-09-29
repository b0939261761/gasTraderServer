import slonik from 'slonik';
import queryLogging from 'slonik-interceptor-query-logging';

const interceptors = [];
if (process.env.NODE_ENV !== 'production') {
  interceptors.push(queryLogging.createQueryLoggingInterceptor());
}

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}`
    + `@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const connection = slonik.createPool(connectionString, { interceptors });
export const { sql } = slonik;

export default {
  connection,
  sql
};
