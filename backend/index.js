const express = require('express');
const dotenv =  require('dotenv');
dotenv.config();
require('./db/mongoose');
const userAgentRouter = require('./routes/userAgentRoutes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const fbRouter = require('./routes/fbRouter');
const passport = require('passport');
const { fetchMessages, sendMessage } = require('./services/conversationService');
const http = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors:{}
});

app.use(cors());
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(userAgentRouter);
app.use(fbRouter);
app.use(passport.initialize());
app.use(passport.session());

http.listen(port, () => {
    console.log('Server is up on port ' + port);
});

io.on('connection',(socket)=>{
    socket.on('convSelected',async(data)=>{
        console.log('convSelected',data)
    })
    socket.on('sendMessage',async(data)=>{
        const response = await sendMessage(data.receiverId, data.text, data.pageData);
        const messages = await fetchMessages(data.convId,data.pageData.access_token);
        const sendData = {
            response,
            messages,
            convId:data.convId
        }
        socket.emit('latest_messages',JSON.stringify(sendData));
        // socket.emit('receive_message',JSON.stringify(data));
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
})