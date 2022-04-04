const { default: mongoose } = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    city: {
        type: String,
        require: true
    },
    cuisine: String,
    name: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        require: true
    }

});
module.exports = restaurantSchema;