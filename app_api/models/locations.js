const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cardnumber: {
        type: String,
        required: true
    }
}, {collection: 'customers'});

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageRef: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {collection: 'steam'});

const customerModel = mongoose.model('customers', customerSchema, 'customers');
const gameModel = mongoose.model('steam', gameSchema, 'steam');
module.exports = { customerModel, gameModel };