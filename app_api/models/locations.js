const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    cardnumber: String
}, {collection: 'customer'});

const gameSchema = new mongoose.Schema({
    title: String,
    imageRef: String,
    description: String,
    imageRef: String,
    genre: String,
    price: Number
}, {collection: 'steam'});

const customerModel = mongoose.model('customer', customerSchema, 'steam');
const gameModel = mongoose.model('steam', gameSchema, 'steam');
module.exports = { customerModel, gameModel };