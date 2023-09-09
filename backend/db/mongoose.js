const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.log('Error: ', err.message);
});