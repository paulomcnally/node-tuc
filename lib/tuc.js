const request = require('request');
const INVALID_FORMAT = 100;

class Tuc {
  constructor() {
    this.url = 'https://mpeso.net/ANDROID/account/balance/';
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
   * Check if number is valid format
   * @number {String}
   * return {Boolean}
   */
  isValid(number) {
    return /^\d{8}$/.test(number);
  }

  /**
   * Validate error
   * @param  {Object} obj
   * @return {Boolean}
   */
  isError(obj) {
    if (typeof obj.error === 'object') {
      return true;
    }
    else {
      return false;
    }
  };

  /**
   * [getBalance description]
   * @param  {String} number
   * @param  {Function} callback
   */
  getBalance(number, callback) {
    let self = this;
    if (!this.isValid(number)) {
      callback(
        self.error('El formato no es correcto. El formato correcto es 00000000.', INVALID_FORMAT)
      );
    } else {
      request(`${this.url}${number}`, function (error, response, body) {
        if (response.statusCode === 200) {
          let jsonResponse = JSON.parse(body);
          switch (jsonResponse.code) {
            case 0:
              callback(jsonResponse.data[0].balance);
              break;
            case 2:
              callback(self.error(jsonResponse.data, INVALID_FORMAT));
            default:
          }
        } else {
          callback(self.error('Error al intentar conectar con el servidor de MPeso.', response.statusCode));
        }
      });
    }
  }
}

module.exports = Tuc;
