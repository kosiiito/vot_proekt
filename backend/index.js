const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Keycloak = require('keycloak-connect');
const session = require('express-session');

const app = express();
app.use(cors());

const keycloak = new Keycloak({}, {
  "realm": process.env.KEYCLOAK_REALM,
  "auth-server-url": process.env.KEYCLOAK_URL,
  "ssl-required": "external",
  "resource": process.env.KEYCLOAK_CLIENT_ID,
  "credentials": {
    "secret": process.env.KEYCLOAK_CLIENT_SECRET
  }
});

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: new session.MemoryStore()
}));

app.use(keycloak.middleware());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3307,  
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MariaDB database');
});

app.get('/', keycloak.protect(), (req, res) => {
  db.query('SELECT * FROM your_table_name', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.listen(4000, () => {
  console.log('Backend is running on port 4000');
});
