const express = require('express');
const router = express.Router();
var request = require('request');
const url = require('url');

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

router.post('/user', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status('400').send({ message: 'Could not find username or password' });
  }

  let encode = Buffer.from(username + ':' + password).toString('base64');

  let options = {
    protocol: 'https',
    host: `${username}:${password}@dev.unosquare.com`,
    pathname: '/redmine/users/current.json'
  };

  var jsonUrl = url.format(options);
  console.log(jsonUrl);
  request(jsonUrl)
    .on('response', function(response) {
      if (response.statusCode === 401) {
        res.status('401').send({ message: 'Invalid username or password' });
      }
    })
    .pipe(res);
});

router.get('/projects', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if (!req.header('x-redmine-api-key')) {
    res.status('401').send({ message: 'Not Authorized' });
  }

  var options = {
    protocol: 'https',
    host: 'dev.unosquare.com',
    pathname: '/redmine/projects.json'
  };

  var jsonUrl = url.format(options);

  var options = {
    url: jsonUrl,
    headers: {
      'X-Redmine-API-Key': req.header('x-redmine-api-key')
    }
  };

  request(options).pipe(res);
});

router.get('/issues', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if (!query.id) {
    res.status('401').send({ message: 'Not Authorized' });
  }

  var options = {
    protocol: 'https',
    host: 'dev.unosquare.com',
    pathname: '/redmine/issues.json',
    query: { assigned_to_id: query.id }
  };

  var jsonUrl = url.format(options);

  var requestOptions = {
    url: jsonUrl,
    headers: {
      'X-Redmine-API-Key': req.header('x-redmine-api-key')
    }
  };

  request(requestOptions).pipe(res);
});

module.exports = router;
