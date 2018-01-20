// External Modules
const mongoist = require('mongoist')

/**
 * Find populations for all states during a specific year
 * @param {int} year - Year
 * @return {arr} - Populations of all states
 */
const statesPopulations = async (year) => {
  const db = mongoist('mongodb://mongodb:27017/datasets')
  const data = await db.census.aggregate({
    $group:
    {
      _id: '$st', // Must use _id as key when using aggregate
      Population: {$sum: '\$'+year}, // Sum of fields with key equal to `year`
    },
  });
  db.close();
  return data
}

/**
 * Find population growth for all states between years
 * @param {int} startYear - Start Year
 * @param {int} endYear - End Year
 * @return {arr} - Populations of all states
 */
const statesPopulationRanges = async (startYear, endYear) => {
  const db = mongoist('mongodb://mongodb:27017/datasets')
  const data = await db.census.aggregate({
    $group:
    {
      _id: '$st', // Must use _id as key when using aggregate
      startPop: {$sum: '\$'+startYear}, // Sum of fields with key equal to `startYear`
      endPop: {$sum: '\$'+endYear}, // Sum of fields with key equal to `endYear`
    },
  });
  db.close();
  return data
}

/**
 * Find difference between years and sort numerically
 * @param {obj} obj - Populations per state
 * @return {arr} - Numerically sorted populations of all states
 */
const sortDiffs = async (obj) => {
  // Create new array to push objects then sort
  let stateGrowth = []
  for (i in obj) {
    if (obj.hasOwnProperty(i)) {
      let statePop = {'state': obj[i]['_id'], 'population': ( obj[i]['endPop'] - obj[i]['startPop'] )}
      stateGrowth.push(statePop)
    }
  }
  stateGrowth.sort(function(a, b) {
 return b.population - a.population
})
  return stateGrowth
}

// Export functions as modules for use in other files and testing
exports.statesPopulations = statesPopulations;
exports.statesPopulationRanges = statesPopulationRanges;
exports.sortDiffs = sortDiffs;
