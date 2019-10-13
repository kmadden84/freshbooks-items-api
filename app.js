'use strict';

// load modules
const express = require('express');
var bodyParser = require('body-parser');
const morgan = require('morgan');
var cors = require('cors')

//const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
//app.use(express.json());

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false
}));
// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(cors())

// setup a friendly greeting for the root route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the FreshBooks Item Quantity API',
  });
});

// Define routes.

const itemRoute = require('./routes/items');

// Add routes.
app.use('/api/items', itemRoute);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

module.exports = app;
