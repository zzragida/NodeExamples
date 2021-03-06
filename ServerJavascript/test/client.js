'use strict';

var request = require('supertest')
  , app = require('../app')
//  , app = 'http://localhost:9000' // for remote
  , prefix = '/api'
  , protocol = require('../test/protocol')
  , gateway = protocol.gateway
  , common = protocol.common
  , room = protocol.room;

/* ------------------------------------------------------------- */

module.exports.version = function (callback, proto, service, platform, validation) {
  request(app).post(prefix)
    .send(protocol.version(proto, service, platform, validation))
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.login = function (callback, game_id, access_token, udid, platform, facebook_id) {
  request(app).post(prefix)
    .send(protocol.login(game_id, access_token, udid, platform, facebook_id))
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.logout = function (callback, game_id, facebook_id) {
  request(app).post(prefix)
    .send(protocol.logout(game_id, facebook_id))
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.plug = function (callback) {
  request(app).post(prefix)
    .send(protocol.plug())
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.info = function (callback) {
  request(app).post(prefix)
    .send(protocol.info())
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.properties = function (callback) {
  request(app).post(prefix)
    .send(protocol.properties())
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.badges = function (callback) {
  request(app).post(prefix)
    .send(protocol.badges())
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.nickname = function (callback, nickname) {
  request(app).post(prefix)
    .send(protocol.nickname(nickname))
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.heroes = function (callback) {
  request(app).post(prefix)
    .send(protocol.heroes())
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.makeHero = function (callback, job) {
  request(app).post(prefix)
    .send(protocol.makeHero(job))
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.selectHero = function (callback, job) {
  request(app).post(prefix)
    .send(protocol.selectHero(job))
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.costumes = function (callback) {
  request(app).post(prefix)
    .send(protocol.costumes())
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.selectCostume = function (callback, costumeId) {
  request(app).post(prefix)
    .send(protocol.selectCostume(costumeId))
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.costumesToMake = function (callback) {
  request(app).post(prefix)
    .send(protocol.costumesToMake())
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.makeCostume = function (callback, costumeId) {
  request(app).post(prefix)
    .send(protocol.makeCostume(costumeId))
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.buyCostume = function (callback, costumeId) {
  request(app).post(prefix)
    .send(protocol.buyCostume(costumeId))
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */

module.exports.costumesToReinforce = function (callback) {
  request(app).post(prefix)
    .send(protocol.costumesToReinforce())
    .expect(200)
    .end(callback);
};

/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */
