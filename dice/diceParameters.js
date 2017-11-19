function diceParameters(diceExpression){
    var myRegex = /^(\d+)?([dDeEsS]|eu|EU|ed|ED|su|SU|sd|SD)(\d+)([+-]\d+)?([fF]([-]?\d+))?([cC]([-]?\d+))?([tT]([-]?\d+))?$/;
  var match = myRegex.exec(diceExpression);
 
  this.diceExpression = diceExpression
  this.numDice = 1;
  this.diceType = "";
  this.numSides = 0;
  this.modifier = 0;
  this.errorMessage = "";
  this.isValid = false;
  this.isSmoothExploding = false;
  this.floor = 0;
  this.enforceFloor = false;
  this.ceiling = 0;
  this.enforceCeiling = false;
  this.threshold = 0;
  this.isThreshold = false;

  if (match === null) {
    this.errorMessage = "Bad Dice Expression '" + diceExpression + "'";
    this.isValid = false;
  }
  else 
    {
        if (match[1] != undefined) {
    this.numDice = match[1];
  }
  this.diceType = match[2].toLowerCase();
  this.isSmoothExploding = (this.diceType == "s" 
  													|| this.diceType == "su" 
                            || this.diceType == "sd");
  this.numSides = match[3];
  if (match[4] != undefined) {
    this.modifier = parseInt(match[4].replace("+", ""));
  }

  var enforceFloor = false;
  if (match[5] != undefined) {
    this.floor = parseInt(match[6]);
    this.enforceFloor = true;
  }

  var ceiling = 0;
  var enforceCeiling = false;
  if (match[7] != undefined) {
    this.ceiling = parseInt(match[8]);
    this.enforceCeiling = true;
  }

  var threshold = 0;
  var isThreshold = false;
  if (match[9] != undefined) {
    this.threshold = parseInt(match[10]);
    this.isThreshold = true;
  }
  
  this.isValid = true;
  }
  
  
}

module.exports = diceParameters