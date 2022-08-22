import express from 'express';
import config from "config";
const fileupload = require('express-fileupload');
import connect from './db/connect';
import routes from './routers/routes';
import { deserializeUser } from './middleware';
import log from './logger';

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(fileupload());
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  log.info(`Server listening at http://${host}:${port}`);
  connect();
  routes(app);
})
