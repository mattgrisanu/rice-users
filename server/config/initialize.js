var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  // app.use(express.static(__dirname + './../../client'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  // app.engine('jade', jade);
  // app.set('view engine', 'jade');
  // app.set('views', __dirname + './../views');
}
