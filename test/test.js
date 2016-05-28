const assert = require('assert');
const Tuc = require('../lib/tuc');
const tuc = new Tuc();
describe('Tuc', () => {
  describe('getBalance', () => {

    it('is object', (done) => {
      tuc.getBalance('', (response) => {
        assert.strictEqual(typeof response, 'object');
        done();
      });
    });

    it('is error', (done) => {
      tuc.getBalance('', (response) => {
        assert.strictEqual(typeof response.error, 'object');
        done();
      });
    });

  });

  describe('getType', () => {

    it('is object', (done) => {
      tuc.getType('', (response) => {
        assert.strictEqual(typeof response, 'object');
        done();
      });
    });

    it('is error', (done) => {
      tuc.getType('', (response) => {
        assert.strictEqual(typeof response.error, 'object');
        done();
      });
    });

  });
});
