const mongoose = require('mongoose');
// Connection string after cluster0 needs to be changed. Connection information is in Database section in MongoDB Atlas, top left on left nav bar.
// Click on Cluster0, then shell from the following menu. The String is in there.
// mongosh "mongodb+srv://cluster0.yupn0z5.mongodb.net/" --apiVersion 1 --username daniel
const dbURI = "mongodb+srv://daniel:mtu12345@cluster0.yupn0z5.mongodb.net/Loc8r?retryWrites=true&w=majority";

try {
   
mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {console.log(" Mongoose is connected")},
	err=> {console.log(err)}
	);
}
 catch (e) {
  console.log("could not connect");
}