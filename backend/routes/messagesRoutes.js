const express = require('express')
const UserAgent = require('../models/userAgent')
const auth = require('../middleware/auth')
const router = new express.Router();
const querystring = require('query-string');
const axios = require('axios');

const stringifiedParams = querystring.stringify({
    client_id: process.env.FACEBOOK_APP_ID,
    redirect_uri: "http://localhost:3000/fb/getToken",
    scope: ["email", "pages_messaging", "pages_messaging_subscriptions", "pages_messaging_phone_number"].join(","),
    response_type: 'code',
});


router.get('/fb/getAccessToken', auth, async (req, res) => {
    try {
        const { code } = req.body;
        const response = await axios({
            url: 'https://graph.facebook.com/v17.0/oauth/access_token',
            method: 'get',
            params: {
                client_id: process.env.FB_APP_ID,
                client_secret: process.env.FB_SECRET,
                redirect_uri: "http://localhost:3000/fbIntegrate/",
                code: code
            }
        })
        return res.status(200).send({ status: true, fbToken: response.data.access_token })
    }
    catch (error) {
        res.status(400).send({ status: false, error: error.message })
    }
})


router.post('/fb/messages', auth, async (req, res) => {
    try {

    }
    catch (error) {
        res.status(200).send({ error })
    }
})