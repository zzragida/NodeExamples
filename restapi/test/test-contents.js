var request = require('supertest')
  , express = require('express');

var app = require('../app.js');


describe('GET /contents/achivement', function() {
  it('response with json text', function(done) {
    request(app)
        .get('/contents/achivement')
        .expect(200)
        .end(function(err, res) {
          JSON.parse(res.text);
          done();
        })
  })
})


describe('GET /contents/properties', function() {
  it('response with json text', function(done) {
    request(app)
        .get('/contents/properties')
        .expect(200)
        .end(function(err, res) {
          JSON.parse(res.text);
          done();
        })
  })
})

