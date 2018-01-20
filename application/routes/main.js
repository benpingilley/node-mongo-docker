// External Modules
const router = require('koa-router')()

// Function Modules
const births = require('../functions/births')
const census = require('../functions/census')
const complaints = require('../functions/complaints')
const dbInfo = require('../functions/dbInfo')

/** * Birth Name Routes ***/

// Get birth keys
router.get('/birthKeys/', async (ctx, next) => {
  ctx.body = await dbInfo.getKeys('births')
})

// Find number of births grouped by `key`
router.get('/birthsPer/:key', async (ctx, next) => {
  const key = ctx.params.key
  const allBirthsPer = await births.birthsPer(key)
  // Numerically sort array of objects by `births`
  ctx.body = allBirthsPer.sort(function(a, b) {
    return b.births - a.births
  })
})

// Find number of births grouped by `key` between `startYear` and `endYear`
router.get('/birthsPerRange/:key/:startYear/:endYear', async (ctx, next) => {
  const key = ctx.params.key
  const startYear = ctx.params.startYear
  const endYear = ctx.params.endYear
  const allBirthsPer = await births.birthsPerRange(key, startYear, endYear)
  // Numerically sort array of objects by `births`
  ctx.body = allBirthsPer.sort(function(a, b) {
    return b.births - a.births
  })
})

/** * Customer Complaint Routes ***/

// Get complaint keys
router.get('/complaintKeys/', async (ctx, next) => {
  ctx.body = await dbInfo.getKeys('complaints')
})

// Find number of complaints grouped by `keyKey` when `condKey` equals `condValue`
router.get('/mostComplaintsPer/:condKey/:condValue/:keyKey', async (ctx, next) => {
  const condKey = ctx.params.condKey
  const condValue = ctx.params.condValue
  const keyKey = ctx.params.keyKey
  const allComplaintsPer = await complaints.complaintsPer(condKey, condValue, keyKey)
  // Numerically sort array of objects by `complaints`
  ctx.body = allComplaintsPer.sort(function(a, b) {
    return b.complaints - a.complaints
  })
})

// Find available group values for `condValue` in /mostComplaintsPer route
router.get('/availableComplaintGroupValues/:group', async (ctx, next) => {
  const group = ctx.params.group
  const allGroupValuesObj = await complaints.availableComplaintGroupValues(group)
  // Only need the values array from the object
  const allGroupValues = allGroupValuesObj.values
  ctx.body = allGroupValues.sort()
})


/** * Census Routes ***/

// Get census keys
router.get('/censusKeys/', async (ctx, next) => {
  ctx.body = await dbInfo.getKeys('census')
})

// Find populations for all states during a specific year
router.get('/statesPopulations/:year', async (ctx, next) => {
  const year = ctx.params.year
  const allStatesPopulations = await census.statesPopulations(year)
  // Alphabetically sort array of objects by `_id`
  ctx.body = allStatesPopulations.sort(function(a, b) {
    return a._id.localeCompare(b._id)
  })
})

// Find population growth for all states between `startYear` and `endYear`
router.get('/statesPopulationGrowths/:startYear/:endYear', async (ctx, next) => {
  const startYear = ctx.params.startYear
  const endYear = ctx.params.endYear
  // Returns population at both startYear and endYear
  const statesYearPops = await census.statesPopulationRanges(startYear, endYear)
  // Calculate the difference between years and sort by the difference
  ctx.body = await census.sortDiffs(statesYearPops)
})

module.exports = router
