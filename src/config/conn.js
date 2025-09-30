
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected successfully to MongoDB with Mongoose");
})
    .catch(err => {
        console.error("Error connecting to MongoDB with Mongoose:", err);
    });;