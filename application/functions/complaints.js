const config = require('./config')

/**
 * Find available group values for `condValue` in /mostComplaintsPer route
 * @param {str} group - Group
 * @return {arr} - Group values
 */
const availableComplaintGroupValues = async (group) => {
  const db = config.dbConnection()
  const data = await db.runCommand({
    // Find all the distinct group values
    'distinct': 'complaints',
    'key': group,
  });
  db.close()
  return data
}

/**
 * Find number of complaints grouped by `keyKey` when `condKey` equals `condValue`
 * @param {str} condKey - Condition Key
 * @param {str} condValue - Condition Value
 * @param {str} keyKey - Key to group by
 * @return {arr} - Complaints where `condKey` equals `condValue` grouped by `keyKey`
 */
const complaintsPer = async (condKey, condValue, keyKey) => {
  const db = config.dbConnection()
  const data = await db.complaints.group({
    'key': {
      // Group by this variable
      [keyKey]: true,
    },
    'initial': {
      // Initialize complaints at 0
      'complaints': 0,
    },
    'reduce': function(obj, prev) {
      // If a complaint matching condition is found, increment by 1
      prev.complaints++
    },
    'cond': {
      // [SQL] WHERE condKey = condValue
      [condKey]: condValue,
    },
  })
  db.close()
  return data
}

// Export functions as modules for use in other files and testing
exports.availableComplaintGroupValues = availableComplaintGroupValues
exports.complaintsPer = complaintsPer
