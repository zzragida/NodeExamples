'use strict'

/* ------------------------------------------------------------- */

function Buddy(userId, gameId, name, heart, job) {
  this.userId = userId;
  this.gameId = gameId;
  this.name = name;
  this.heart = heart;
  this.job = job;
}

/* ------------------------------------------------------------- */

Buddy.prototype.toJSON = function () {
  return JSON.stringify({
    userId: this.userId,
    gameId: this.gameId,
    name: this.name,
    heart: this.heart,
    job: this.job
  });
};

Buddy.prototype.toPB = function () {
  return new DATA.m3.data.Buddy({
    userId: this.userId,
    gameId: this.gameId
  });
};

/* ------------------------------------------------------------- */

module.exports = Buddy;

