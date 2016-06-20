var express = require('express');
var app = express();
var port = 3000;

require('./config/initialize.js')(app, express);

/* Real Data */
require('./routes/api-routes.js')(app);

// /* Seed Data */
// require('./routes/seed-routes.js')(app);

app.listen(port, function() {
    console.log("Listening to Users Service on port: ", port);
});