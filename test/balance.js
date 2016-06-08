const assert = require('assert');
const is = require('is_js');
const Tuc = require('../lib/tuc');
const tuc = new Tuc();
describe('Tuc', () => {
  describe('getBalance', () => {

    it('VALID', (done) => {
      tuc.getBalance('00759799', (response) => {
        assert(is.number(parseFloat(response)));
        done();
      });
    });

    it('INVALID_FORMAT', (done) => {
      tuc.getBalance('', (response) => {
        assert.strictEqual(response.error.code, 100);
        done();
      });
    });

    it('INACTIVE', (done) => {
      tuc.getBalance('00759795', (response) => {
        assert.strictEqual(response.error.code, 104);
        done();
      });
    });
  });
});
