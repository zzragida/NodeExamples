var request = require('supertest')
  , express = require('express')
  , assert = require('assert')
  , app = require('../app')
  , protocol = require('../test/protocol')
  , gateway = protocol.gateway
  , common = protocol.common
  , room = protocol.room;


describe('버전 API 확인', function() {
  before(function() {
  })

  after(function() {
  })

  beforeEach(function() {
  })

  afterEach(function() {
  })

  it('valid version request', function (done) {
    request(app)
      .post('/api')
      .send({data:protocol.version(1111, '0.1-test', 1)})
      .expect(200)
      .end(function(err, res) {
        var response = protocol.base64Decoding(res.text);
        assert.equal(response.type, gateway.MessageType.VERSION);
        done();
      })
  })

  it('invalid service version', function (done) {
    request(app)
      .post('/api')
      .send({data:protocol.version(1111, '0.1-stable', 1)})
      .expect(200)
      .end(function(err, res) {
        var response = protocol.base64Decoding(res.text);
        assert.equal(response.error.code, gateway.ErrorCode.EC_VERSION);
        done();
      })
  })
})
