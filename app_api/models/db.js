const mongoose = require('mongoose');
const dbURI = "mongodb+srv://daniel:mtu12345@cluster0.yupn0z5.mongodb.net/Steam?retryWrites=true&w=majority";

try {

    mongoose.connect(
        dbURI,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose is connected");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
}
catch (e) {
    console.log("could not connect");
}
require('./locations');