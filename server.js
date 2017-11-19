// server.js
// where your node app starts
console.log(__dirname)
// init project
var express     = require('express');
var bodyParser  = require("body-parser");
var app         = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var dice = require('./dice/modules.js')

var dicerouter = express.Router();

dicerouter.get('/:diceExpression', function(req, res) {
  var diceParams = new dice.diceParameters(req.params.diceExpression)
  var result = dice.rollDice(diceParams)
  res.json(result)
})

app.use('/dice/', dicerouter);

var tablerouter = express.Router();
tablerouter.get('/:tableName', function(req, res) {
  res.json({message: 'Table:' + req.params.tableName});
})

app.use('/table/', tablerouter);


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
