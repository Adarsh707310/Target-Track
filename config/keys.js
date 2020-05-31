const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:password01@cluster0-rdlkz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


module.exports = {
  mongoURI: uri,
  secretOrKey: "secret"   
};

