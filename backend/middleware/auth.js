const jwt = require('jsonwebtoken')
const UserAgent = require('../models/userAgent')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'valorant');
        console.log(decoded);
        const user = await UserAgent.findOne({ _id: decoded.user.id, 'tokens.token': token });
        if (!user) {
            console.log('error auth');
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.status(200).send({ error: 'Unauthorized',test:e })
    }
}

module.exports = auth