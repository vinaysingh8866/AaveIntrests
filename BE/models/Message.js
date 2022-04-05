const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
    address: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },

});
module.exports = messageSchema;