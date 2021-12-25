const MongoClient = require('mongodb').MongoClient;
// assert relate with testing
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient (client gonna connect with DB)
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // called the function
  insertDocuments(db, function () {
  // close the connection to DB when done
    client.close();
  })

  // findDocuments(db, function(){
  //   client.close();
  // })

});

// function to insert Documents
const insertDocuments = function(db, callback) {
  // Get the documents collection: in this case named fruits
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Lemon",
      score: 10,
      review: "Sour"
    },
    {
      name: "Avocado",
      score: 5,
      review: "Weird"
    },
    {
      name: "Melon",
      score: 8,
      review: "Refreshing"
    }
  ], function(err, result) {
    console.log(result);
    assert.equal(err, null);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
