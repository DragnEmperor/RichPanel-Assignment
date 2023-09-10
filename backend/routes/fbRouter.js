const passport = require('passport');
const express = require('express')
const Strategy = require('passport-facebook').Strategy;
let access_token = null;
let fbprofile = null;
const router = new express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');
const { processConversations, sendMessage } = require('../services/conversationService');
const Conversation = require('../models/conversationSchema');
// const cron = require('node-cron');
// let userPageData = null;

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new Strategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.FRONTEND_HOST,
    profileFields: ["id", "displayName", "name", "emails"],
},
    function (accessToken, refreshToken, profile, cb) {
        profile.accessToken = accessToken;
        profile.userId = profile.id;
        access_token = accessToken;
        fbprofile = profile;
        cb(null, profile);
    }));

router.get("/facebook/login", passport.authenticate("facebook", { scope: ['pages_show_list', 'pages_messaging', 'pages_read_user_content', 'pages_manage_engagement'] }));

router.post('/facebook/getCompleteData', async (req, res) => {
    try {
        const { code } = req.body;
        const queryParams = new URLSearchParams({
            client_id: process.env.FB_APP_ID,
            client_secret: process.env.FB_SECRET,
            redirect_uri: process.env.FRONTEND_HOST,
            code: code,
        });
        const url = `https://graph.facebook.com/v17.0/oauth/access_token?${queryParams}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        // for long term access token
        const queryParams1 = new URLSearchParams({
            client_id: process.env.FB_APP_ID,
            client_secret: process.env.FB_SECRET,
            fb_exchange_token:data.access_token
          });
        const url1 = `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&${queryParams1}`;
        const response1 =  await fetch(url1, {
            method: 'GET',
        });
        const data1 = await response1.json();
        const url2 = `https://graph.facebook.com/v17.0/me?fields=id&access_token=${data.access_token}`;
        const response2 = await fetch(url2, {
            method: 'GET',
        });
        const data2 = await response2.json();
        const userId = data2.id;
        //getPages
        const url3 = `https://graph.facebook.com/${userId}/accounts?fields=name,access_token&access_token=${data.access_token}`
        const response3 = await fetch(url3, {
            method: 'GET',
        });
        const data3 = await response3.json();
        // userPageData = data3.data[0];
        await processConversations(data3.data[0]);
        return res.status(200).send({ status: true, fbToken: data1.access_token, pageData: data3.data })
    }
    catch (error) {
        res.status(400).send({ status: false, error: error.message })
    }
});

router.post('/facebook/getuserId', async (req, res) => {
    try {
        const { accessToken } = req.body;
        const url = `https://graph.facebook.com/v17.0/me?fields=id&access_token=${accessToken}`;
        const response = await axios.get(url);
        const data = await response.json();
        return res.status(200).send({ status: true, userId: data })
    }
    catch (error) {
        res.status(400).send({ status: false, error: error.message })
    }
})

router.post('/facebook/getConversations', async (req, res) => {
    try {
        const { pageId, accessToken } = req.body;
        const allConversations = await Conversation.find({ pageId });
        return res.status(200).send({ status: true, conversations:allConversations });
    }
    catch (error) {
        res.status(400).send({ status: false, error: error.message })
    }
});

router.post('/facebook/reloadConversations',async(req,res)=>{
    try{
        const {fbPageData} = req.body;
        await processConversations(fbPageData);
        return res.status(200).send({status:true,message:'Conversations Reloaded!'});
    }catch(error){
        res.status(400).send({status:false,error:error.message});
    }
})

router.post('/facebook/sendMessage',async(req,res)=>{
    try{
        const {receiverId, text, pageData} = req.body;
        const data = await sendMessage(receiverId,text,pageData);
        return res.status(200).send({status:true,message:'Message Sent!',data});
    }catch(error){
        res.status(400).send({status:false,error:error.message});
    }
})

// async function latestConversations(userPageData) {
//     try {
//         if(userPageData){
//             await processConversations(userPageData);
//             console.log('Reloaded conversations successfully');
//         }
//         else
//         throw 'No page data found!'
//     } catch (error) {
//       console.error('Error reloading conversations:', error);
//     }
//   }
  
// cron.schedule('*/5 * * * * *', () => {
//     latestConversations(userPageData);
// });
 
module.exports = router;