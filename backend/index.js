const express = require('express');
const dotenv =  require('dotenv');
dotenv.config();
require('./db/mongoose');
const userAgentRouter = require('./routes/userAgentRoutes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userAgentRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});