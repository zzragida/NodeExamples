'use strict'

var Redis = require('ioredis');

/* ------------------------------------------------------------- */

// TODO: connection pooling (check ioredis roadmap)
// TODO: zxxx, sxxx command set
// TODO: pub/sub command set
// TODO: using pipeline

function Redis(config) {
  this.host = config.host;
  this.port = config.port;
  this.db = config.db;
  /*
  this.redis = new Redis({
    host: this.host,
    port: this.port,
    db: this.db
  });
  */
}

Redis.prototype.getClient = function () {
  return new Redis({
    host: this.host,
    port: this.port,
    db: this.db
  });
};

Redis.prototype.del = function (key) {
  this.getClient().del(key);
}

Redis.prototype.expire = function (key, secs) {
  this.getClient().expire(key, secs);
}

Redis.prototype.set = function (key, value) {
  this.getClient().set(key, value);
}

Redis.prototype.get = function (key, callback) {
  this.getClient().get(key, callback);
}

Redis.prototype.setBuffer = function (key, buffer) {
  this.getClient().set(key, buffer);
};

Redis.prototype.getBuffer = function (key, callback) {
  this.getClient().getBuffer(key, callback);
};

Redis.prototype.hkeys = function (hkey, callback) {
  this.getClient().hkeys(hkey, callback);
}

Redis.prototype.hset = function (hkey, field, value) {
  this.getClient().hset(hkey, field, value);
}

Redis.prototype.hget = function (hkey, field, callback) {
  this.getClient().hget(hkey, field, callback);
}

Redis.prototype.hmset = function (hkey, fields) {
  this.getClient().hmset(hkey, fields);
}

Redis.prototype.hgetall = function (hkey, callback) {
  this.getClient().hgetall(hkey, callback);
}

Redis.prototype.incr = function (key) {
  this.getClient().incr(key);
}

/* ------------------------------------------------------------- */

function makeInstances(configs) {
  var instances = [];
  configs.forEach(function (config) {
    instances.push(new Redis(config));
  });
  return instances;
}

// 프리젠스
module.exports.PRESENCES = makeInstances(SETTINGS.REDIS_PRESENCES);

// 모니터
module.exports.MONITOR = new Redis(SETTINGS.REDIS_MONITOR);

// 대기방
module.exports.READY = new Redis(SETTINGS.REDIS_READY);

// 친구
module.exports.BUDDIES = makeInstances(SETTINGS.REDIS_BUDDIES);

// 랭킹
module.exports.RANKING = new Redis(SETTINGS.REDIS_RANKING);

// 랭커 프로필
module.exports.RANKER = makeInstances(SETTINGS.REDIS_RANK_PROFILES);

// 추천
module.exports.RECOMMEND = new Redis(SETTINGS.REDIS_RECOMMEND);

// 매칭
module.exports.MATCH = new Redis(SETTINGS.REDIS_MATCH);
