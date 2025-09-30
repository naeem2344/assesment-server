const mongoose = require('mongoose');

const UserCustomization = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        require: true,
    },

    productName: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    customization: {
        type: [
            {
                name: String,
                url: String
            },
        ],
        require: true
    }
}, { timestamps: true });


const CustomizationSchema = mongoose.model('Customization', UserCustomization)
module.exports = CustomizationSchema;
