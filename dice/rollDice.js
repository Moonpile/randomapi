

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

  if (diceParams.diceType == "e"){
    if (diceParams.numSides < 3){
      return "Non-smooth exploding dice must have more than two sides."
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

  if (diceParams.diceType == "eu" || diceParams.diceType == "su") {
    for (var i = 0; i < diceParams.numDice; i++) {
      if (diceParams.isThreshold) {
        var tRoll = dice.rollExplodingUpDie(diceParams.numSides, diceParams.isSmoothExploding) + diceParams.modifier;
        if (tRoll > diceParams.threshold) {
          total += 1;
        }
      } else {
        total = total + dice.rollExplodingUpDie(diceParams.numSides, diceParams.isSmoothExploding);
      }
    }
  }

  if (diceParams.diceType == "ed" || diceParams.diceType == "sd") {
    for (var i = 0; i < diceParams.numDice; i++) {
      if (diceParams.isThreshold) {
        var tRoll = dice.rollExplodingDownDie(diceParams.numSides, diceParams.isSmoothExploding) + diceParams.modifier;
        if (tRoll > diceParams.threshold) {
          total += 1;
        }
      } else {
        total = total + dice.rollExplodingDownDie(diceParams.numSides, diceParams.isSmoothExploding);
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

