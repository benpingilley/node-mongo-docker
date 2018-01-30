// External Modules
const mongoist = require('mongoist')

const dbConnection = () => {
  return mongoist('mongodb://mongodb:27017/datasets')
}

// Export functions as modules for use in other files
exports.dbConnection = dbConnection