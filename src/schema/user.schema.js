const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const UserSchema = mongoose.model('User', userSchema);

module.exports = UserSchema;
