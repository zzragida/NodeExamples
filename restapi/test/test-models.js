'use strict'

var request = require('supertest')
  , assert = require('assert')
  , models = require('../models');


describe('makeUser', function() {

  // 정상적인 유저 생성 확인
  it('valid make user', function (done) {
    var gameId = 1000;
    var facebookId = 0;
    var inventorySize = 100;
    var maxHeart = 80;
    var status = 1;

    models.makeUser(gameId, facebookId, inventorySize, maxHeart, status)
      .then(function (userId) {
        assert(userId > 0);
      }).then(done, done);
  })

  // 비정상적인 유저 생성 확인
  it('invalid make user', function (done) {
    models.makeUser()
      .catch(function (err) {
        assert(err);
      }).then(done, done);
  })

  // 유저정보 로딩 확인
  it('load user', function (done) {
    var gameId = 1000;
    var facebookId = 0;
    var inventorySize = 100;
    var maxHeart = 100;
    var status = 1;

    models.makeUser(gameId, facebookId, inventorySize, maxHeart, status)
      .then(function (userId) {
        assert(userId > 0);
        models.loadUser(userId).then(function (results) {
          assert(results);
        }).then(done, done);
      }).then(null, done);
  })


})

