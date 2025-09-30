const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // userId:{
    //     type: mongoose.Types.ObjectId,
    //     require: true,
    //     ref: 'User'
    // },
    modeljpg: {
        type: String,
        require: true,
    },
    model: {
        type: String,
        require: true,
    },
    texture: {
        type: [String],
        require: true,
    }
}, { timestamps: true });

const ModelSchema = mongoose.model('Model', userSchema);

module.exports = ModelSchema;