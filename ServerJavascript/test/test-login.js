var request = require('supertest')
  , express = require('express')
  , assert = require('assert')
  , async = require('async')
  , app = require('../app')
  , protocol = require('../test/protocol')
  , gateway = protocol.gateway
  , common = protocol.common
  , room = protocol.room;


describe('로그인 확인', function() {
  before(function() {
  })

  after(function() {
  })

  beforeEach(function() {
  })

  afterEach(function() {
  })

  it('정상적인 사용자 로그인', function(done) {
    async.series([
      function (callback) {
        request(app).post('/api')
          .send(protocol.login(2000, 0, 'udid'))
          .expect(200, callback);
      }
    ], done);
  })

  it('정상적인 사용자 로그인 응답', function(done) {
    async.series([
      function (callback) {
        request(app).post('/api')
          .send(protocol.login(2000, 0, 'udid'))
          .expect(200)
          .end(function (err, res) {
            var response = protocol.decode(res.text);
            assert.equal(response.type, gateway.MessageType.LOGIN);
            assert(response.login.plug_ip);
            assert(response.login.plug_port);
            assert(response.login.passwd);
            callback(err, res);
          })
      }
    ], done);
  })

  it('사용자 정보요청', function(done) {
    async.series([
      function (callback) {
        request(app).post('/api')
          .send(protocol.login(2000, 0, 'udid'))
          .expect(200, callback);
      },
      function (callback) {
        request(app).post('/api')
          .send(protocol.info())
          .expect(200)
          .end(function (err, res) {
            var response = protocol.decode(res.text);
            assert.equal(response.type, gateway.MessageType.INFO);
            assert(response.info.honbul);
            callback(err, res);
          })
      }
    ], done);
  })

})
