# TUC

![Bus](http://i.imgur.com/r5xuL7x.png)

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

    30.00
    Cuenta limitada (sin movil)

# Contributors

* [hosmelq](https://github.com/hosmelq)
* [BruceLampson](https://github.com/BruceLampson)
* [robe007](https://github.com/robe007)

This is a unoficial client. For more info visit [https://mpeso.net/](https://mpeso.net/)
