// require library
var Tuc = require('../lib/tuc');
// instance class
var tuc = new Tuc();
// set number
var number = '00759794';
// call method getType
tuc.getType(number, function(balance) {
  console.log(balance);
});
