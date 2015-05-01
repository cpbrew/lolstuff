'use strict';

let url = require('url'),
    app = require('express')();

app.get('/', (req, res) => {
  res.send('This is the home page!');
});
app.get('/page1', (req, res) => {
  res.send('This is page 1!');
});
app.get('/page2', (req, res) => {
  let query = url.parse(req.url, true).query;
  if (query.secret === 'password') {
    res.send('Welcome to the secret club!');
  } else {
    res.send('This is page 2!');
  }
});

let server = app.listen('8080', () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Now listening on http://%s:%s', host, port);
});