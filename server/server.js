var express = require('express');
var app = express();
var port = 1000;

require('./config/initialize.js')(app, express);

/* Real Data */
require('./routes/api-routes.js')(app);

/* Seed Data */
require('./routes/seed-routes.js')(app);

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("Listening to Users Service on port %s.", port, port);
  }
)