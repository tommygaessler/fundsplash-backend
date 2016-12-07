const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/connection');

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const redirect_uri = process.env.redirect_uri;
const grant_type = process.env.grant_type;

const stripe = require("stripe")("sk_test_EjdNXaZK6fjBoklHuejjtYG6");

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

      request({
        url: `https://api.unsplash.com/users/${username}/photos?per_page=30`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }, function(error, response, photos) {

        photos = JSON.parse(photos);

        knex('photographers').where('username', username)
        .then((user) => {
          if (user.length) {
            console.log('existing user', user[0]);
            res.json(
              {
                data: user[0],
                photos: photos
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
                  data: newUser[0],
                  photos: photos
                }
              );
            });
          }
        });
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

router.get('/campaign/:photographer_id', function(req, res, next) {

  const photographer_id = req.params.photographer_id;
  knex('campaigns').where('photographer_id', photographer_id).innerJoin('photographers', 'photographers.id', 'campaigns.photographer_id')
  .then((campaign) => {
    res.json(campaign[0]);
  });
});

router.post('/campaign', function(req, res, next) {

  knex('campaigns').insert({
    photographer_id: req.body.photographer_id,
    location: req.body.location,
    description: req.body.description,
    goal: req.body.goal,
    sample_photo_1: req.body.sample_photo_1,
    sample_photo_2: req.body.sample_photo_2,
    sample_photo_3: req.body.sample_photo_3,
    ends_at: req.body.ends_at,
    raised: req.body.raised
  }).then((campaign) => {
    res.json('success');
  });
});

router.post('/stripe', function(req, res, next) {

  stripe.charges.create({
    amount: 2000,
    currency: "usd",
    source: req.body.token.id, // obtained with Stripe.js
    description: `Charge for ${req.body.token.email} contributing to ${req.body.campaign.username}'s campaign`
  }, function(err, charge) {
    if (err) {
      res.json(err);
    } else {

      var user_balance = charge.amount / 100;

      const data = {
        charge: charge.amount / 100,
        balance: user_balance,
        paid: charge.paid,
        status: charge.status,
        seller_message: charge.outcome.seller_message,
        description: charge.description,
        email: req.body.token.email,
        username: req.body.campaign.username,
        location: req.body.campaign.location,
        profile_image: req.body.campaign.profile_image,
        unsplash_url: req.body.campaign.unsplash_url,
        photographer_id: req.body.campaign.photographer_id
      }

      knex('campaigns').where('photographer_id', data.photographer_id)
      .select('raised')
      .then((raised) => {

        data.balance+=raised[0].raised;

        return knex('campaigns').where('photographer_id', data.photographer_id).update({
          'raised': data.balance
        })
        .then((raised) => {
          var helper = require('sendgrid').mail;
          var from_email = new helper.Email('info@fundsplash.com');
          var to_email = new helper.Email(data.email);
          var subject = `Fundsplash Contribution`;
          var content = new helper.Content('text/html', `<img src="${data.profile_image}" style="border-radius:50%; margin:auto; display:block"><p style="text-align:center">Thank you for contributing to <a href="${data.unsplash_url}">@${data.username}'s</a> trip to ${data.location}!</p>`);
          var mail = new helper.Mail(from_email, subject, to_email, content);

          var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
          var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
          });

          sg.API(request, function(error, response) {
            res.json(data);
          });
        })
      })
    }
  });
});

module.exports = router;
