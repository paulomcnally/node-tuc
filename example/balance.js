// require library
var Tuc = require('../lib/tuc');
// instance class
var tuc = new Tuc();
// set number
var number = '00007564';
// enable debug;
tuc.setDebug(false);
// call method getBalance
tuc.getBalance(number, function(balance) {
  console.log(balance);
});
