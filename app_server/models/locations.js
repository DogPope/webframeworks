const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    cardnumber: String
});

const gameSchema = new mongoose.Schema({
    title: String,
    description: String,
    genre: String,
    price: Number,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    status: String
});

mongoose.model('Game', customerSchema, gameSchema);