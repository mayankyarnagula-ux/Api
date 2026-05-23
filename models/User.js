const mongoose = require("mongoose");
const { type } = require("node:os");

const userschema = new mongoose.Schema({
  name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("User",userschema);

