function rollExplodingDie(diceParams){

var dice = require('./modules.js')
  
  var numSides = diceParams.numSides
  var result = new dice.diceResult()
  result.diceParams = diceParams
  var roll = dice.rollDie(numSides)
  var total = 0
  if (roll == 1 && diceParams.explodeDown == true){
    total = 1
    var downRoll = rollExplodingDie(diceParams)
    total = total - downRoll.total
    result.rolls.push(roll)
    result.rolls.push(downRoll)
  }
  else if (roll == numSides && diceParams.explodeUp == true) {
    total = roll
    var upRoll = rollExplodingDie(diceParams)
    total = total + upRoll.total
    result.rolls.push(roll)
    result.rolls.push(upRoll)
  }
  else {
    total = roll
    result.rolls.push(roll)
  }
  result.total = total
  return result
}


module.exports = rollExplodingDie
