# TUC

![Bus](http://i.imgur.com/r5xuL7x.png)

[![NPM](https://nodei.co/npm/tuc.png)](https://nodei.co/npm/tuc/)

# Installation

    $ npm install tuc

# Example

    // require library
    const Tuc = require('tuc');

    // instance class
    const tuc = new Tuc();

    // set number
    let number = '00758888';

    // call method getBalance
    tuc.getBalance(number, (balance) => {
      console.log(balance);
    });

    // call method getType
    tuc.getType(number, (balance) => {
      console.log(balance);
    });

# Responses

    30.00
    Cuenta limitada (sin movil)

# Contributors

* [hosmelq](https://github.com/hosmelq)
* [BruceLampson](https://github.com/BruceLampson)
* [robe007](https://github.com/robe007)
* [oscarmcm](https://github.com/oscarmcm)

This is a unoficial client. For more info visit [https://mpeso.net/](https://mpeso.net/)
