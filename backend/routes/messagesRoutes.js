const express = require('express')
const UserAgent = require('../models/userAgent')
const auth = require('../middleware/auth')
const router = new express.Router();
const querystring = require('query-string');

const stringifiedParams = querystring.stringify({
    client_id: process.env.FACEBOOK_APP_ID,
    redirect_uri: "http://localhost:3000/fb/getToken",
    scope:["email","pages_messaging","pages_messaging_subscriptions","pages_messaging_phone_number"].join(","),
    response_type: 'code',
});


router.get('/fb/redirect',)

router.post('/fb/messages',auth, async (req, res) => {
    try{
        
    }
    catch(error){
        res.status(200).send({error})
    }
})