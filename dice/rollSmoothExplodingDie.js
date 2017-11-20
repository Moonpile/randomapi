function rollSmoothExplodingDie(diceParams){

var dice = require('./modules.js')
  let orgSides = parseInt(diceParams.numSides)
  let numSides = parseInt(diceParams.numSides)
  if (diceParams.explodeDown == true) {
    numSides++
  }
  if (diceParams.explodeUp == true) {
    numSides++
  }
  
  var both = diceParams.explodeUp && diceParams.explodeDown
  
  var result = new dice.diceResult()
  result.diceParams = diceParams
  var roll = dice.rollDie(numSides)
  var total = 0
  if (roll == orgSides + 1 && (both == true || diceParams.explodeDown == true)){
    total = 0
    var downRoll = rollSmoothExplodingDie(diceParams)
    total = total - downRoll.total
    result.rolls.push(1)
    result.rolls.push(downRoll)
  }
  else if ((roll == orgSides + 2 && both == true) 
              || (roll == orgSides + 1 && both != true && diceParams.explodeUp == true)){
    total = orgSides
    var upRoll = rollSmoothExplodingDie(diceParams)
    total = total + upRoll.total
    result.rolls.push(orgSides)
    result.rolls.push(upRoll)
  }
  else {
    total = roll
    result.rolls.push(roll)
  }
  
  result.total = total
  //console.log(result)
  return result
}


module.exports = rollSmoothExplodingDie