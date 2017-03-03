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

const captcha = randomstring.generate({
  length: 6,
  charset: '123456789',
});

/**
* Create class
*/
class Tuc {
  constructor() {
    this.number = '';
    this.url = 'https://mpeso.net/datos/consulta.php';
  }

  /**
  * Create a object error
  */
  error(message, code) {
    return {
      error: {
        message: message,
        code: code,
      },
    };
  }

  /**
  * Check if object is a error
  */
  isError(obj) {
    return typeof obj.error === 'object';
  }

  /**
  * Make http request
  * @url {String}
  * @form {Object}
  * @callback {Function} {Object}
  */
  request(form, callback) {
    if (!this.isValid(this.number)) {
      callback(
        this.error('El formato no es correcto. El formato correcto es 00000000.', INVALID_FORMAT)
      );
    } else {
      const options = {
        form,
        url: this.url,
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36',
        },
      };

      // make a post request
      request.post(options, (error, response, body) => {
        if (error) {
          callback(
            this.error(error, HTTP_REQUEST_ERROR)
          );
        } else if (response.statusCode === 200) {
          try {
            callback(JSON.parse(body));
          } catch (err) {
            callback(
              this.error('El sitio www.mpeso.net está presentando problemas en la consulta del saldo.', EMPTY_RESPONSE)
            );
          }
        } else {
          callback(
            this.error('Error al intentar conectarse con el sitio www.mpeso.net', INVALID_RESPONSE)
          );
        }
      });
    }
  }

  /**
  * Check if number is valid format
  * @number {String}
  * return {Boolean}
  */
  isValid(number) {
    return /^\d{8}$/.test(number);
  }

  /**
  * Get account balance
  * @number {String}
  * @callback {Function}
  */
  getBalance(number, callback) {
    debug('Method: Balance');
    debug('Card: %s', number);

    this.number = number;

    // create form data
    const form = {
      _funcion: '1',
      _captcha: captcha,
      _terminal: number,
      _codigo: captcha,
    };

    // make a http request
    this.request(form, (response) => {
      if (response) {
        if (this.isError(response)) {
          callback(response);
        } else {
          // http://rubular.com/r/mP4ofBCZcx
          const regExp = /.*C\$\s(-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?).*/;

          if (!S(response.Mensaje).isEmpty() && regExp.test(response.Mensaje)) {
            callback(response.Mensaje.replace(regExp, '$1'));
          } else {
            callback(
              this.error(`${form._terminal} está inactivo`, INACTIVE)
            );
          }
        }
      } else {
        callback(
          this.error('Respuesta inválida del servidor', INVALID_RESPONSE)
        );
      }
    });
  }

  /**
  * Get account type
  * @number {String}
  * @callback {Function}
  */
  getType(number, callback) {
    debug('Method: Type');
    debug('Card: %s', number);

    this.number = number;

    // create form data
    const form = {
      _funcion: '2',
      _captcha: captcha,
      _ter: number,
      _codigo: captcha,
    };

    // make a http request
    this.request(form, (response) => {
      if (this.isError(response)) {
        callback(response);
      } else if (!S(response).isEmpty()) {
        const message = S(response.Mensaje).stripTags().s;

        if (message.split(':').length > 1) {
          callback(S(S(message.split(':')[1]).trim().s).capitalize().s);
        } else {
          callback(message);
        }
      } else {
        callback(
          this.error(`${form._terminal} está inactivo`, INACTIVE)
        );
      }
    });
  }
}

/**
* Export class
*/
module.exports = Tuc;
