'use strict;'

const express = require('express');
const https = require('https');
const fs = require('fs');
const privateKey = fs.readFileSync('sslkeys/server.key', 'utf8');
const certificate = fs.readFileSync('sslkeys/server.crt', 'utf8');

const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

const options = {
  key: privateKey,
  cert: certificate
};
const iterations = 1024;
const keylen = 512;
const digest = 'sha512';

const httpsServer = https.createServer(options, app);

let users = [];
let authTokens = [];

function checkIfUserExists(username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return true;
    }
  }
  return false;
}

function checkCredentials(username, hash) {
  for (let i = 0; i < users.length; i++) {
    const salt = users[i].salt;
    const newHash = crypto.pbkdf2Sync(hash, salt, iterations, keylen, digest).toString('hex');
    if (users[i].username === username && users[i].hash === newHash) {
      return true;
    }
  }
  return false;
}

function checkToken(checkToken) {
  for (let i = 0; i < authTokens.length; i++) {
    if (authTokens[i].token === checkToken) {
      return true;
    }
  }
  return false;
}

app.post('/auth', (request, response) => {
  console.log('Client trying to authenticate');
  if (checkToken(request.body.token)) {
    console.log('Authenticated');
    response.send('Authenticated');
  } else {
    console.log('Not authenticated');
    response.sendStatus(404);
  }
});

app.post('/sign-out', (request, response) => {
  console.log('Client signing out');
  //remove token
  authTokens.splice(authTokens.indexOf(request.body.token));
  console.log('Removed token');
  response.send('Successfully signed out');
});

app.post('/get-users', (request, response) => {
  console.log('Client trying to view all users');
  if (checkToken(request.body.token)) {
    response.send(users);
  } else {
    console.log('Not authenticated');
    response.sendStatus(404);
  }
});

app.post('/login', (request, response) => {
  console.log('Login request...');
  if (request.body.username && request.body.hash) {
    if (checkCredentials(request.body.username, request.body.hash)) {
      console.log('User: ' + request.body.username + ' signed in');

      const randomToken = crypto.randomBytes(10).toString('hex');
      const newToken = {
        token: randomToken
      };
      authTokens.push(newToken);
      response.set('Authorization', 'Bearer ' + randomToken);
      response.send('You are logged in');
    } else {
      console.log('Not authenticated');
      response.sendStatus(404);
    }
  } else {
    console.log('Invalid request');
    response.sendStatus(404);
  }
});

app.post('/register', (request, response) => {
  console.log('Register request...');
  if (request.body.username && request.body.hash) {
    if (!checkIfUserExists(request.body.username)) {
      const hash = request.body.hash;
      const now = new Date();
      const salt = now.getDate() + '-' + now.getHours() + '-' + request.body.username;
      const newHash = crypto.pbkdf2Sync(hash, salt, iterations, keylen, digest).toString('hex');

      const newUser = {
        username: request.body.username,
        salt: salt,
        hash: newHash
      };
      users.push(newUser);

      console.log('New user registered: ' + request.body.username);
      response.send('You are now registered! :)');
    } else {
      console.log('Username already exists');
      response.sendStatus(404);
    }
  } else {
    response.sendStatus(404);
  }
});

//Start server on port 8080
httpsServer.listen(8080, () => {
  console.log('Started server on port 8080');
  console.log('Visit https://localhost:8080 to view the site');
});
