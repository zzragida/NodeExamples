var request = require('supertest')
  , express = require('express')
  , assert = require('assert')
  , app = require('../app')
  , protocol = require('../test/protocol')
  , gateway = protocol.gateway
  , common = protocol.common
  , room = protocol.room;


describe('login 확인', function() {
  before(function() {
  })

  after(function() {
  })

  beforeEach(function() {
  })

  afterEach(function() {
  })

  it('valid login request', function(done) {
    request(app)
      .post('/api')
      .send({data:protocol.login(1000, null, 'udid')})
      .expect(200, done);
  })
  
  it('login and info', function(done) {
    request(app)
      .post('/api')
      .send({data:protocol.info()})
      .expect(200)
      .end(function(err, res) {
        var response = protocol.base64Decoding(res.text);
        assert.equal(response.type, gateway.MessageType.INFO);
        done();
      })
  })
})
