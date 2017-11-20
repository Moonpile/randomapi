

exports.rollDice = function(diceParams) {
 
var dice = require('./modules.js')
  //var diceParams = new diceParameters(diceExpression);
  var total = 0;
  var result =  new dice.diceResult()
  result.diceParams = diceParams
  
  if (diceParams.diceType == "d") {
    for (var i = 0; i < diceParams.numDice; i++) {
      if (diceParams.isThreshold) {
        var tRoll = dice.rollDie(diceParams.numSides) + diceParams.modifier;
        if (tRoll >= diceParams.threshold) {
          total += 1
          }
        result.rolls.push(tRoll)
      } else {
        var roll = dice.rollDie(diceParams.numSides)
        result.rolls.push(roll)
        total = total + roll
      }
    }
  }

  if (diceParams.diceType == "e" || diceParams.diceType == "ed" || diceParams.diceType == "eu"){
    if (diceParams.explodeUp ==  true && diceParams.explodeDown == true && diceParams.numSides < 3){
      diceParams.isValid = false
      result.rolls = "Non-smooth bi-directional exploding dice (ie dice type \"e\") must have more than two sides."
      return result
    }
    if (diceParams.numSides < 2){
      diceParams.isValid = false
      result.rolls = "Non-smooth uni-directional exploding (ie dice type \"ed\" or \"eu\") dice must have more than one side."
      return result
    }
    for (var i = 0; i < diceParams.numDice; i++){
      var exParams = new dice.diceParameters(diceParams.diceExpression)
      exParams.isThreshold = false
      var explodeRoll = dice.rollExplodingDie(exParams)
      if (diceParams.isThreshold){
        if (explodeRoll.total + diceParams.modifier >= diceParams.threshold){
          total += 1
        }
      }
      result.rolls.push(explodeRoll)
      if (!diceParams.isThreshold){
        total = total + explodeRoll.total
      }
      
    }
  }
  
  if (diceParams.diceType == "s" || diceParams.diceType == "sd" || diceParams.diceType == "su"){
    if (diceParams.explodeUp ==  true && diceParams.explodeDown == true && diceParams.numSides < 1){
      diceParams.isValid = false
      result.rolls = "Smooth exploding dice (ie dice type \"s\", \"sd\", or \"su\") must have more than one side."
      return result
    }
    for (var i = 0; i < diceParams.numDice; i++){
      var exParams = new dice.diceParameters(diceParams.diceExpression)
      exParams.isThreshold = false
      var explodeRoll = dice.rollSmoothExplodingDie(exParams)
      if (diceParams.isThreshold){
        if (explodeRoll.total + diceParams.modifier >= diceParams.threshold){
          total += 1
        }
      }
      result.rolls.push(explodeRoll)
      if (!diceParams.isThreshold){
        total = total + explodeRoll.total
      }
      
    }
  }

  if (!diceParams.isThreshold) {
    total += diceParams.modifier;
  }

  if (diceParams.enforceFloor) {
    if (total < diceParams.floor) {
      total = diceParams.floor;
      result.rolls.push(' floored to ' + diceParams.floor)
    }
  }

  if (diceParams.enforceCeiling) {
    if (total > diceParams.ceiling) {
      total = diceParams.ceiling;
      result.rolls.push(' ceilinged to ' + diceParams.ceiling)
    }
  }
 
  result.total = total
  result.rolls = result.rollToString()
  return result;
}

