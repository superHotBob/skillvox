var assert = require('chai').assert;
var should = require('chai').should();
const request = require('supertest');
const express = require('express');

const app = express();
var numbers = [1, 2, 3, 4, 5];


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(numbers.indexOf(10), -1);
    });
  });
});

describe('Array should', function() {
  describe('#includes(2)', function() {
    it('should return 1 when the value is present', function() {
      numbers.should.be.an('array').that.includes(1);
    });
    it('should return true when the all  value more 100', function() {
      numbers.should.be.an('array').that.length(5);
    });
  });
});
describe('GET /summary', function() {
  it('responds /summary', function(done) {
    request(app)
      .get('/send')
      // .set('Accept', 'application/json')     
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(201, done)
      // .end(function(err, res) {
      //   if (err) throw err;
      // });
  });
});