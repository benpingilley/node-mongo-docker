// MAIN NODE JS FILE
// =============================================================================

// The web framework for the API
const Koa = require('koa')
// Routes requests to proper endpoints
const api = require('koa-router')()
// Ability to serve static coverage file
const serve = require('koa-static')
// Ability to mount the coverage static file to /coverage and /swagger
const mount = require('koa-mount')
// Koa 2 async-style middleware for swagger2, and serving UI via swagger-ui.
const koaSwagger = require('koa2-swagger-ui')
// Development style logger middleware for Koa
const logger = require('koa-logger')


// Create instance of the app
const app = new Koa()
// Initialize logging
app.use(logger())

// Routing Setup
const router = require('./routes/main')
api.use('/api', router.routes())
app.use(api.routes())

// Swagger Setup
app.use(mount('/swagger', serve(__dirname + '/swagger'))) // Serve directory for config access

app.use(koaSwagger({
  hideTopbar: true, // Hide the bar at top of UI
  routePrefix: '/', // Host at / instead of default /docs
  swaggerOptions: {
    url: 'swagger/api-docs.yml', // Config file
    docExpansion: 'list', // Expand Swagger UI to show endpoints
    validatorUrl: null, // Public online validator turned off
  },
}))

// Display Test Coverage created by Istanbul & Mocha
app.use(mount('/coverage', serve(__dirname + '/coverage/lcov-report')))

app.listen(process.env.PORT)
console.log('Listening on port ' + process.env.PORT)

// Expose the app as a module for testing purposes
module.exports = app
