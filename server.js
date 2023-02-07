import express, { response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import _knex from 'knex';
import handleRegister from './controllers/register.js';
import handleProfile from './controllers/profile.js';
import handleSignin from './controllers/signin.js';
import { handleImage } from './controllers/imageHandler.js';
import { handleApiCall } from './controllers/imageHandler.js';
const db = _knex({
  client: 'pg',
  connection: {
    host: 'dpg-cfgp7d9a6gdvgkkeuqa0-a',
    port: 5432,
    user: 'webmaster',
    password: '',
    database: 'smart_brain_db_uyw8',
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  handleProfile(req, res, db);
});

app.put('/image', (req, res) => {
  handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT || 3000}`);
});
