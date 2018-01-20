// External Modules
const mongoist = require('mongoist')

const getKeys = async (collection) => {
  const db = mongoist('mongodb://mongodb:27017/datasets')
  let keys = []
  const doc = await db[collection].findOne()
  for (key in doc) {
    if (doc.hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  return keys
  db.close()
}

// Need to work on creating module connection for MongoDB
/* const connect = () => {
  const mongoist = require('mongoist')
  module.exports = mongoist('mongodb://mongodb:27017/datasets')
}*/

// Unable to create a mocked MongoDB using Async functionality
// I would need to work on this more
/* const mongodb = require('mongo-mock')

if (process.env.TEST != 'true') {
  module.exports = mongoist('mongodb://mongodb:27017/datasets')
} else {
  const MongoClient = mongodb.MongoClient
  MongoClient.persist="mongo.js" //persist the data to disk
  let _db
  module.exports = {
    function( callback ) {
      MongoClient.connect( "mongodb://localhost:27017/datasets", function( err, db ) {
        _db = db
        return callback( err )
      })
    }
  }
}*/

exports.getKeys = getKeys;
