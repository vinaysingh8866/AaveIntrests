const mongoose = require("mongoose");

const intrestsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    borrowRateData: [],
    lendingRateData: [],
    lastAdded: Date
});

module.exports = intrestsSchema;