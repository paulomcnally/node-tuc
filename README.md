# TUC

[![NPM](https://nodei.co/npm/tuc.png)](https://nodei.co/npm/tuc/)

# Installation

    $ npm install tuc
    
# Example

    var Tuc = require('tuc');
    
    var tuc = new Tuc();
    
    tuc.getBalance('00759795', function( balance ){
    
        console.log( balance );
    
    });
    
    tuc.getType('00759795', function( type ){
    
        console.log( type );
    
    });
    
# Responses

    C$ 30.00
    Cuenta limitada (sin movil)
    
This is a unoficial client. For more info visit [https://mpeso.net/](https://mpeso.net/)