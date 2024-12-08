import "dotenv/config"
import express, { Express } from 'express';
const fileupload = require('express-fileupload');
import connect from './db/connect';
import routes from './routers/routes';
import { deserializeUser } from './middleware';
import createpool from "./utils/pool";

const port = process.env.PORT??'4040';
const host = process.env.HOST??'localhost';
const requiresAuth = process.env.REQUIRE_AUTH === 'true';
const workers = process.env.WORKERS || 4

const app: Express = express();

app.use(fileupload());
console.log(requiresAuth)
if (requiresAuth) {
  app.use(deserializeUser);
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
  createpool(workers);
  if (requiresAuth) {
    connect();
  }
  routes(app);
})
