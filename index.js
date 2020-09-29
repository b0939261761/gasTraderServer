import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';

const server = express();
const port = process.env.SERVER_PORT;

const corsOptions = {
  origin: '*',
  exposedHeaders: [
    'Access-Token',
    'Refresh-Token'
  ]
};

server.use(cors(corsOptions));
server.use(express.json());

server.use('/', routes);
server.use((err, req, res, next) => console.error(err) || res.status(422).send(err.message));
server.listen(port, () => console.info(`💡 App listening on port ${port}!`));
