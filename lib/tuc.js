var request = require('request');
var S = require('string');

var supportEmail = 'paulomcnally@gmail.com';

var captcha = 'captcha';

var Tuc = function() {}

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

}

Tuc.prototype.getBalance = function( number, callback ){

    var url = 'https://mpeso.net/datos/consulta.php';

    var params = {
        "_funcion": "1",
        "_captcha": captcha,
        "_terminal": number,
        "_codigo": captcha
    }

    new Tuc().request( url, params, function(err, res){

        var balance = '';

        var regExp = /\s(\d{1,}.\d{2})/;

        if( res.Mensaje.match(regExp)[1] ){
            balance = 'C$ ' + res.Mensaje.match(regExp)[1];
        }
        else{
            balance = 'Error al obtener los datos';
        }

        callback( balance );
    });

}


Tuc.prototype.getType = function( number, callback ){

    var url = 'https://mpeso.net/datos/consulta.php';

    var params = {
        "_funcion": "2",
        "_captcha": captcha,
        "_ter": number,
        "_codigo": captcha
    }

    new Tuc().request( url, params, function(err, res){

        var type = S( S( S(res.Mensaje).stripTags().s.split(':')[1] ).trim().s ).capitalize().s;

        callback( type );
    });

}


module.exports = Tuc;