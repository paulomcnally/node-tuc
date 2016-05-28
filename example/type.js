// require library
const Tuc = require('../lib/tuc');

// instance class
const tuc = new Tuc();

// set number
let number = '00759794';

// enable debug;
tuc.setDebug(false);

// call method getType
tuc.getType(number, (balance) => {
  console.log(balance);
});
