import express from 'express';
import { routes } from './routes/index';
import { logger } from './utils/logger';
import cors from 'cors';
import bodyParser from 'body-parser';

// Connect DB
import './utils/connectDB';

import deserializedToken from './middleware/deserializeToken';

type Application = express.Application;

const app: Application = express();
const port: number = 3001;

// parse body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors access handler
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use(deserializedToken);

routes(app);

app.listen(port, () => logger.info(`Server is listening on port ${port}`));
