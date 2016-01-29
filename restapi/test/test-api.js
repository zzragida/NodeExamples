var request = require('supertest')
  , express = require('express')
  , app = require('../app')
  , protocol = require('../test/protocol')


describe('version', function() {
  it('valid version request', function (done) {
    request(app)
      .post('/api')
      .send({data:protocol.version(1111, '0.1-test', 1)})
      .expect(200, done);
  })
})
