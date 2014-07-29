var Tuc = require('../lib/tuc');

var tuc = new Tuc();

tuc.getBalance('00759795', function( balance ){

    console.log( balance );

});


tuc.getType('00759795', function( balance ){

    console.log( balance );

});
