var request = require('request');
var S = require('string');

var supportEmail = 'paulomcnally@gmail.com';

var captcha = 'captcha';

var Tuc = function() {

};

Tuc.prototype.request = function( url, params, callback ){

  request.defaults({
    strictSSL: false, // allow us to use our self-signed cert for testing
    rejectUnauthorized: false
  });

  request.post(url, { form: params }, function (error, response, body) {
    if( error ){
      console.log( error, null );
    }
    else{
      callback( null, JSON.parse( body ) );
    }

  });

};

Tuc.prototype.getBalance = function( number, callback ){

  var url = 'https://mpeso.net/datos/consulta.php';

  var params = {
    "_funcion": "1",
    "_captcha": captcha,
    "_terminal": number,
    "_codigo": captcha
  };

  this.request( url, params, function(err, res){

    var balance = '';

    if ( !S(res.Mensaje).isEmpty() && res.Mensaje.indexOf("MPESO") > -1 ){

      var regExp = /[0-9]+(?:\.[0-9]*)?/;
      var match = res.Mensaje.match(regExp).shift();

      if( match ){

        balance = 'C$ ' + match;

      }
      else{

        balance = 'Error al obtener los datos';

      }

    }
    else{

      balance = params._terminal + " no es un número de tarjeta Tuc o está inactivo";

    }

    callback( balance );

  });

};


Tuc.prototype.getType = function( number, callback ){

  var url = 'https://mpeso.net/datos/consulta.php';

  var params = {
    "_funcion": "2",
    "_captcha": captcha,
    "_ter": number,
    "_codigo": captcha
  };

  this.request( url, params, function(err, res){

    var type = '';

    if(!S(res).isEmpty()){

      var message = S(res.Mensaje).stripTags().s;

      if( message.split(':').length > 1 ){

        type = S( S( message.split(':')[1] ).trim().s ).capitalize().s;

      }
      else{

        type = message;

      }

    }
    else{

      type = params._ter + " no es un número de tarjeta Tuc o está inactivo";

    }

    callback( type );

  });

};

module.exports = Tuc;
