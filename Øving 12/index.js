'use strict;'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.listen(8080, () => {
  console.log('Started server on port 8080');
  console.log('Visit http://localhost:8080 to view the site');
});
