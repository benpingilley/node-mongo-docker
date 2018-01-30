const config = require('./config')

const getKeys = async (collection) => {
  const db = config.dbConnection()
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

// Export functions as modules for use in other files
exports.getKeys = getKeys