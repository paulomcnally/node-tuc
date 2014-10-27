'use strict';

var request = require('request');
var S = require('string');

var captcha = 'captcha';

/**
 * Create class
 */
var Tuc = function() {
  this.number = '';
  this.debug = false;
};

/**
 * Enable or disable show debug
 * @debug {boolean}
 */
Tuc.prototype.setDebug = function(debug) {
  if (typeof debug === 'boolean') {
    this.debug = debug;
  }
};

/**
 * Base url
 */
Tuc.prototype.url = 'https://mpeso.net/datos/consulta.php';

/**
 * Create a object error
 */
Tuc.prototype.error = function(message) {
  var error = {
    error: {
      message: message
    }
  };
  return error;
};

/**
 * Check if object is a error
 */
Tuc.prototype.isError = function(obj) {
  if (typeof obj.error === 'object') {
    return true;
  }
  else {
    return false;
  }
};

/**
 * Make http request
 * @url {String}
 * @form {Object}
 * @callback {Function} {Object}
 */
Tuc.prototype.request = function(url, form, callback) {
  // set context on self
  var self = this;

  if (!self.isValid(self.number)) {
    callback(
      self.error('El formato no es correcto. El formato correcto es 00000000.')
    );
  }
  else {
    // init request settings
    request.defaults({
      strictSSL: false, // allow us to use our self-signed cert for testing
      rejectUnauthorized: false
    });

    // make a post request
    request.post(url, {form: form}, function (error, response, body) {
      if (self.debug) {
        console.log(body);
      }
      if (error) {
        callback(
          self.error(error)
        );
      }
      else {
        if (response.statusCode === 200) {
          callback(JSON.parse(body));
        }
        else {
          callback(
            self.error('Error al intentar conectarse con el sitio www.mpeso.net')
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
Tuc.prototype.isValid = function(number) {
  return /^\d{8}$/.test(number);
};

/**
 * Get account balance
 * @number {String}
 * @callback {Function}
 */
Tuc.prototype.getBalance = function(number, callback) {
  // set context on self
  var self = this;
  self.number = number;

  // create form data
  var form = {
    '_funcion': '1',
    '_captcha': captcha,
    '_terminal': number,
    '_codigo': captcha
  };

  // make a http request
  self.request(self.url, form, function(response) {
    if (self.isError(response)) {
      callback(response);
    }
    else {
      var regExp = /.*C\$\s(\d{1,}\.\d{1,}).*/;
      if (!S(response.Mensaje).isEmpty() && regExp.test(response.Mensaje)) {
        callback(response.Mensaje.replace(regExp, '$1'));
      }
      else {
        callback(
          self.error(form._terminal + ' está inactivo')
        );
      }
    }
  });
};

/**
 * Get account type
 * @number {String}
 * @callback {Function}
 */
Tuc.prototype.getType = function(number, callback) {
  // set context on self
  var self = this;
  self.number = number;

  // create form data
  var form = {
    '_funcion': '2',
    '_captcha': captcha,
    '_ter': number,
    '_codigo': captcha
  };

  // make a http request
  self.request(self.url, form, function(response) {
    if (self.isError(response)) {
      callback(response);
    }
    else {
      if (!S(response).isEmpty()) {
        var message = S(response.Mensaje).stripTags().s;
        if (message.split(':').length > 1) {
          callback(S(S(message.split(':')[1]).trim().s).capitalize().s);
        }
        else {
          callback(message);
        }
      }
      else {
        callback(
          self.error(form._terminal + ' está inactivo')
        );
      }
    }
  });
};

/**
 * Export class
 */
module.exports = Tuc;
