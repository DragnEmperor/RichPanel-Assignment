const express = require('express')
const UserAgent = require('../models/userAgent')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users/signUp', async (req, res) => {
    const user = new UserAgent(req.body)
    try {
        const existingUser = await UserAgent.findOne({ email:user.email });
        if (existingUser) {
          return res.status(400).send({status:false, message: 'User already exists!' });
        }
        await user.save()
        const token = await user.generateAuthToken();
        res.status(200).send({ status:true, user, token });
    } catch (e) {
        res.status(401).send({status:false,message:e.message});
    }
})

router.post('/users/login', async (req, res) => {
    try {
        // using the custom function findByCredentials defind in schema file
        const user = await UserAgent.findByCredentials(req.body.email, req.body.password);
        if(!user)
        return res.status(200).send({status:false, message: 'User not found! Please Register!' });
        const token = await user.generateAuthToken();
        res.send({status:true, user, token });
    } catch (e) {
        res.status(200).send({status:false, message: 'Invalid Details!!' });
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        // remove current login using current token
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        }) 
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(200).send(e);
    }
})

module.exports = router