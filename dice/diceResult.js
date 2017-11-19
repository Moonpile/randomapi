function diceResult(){
var dice = require('./modules.js')
  this.total = 0
  this.rolls = []
  this.diceParams
  this.rolls
  this.rollToString = function(){
      var individualrolls = '('
      for (let roll of this.rolls)
        {
          //console.log(roll)
          if (isNaN(roll) && roll.rolls != undefined){
            if (roll.rolls.length > 1) {
                individualrolls += roll.total 
                if (this.diceParams.isThreshold){
                    if (roll.total >= this.diceParams.threshold){individualrolls += '*'}
                  }
                individualrolls += ':' + roll.rollToString()
              }
            else {
               individualrolls += roll.total 
                  if (this.diceParams.isThreshold){
                    if (roll.total >= this.diceParams.threshold){individualrolls += '*'}
                  }
            }

              
          }
          else{
            individualrolls += roll 
            if (this.diceParams.isThreshold){
              if (roll >= this.diceParams.threshold) {individualrolls += '*'}
            }
          }
          individualrolls += ','
        }
      if (individualrolls.endsWith(','))
        {
          individualrolls = individualrolls.substring(0, individualrolls.length-1)
        }
      individualrolls += ')'
      return individualrolls 
  }
}
module.exports = diceResult