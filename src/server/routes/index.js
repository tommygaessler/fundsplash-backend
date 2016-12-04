const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/connection');

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const redirect_uri = process.env.redirect_uri;
const grant_type = process.env.grant_type;

router.get('/', function (req, res, next) {
  res.json('json');
});

router.post('/auth', function(req, res, next) {

  const code = req.body.code;

  request({
    url: `https://unsplash.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}&grant_type=${grant_type}`,
    method: 'POST'
  }, function(error, response, body) {

    body = JSON.parse(body);

    const access_token = body.access_token;

    request({
      url: `https://api.unsplash.com/me`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }, function(error, response, data) {

      data = JSON.parse(data);

      const username = data.username;

      knex('photographers').where('username', username)
      .then((user) => {
        if (user.length) {
          console.log('existing user', user[0]);
          res.json(
            {
              data: user[0]
            }
          );
        } else {
          return knex('photographers').insert({
            username: username,
            name: data.name,
            first_name: data.first_name,
            last_name: data.last_name,
            portfolio_url: data.portfolio_url,
            bio: data.bio,
            current_location: data.location,
            profile_image: data.profile_image.large,
            instagram_username: data.instagram_username,
            email: data.email,
            badge: data.badge,
            unsplash_url: data.links.html,
            total_likes: data.total_likes,
            total_photos: data.total_photos,
            downloads: data.downloads,
            access_token: access_token
          }).returning('*')
          .then((newUser) => {
            console.log('new user', newUser[0]);
            res.json(
              {
                data: newUser[0]
              }
            );
          });
        }
      });
    });
  });
});

router.get('/campaigns', function(req, res, next) {
  knex('campaigns').innerJoin('photographers', 'photographers.id', 'campaigns.photographer_id')
  .then((campaigns) => {
    res.json(campaigns);
  })
  .catch((error) => {
    console.log(error);
  });
});

module.exports = router;
