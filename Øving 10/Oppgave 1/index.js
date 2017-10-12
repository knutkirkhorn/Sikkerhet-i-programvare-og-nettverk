"use strict;"

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
const digest = "sha512";

const httpsServer = https.createServer(options, app);

let users = [];

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

app.get('/auth', (request, response) => {
  console.log(request.headers);
  response.set("Authorization", "Bearer asdasd");
  response.send("yoyo");
});

app.get("/users", (request, response) => {
  response.send(users);
});

app.post("/login", (request, response) => {
  console.log("Login request");
  console.log(request.headers);
  if (request.body.username && request.body.hash) {
    if (checkCredentials(request.body.username, request.body.hash)) {
      console.log("User: " + request.body.username + " signed in");
      response.send("You are logged in");
    } else {
      console.log("Not authenticated");
      response.sendStatus(404);
    }
  } else {
    console.log("Invalid request");
    response.sendStatus(404);
  }
});

app.post('/register', (request, response) => {
  console.log("Register request...");
  if (request.body.username && request.body.hash) {
    if (!checkIfUserExists(request.body.username)) {
      const hash = request.body.hash;
      const now = new Date();
      const salt = now.getDate() + "-" + now.getHours() + "-" + request.body.username;
      const newHash = crypto.pbkdf2Sync(hash, salt, iterations, keylen, digest).toString('hex');

      const newUser = {
        username: request.body.username,
        salt: salt,
        hash: newHash
      };
      users.push(newUser);

      console.log("New user registered: " + request.body.username);
      response.set("Authorization", "Bearer yeaman");
      response.send("You are now registered! :)");
    } else {
      console.log("Username already exists");
      response.sendStatus(404);
    }
  } else {
    response.sendStatus(404);
  }
});

app.get('/auths', (request, response) => {
  if (request.body.username && request.body.hash) {

  }

  //TODO: use more iterations?
  /*const options = {keySize: 512/32, iterations: 1024};
  if (user.hash === CryptoJS.PBKDF2(hash, user.salt, options)) {
    console.log("hei dette gikk bra");
  }*/
  //const user = users[request.body.username];
  //console.log(CryptoJS.PBKDF2(hash, user.salt, options));
});

//8080 for testing
httpsServer.listen(8080, () => {
  console.log("Started server");
});
