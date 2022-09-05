import "dotenv/config"
import express, { Express } from 'express';
const fileupload = require('express-fileupload');
import connect from './db/connect';
import routes from './routers/routes';
import { deserializeUser } from './middleware';
import log from './logger';

const port = process.env.PORT;
const host = process.env.HOST;

const app: Express = express();

app.use(fileupload());
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  log.info(`Server listening at http://${host}:${port}`);
  connect();
  routes(app);
})
