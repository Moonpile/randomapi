function rollDie(numSides) {
  //var Promise = require("bluebird");
  //var rng     = require('random-number-csprng');
  
  return Math.ceil(Math.random() * numSides);

  /*var r = Promise.try(function() {
    console.log(rng(1, numSides))
  }).then(function(number) {
        console.log("Your random number:", number);
    }).catch({code: "RandomGenerationError"}, function(err) {
        console.log("Something went wrong!");
    })
    */

}

module.exports = rollDie