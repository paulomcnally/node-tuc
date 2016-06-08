'use strict';
const debug = require('debug')('tuc');
const randomstring = require('randomstring');
const request = require('request');
const S = require('string');

const INVALID_FORMAT = 100;
const HTTP_REQUEST_ERROR = 101;
const EMPTY_RESPONSE = 102;
const INVALID_RESPONSE = 103;
const INACTIVE = 104;

let captcha = randomstring.generate({
  length: 6,
  charset: '123456789',
});

/**
* Create class
*/
class Tuc {
  constructor() {
    this.number = '';
    this.debug = false;
    this.url = 'https://mpeso.net/datos/consulta.php';
  }

  /**
  * Create a object error
  */
  error(message, code) {
    let error = {
      error: {
        message: message,
        code: code,
      },
    };
    return error;
  };

  /**
  * Check if object is a error
  */
  isError(obj) {
    if (typeof obj.error === 'object') {
      return true;
    } else {
      return false;
    }
  };

  /**
  * Make http request
  * @url {String}
  * @form {Object}
  * @callback {Function} {Object}
  */
  request(url, form, callback) {
    // set context on _this
    let _this = this;

    if (!_this.isValid(_this.number)) {
      callback(
        _this.error('El formato no es correcto. El formato correcto es 00000000.', INVALID_FORMAT)
      );
    } else {
      // init request settings
      /*
      request.defaults({
        strictSSL: false, // allow us to use our _this-signed cert for testing
        rejectUnauthorized: false,
      });
      */

      let options = {
        url: _this.url,
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36',
        },
        form: form,
      };

      // make a post request
      request.post(options, (error, response, body) => {
        debug('Status Code: %d', response.statusCode);
        debug(body);

        if (error) {
          callback(
            _this.error(error, HTTP_REQUEST_ERROR)
          );
        } else {
          if (response.statusCode === 200) {
            try {
              callback(JSON.parse(body));
            } catch (e) {
              console.log(e.message);
              callback(
                _this.error('El sitio www.mpeso.net está presentando problemas en la consulta del saldo.', EMPTY_RESPONSE)
              );
            }
          } else {
            callback(
              _this.error('Error al intentar conectarse con el sitio www.mpeso.net', INVALID_RESPONSE)
            );
          }
        }
      });
    }
  };

  /**
  * Check if number is valid format
  * @number {String}
  * return {Boolean}
  */
  isValid(number) {
    return /^\d{8}$/.test(number);
  };

  /**
  * Get account balance
  * @number {String}
  * @callback {Function}
  */
  getBalance(number, callback) {
    debug('Method: Balance');
    debug('Card: %s', number);

    // set context on _this
    let _this = this;
    _this.number = number;

    // create form data
    let form = {
      _funcion: '1',
      _captcha: captcha,
      _terminal: number,
      _codigo: captcha,
    };

    // make a http request
    _this.request(_this.url, form, (response) => {
      if (response) {
        if (_this.isError(response)) {
          callback(response);
        } else {
          let regExp = /.*C\$\s(\d{1,}\.\d{1,}).*/;
          if (!S(response.Mensaje).isEmpty() && regExp.test(response.Mensaje)) {
            callback(response.Mensaje.replace(regExp, '$1'));
          } else {
            callback(
              _this.error(`${form._terminal} está inactivo`, INACTIVE)
            );
          }
        }
      } else {
        callback(
          _this.error('Respuesta inválida del servidor', INVALID_RESPONSE)
        );
      }
    });
  };

  /**
  * Get account type
  * @number {String}
  * @callback {Function}
  */
  getType(number, callback) {
    debug('Method: Type');
    debug('Card: %s', number);

    // set context on _this
    let _this = this;
    _this.number = number;

    // create form data
    let form = {
      _funcion: '2',
      _captcha: captcha,
      _ter: number,
      _codigo: captcha,
    };

    // make a http request
    _this.request(_this.url, form, (response) => {
      if (_this.isError(response)) {
        callback(response);
      } else {
        if (!S(response).isEmpty()) {
          let message = S(response.Mensaje).stripTags().s;
          if (message.split(':').length > 1) {
            callback(S(S(message.split(':')[1]).trim().s).capitalize().s);
          } else {
            callback(message);
          }
        } else {
          callback(
            _this.error(`${form._terminal} está inactivo`, INACTIVE)
          );
        }
      }
    });
  };
};

/**
* Export class
*/
module.exports = Tuc;
