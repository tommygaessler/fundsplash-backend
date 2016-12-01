const express = require('express');
const router = express.Router();
const request = require('request');

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const redirect_uri = process.env.redirect_uri;
const grant_type = process.env.grant_type;

router.get('/', function (req, res, next) {
  res.json('json');
});

router.get('/test', function(req, res, next) {

  if (true) {
    req.session.token = "sdlfjnlaksdnf3j1920rj201rjioewfn";
  }

  res.send(req.session);
});

router.post('/auth', function (req, res, next) {

  const code = req.body.code;

  request({
    url: `https://unsplash.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}&grant_type=${grant_type}`,
    method: 'POST'
  }, function(error, response, body) {

    body = JSON.parse(body);

    const access_token = body.access_token;

    console.log(access_token);

    request({
      url: `https://api.unsplash.com/me`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }, function(error, response, data) {

      data = JSON.parse(data);

      console.log(data);

      res.json(
        {
          data: data,
          session: access_token
        }
      );
    });
  });
});

module.exports = router;
