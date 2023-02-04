import express, { response } from 'express';

import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';

import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'john',
      password: 'cookie',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'jane',
      email: 'jane@gmail.com',
      password: 'apple',
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com',
    },
  ],
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  //   bcrypt.compare(req.body.password, "$2a$10$8MOxCoE.qclQ15blDwdrJe958Os3hy7hBneZquDscPdeIuk9TaibW", function (err, res) {
  //     console.log("first guess",res)
  //   // res == true
  // });
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  // bcrypt.hash(password, null, null, function (err, hash) {
  //   // Store hash in your password DB.
  //   console.log(hash);
  // });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      return res.json(user);
      found = true;
    }
  });
  if (!found) {
    res.status(404).json('not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json('User Not found. please register');
  }
});

app.listen(3000, () => {
  console.log('running smoothly');
});
