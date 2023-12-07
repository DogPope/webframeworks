const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    cardnumber: String
}, {collection: 'customers'});

const gameSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageRef: String,
    genre: String,
    price: Number
}, {collection: 'steam'});

const customerModel = mongoose.model('customers', customerSchema, 'customers');
const gameModel = mongoose.model('steam', gameSchema, 'steam');
module.exports = { customerModel, gameModel };