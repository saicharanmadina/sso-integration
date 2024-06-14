const express = require('express');
const axios = require('axios');
const router = express.Router();
const queryString = require('query-string')
require('dotenv').config()

// Initiates the Google Login flow
router.get('/auth/google', (req, res) => {

  const params = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'profile email',
    prompt: 'select_account'
  })

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  res.redirect(url);
});

// Callback URL for handling the Google Login response
router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    res.send({ data, profile });

  } catch (error) {
    console.error('Error:', error);
    res.redirect('/login');
  }
});

// Initiates the Github Login flow
router.get('/auth/github', (req, res) => {

  const params = queryString.stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/auth/github/callback',
    scope: ['read:user', 'user:email'].join(' '), // space seperated string
    allow_signup: false,
    prompt: 'select_account'
  });

  const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

  res.redirect(githubLoginUrl);
});

// Callback URL for handling the Github Login response
router.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;
  try {
    if (!code) {
      console.error('Code is empty')
      return res.redirect('/');
    }

    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const accessToken = tokenResponse?.data?.access_token;

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'Node.js Application'
      }
    });

    res.send({ data: userResponse.data });
  } catch (error) {
    console.error('Error:', error);
    res.redirect('/login');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  // Code to handle user logout
  res.redirect('/login');
});

module.exports = router;