// require library
const Tuc = require('../lib/tuc');

// instance class
const tuc = new Tuc();

// set number
let number = '00759799';

// call method getBalance
tuc.getBalance(number, (balance) => {
  console.log(balance);
});
