'use strict'

var pool = require('pool-redis')({
  'host': 'localhost',
  'port': 6379,
  'maxConnections': 10
});

// TODO: cluster access

module.exports.del = function (key) {
  pool.getClient(function (client, done) {
    client.del(key, redis.print);
    done();
  });
}

module.exports.expire = function (key, secs) {
  pool.getClient(function (client, done) {
    client.expire(key, secs, redis.print);
    done();
  });
}

module.exports.set = function (key, value) {
  pool.getClient(function (client, done) {
    client.set(key, value, redis.print);
    done();
  });
}

module.exports.get = function (key, callback) {
  pool.getClient(function (client, done) {
    client.get(key, function (err, reply) {
      done();
      if (err) console.log(err);
      callback(err, reply);
    });
  });
}

module.exports.hkeys = function (hkey, callback) {
  pool.getClient(function (client, done) {
    client.hkeys(hkey, function (err, reply) {
      done();
      if (err) console.log(err);
      callback(err, reply);
    });
  });
}

module.exports.hset = function (hkey, field, value) {
  pool.getClient(function (client, done) {
    client.hset(hkey, field, value, redis.print);
    done();
  });
}

module.exports.hget = function (hkey, field, callback) {
  pool.getClient(function (client, done) {
    client.hget(hkey, field, function (err, reply) {
      done();
      if (err) console.log(err);
      callback(err, reply);
    });
  });
}

module.exports.hmset = function (hkey, fields) {
  pool.getClient(function (client, done) {
    client.hmset(hkey, fields, redis.print);
    done();
  });
}

module.exports.hgetall = function (hkey, callback) {
  pool.getClient(function (client, done) {
    client.hgetall(hkey, function (err, reply) {
      done();
      if (err) console.log(err);
      callback(err, reply);
    });
  });
}

module.exports.incr = function (key) {
  pool.getClient(function (client, done) {
    client.incr(key, redis.print);
    done();
  });
}
