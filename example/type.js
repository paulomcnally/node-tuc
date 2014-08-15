// require library
var Tuc = require('../lib/tuc');
// instance class
var tuc = new Tuc();
// set number
var number = '00759794';
// enable debug;
tuc.setDebug(false);
// call method getType
tuc.getType(number, function(balance) {
  console.log(balance);
});
