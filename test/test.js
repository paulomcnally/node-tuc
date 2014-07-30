var Tuc = require('../lib/tuc');

var tuc = new Tuc();

tuc.getBalance('00000100', function( balance ){

    console.log( balance );

});


tuc.getType('00000100', function( balance ){

    console.log( balance );

});
