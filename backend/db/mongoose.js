const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;
console.log('testt',dbURI)
mongoose.connect(dbURI, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.log('Error: ', err.message);
});