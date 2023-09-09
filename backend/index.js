const express = require('express');
const dotenv =  require('dotenv');
const https = require('https');
const fs = require('fs');
dotenv.config();
require('./db/mongoose');
const userAgentRouter = require('./routes/userAgentRoutes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const options = {
    key: fs.readFileSync('localhost-key.pem'),
    cert: fs.readFileSync('localhost.pem'),
};
const fbRouter = require('./routes/fbRouter');
const passport = require('passport');

app.use(cors());
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(userAgentRouter);
app.use(fbRouter);
app.use(passport.initialize());
app.use(passport.session());

https.createServer(options, app).listen(port, () => {
    console.log('Server is up on port ' + port);
});