// require library
var Tuc = require('../lib/tuc');
// instance class
var tuc = new Tuc();
// set number
var number = '00759794';
// call method getBalance
tuc.getBalance(number, function(balance) {
  console.log(balance);
});
