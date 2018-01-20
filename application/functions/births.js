// External Modules
const mongoist = require('mongoist')

/**
 * Find number of births grouped by `key`
 * @param {str} key - Group by this
 * @return {arr} - Objects containing births per `key`
 */
const birthsPer = async (key) => {
  const db = mongoist('mongodb://mongodb:27017/datasets')
  const data = await db.births.aggregate({
    $group:
    {
      _id: '\$'+key, // Must use _id as key when using aggregate
      births: {$sum: '$occurrences'}, // Sum of fields with same key
    },
  })
  db.close()
  return data
}

/**
 * Find number of births grouped by `key` between `startYear` and `endYear`
 * @param {str} key - Group by this
 * @param {int} startYear - Start Year
 * @param {int} endYear - End Year
 * @return {arr} - Objects containing births per `key`
 */
const birthsPerRange = async (key, startYear, endYear) => {
  const db = mongoist('mongodb://mongodb:27017/datasets')
  const data = await db.births.group({
    'key': {
        [key]: true,
    },
    'initial': {
      // Initialize births at 0
      'births': 0,
    },
    'reduce': function(obj, prev) {
      // Add name occurances to births variable
      prev.births = prev.births + obj.occurrences - 0
    },
    'cond': {
      // [SQL] WHERE year BETWEEN startYear AND endYear
      'year': {
        '$gte': parseInt(startYear),
        '$lte': parseInt(endYear),
      },
    },
  });
  db.close()
  return data
}

// Export functions as modules for use in other files and testing
exports.birthsPer = birthsPer
exports.birthsPerRange = birthsPerRange
