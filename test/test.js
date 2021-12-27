var assert = require('chai').assert;
var should = require('chai').should();
var numbers = [1, 2, 3, 4, 5];

assert.isArray(numbers, 'is array of numbers');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(numbers.indexOf(10), -1);
    });
  });
});
numbers.should.be.an('array').that.includes(2);
numbers.should.have.lengthOf(5);
describe('Array should', function() {
  describe('#includes(2)', function() {
    it('should return 1 when the value is present', function() {
      numbers.should.be.an('array').that.includes(1);
    });
  });
});