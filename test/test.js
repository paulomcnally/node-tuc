var assert = require('assert');
var Tuc = require('../lib/tuc');
var tuc = new Tuc();
describe('Tuc', function() {
  describe('getBalance', function() {

    it('is object', function(done) {
      tuc.getBalance('', function(response) {
        assert.strictEqual(typeof response, 'object');
        done();
      });
    });

    it('is error', function(done) {
      tuc.getBalance('', function(response) {
        assert.strictEqual(typeof response.error, 'object');
        done();
      });
    });

    it('not is error', function(done) {
      tuc.getBalance('00759794', function(response) {
        assert.strictEqual(typeof response.error, 'undefined');
        done();
      });
    });

  });

  describe('getType', function() {

    it('is object', function(done) {
      tuc.getType('', function(response) {
        assert.strictEqual(typeof response, 'object');
        done();
      });
    });

    it('is error', function(done) {
      tuc.getType('', function(response) {
        assert.strictEqual(typeof response.error, 'object');
        done();
      });
    });

    it('not is error', function(done) {
      tuc.getType('00759794', function(response) {
        assert.strictEqual(typeof response.error, 'undefined');
        done();
      });
    });

  });
});
