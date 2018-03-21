function diceResult(){
var dice = require('./modules.js')
  this.total = 0;
  this.dropped = false;
  this.rolls = [];
  this.diceParams;
  this.rolls;
  this.rollToString = function(){
      console.log("roll to string");
      var individualrolls = '(';

      for (let roll of this.rolls)
        {
          if (roll.dropped == true) {
            individualrolls += 'dropped '; 
            console.log("dropped to string");
          }          
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