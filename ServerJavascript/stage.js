'use strict'

/* ------------------------------------------------------------- */

function Stage(info) {
  this.stageId = info.STAGE_ID;
  this.baseStageId = info.BASE_STAGE_ID;
  this.heroId = info.HERO_ID;
  this.job = info.JOB;
  this.lastPlay = info.LAST_PLAY;
  this.resetCount = info.RESET_COUNT;
}

/* ------------------------------------------------------------- */

Stage.prototype.level = function (difficulty, stageLevel) {
  throw new NotImplementedError();
};

Stage.prototype.isClear = function (difficulty) {
  throw new NotImplementedError();
};

Stage.prototype.getLastLevel = function () {
  throw new NotImplementedError();
};

Stage.prototype.cooltime = function () {
  throw new NotImplementedError();
};

Stage.prototype.updateCooltime = function (heroId) {
  throw new NotImplementedError();
};

Stage.prototype.resetCooltime = function () {
  throw new NotImplementedError();
};

Stage.prototype.resetCooltimeCount = function () {
  throw new NotImplementedError();
};

Stage.prototype.bestScore = function () {
  throw new NotImplementedError();
};

Stage.prototype.isBossStage = function () {
  throw new NotImplementedError();
};

Stage.prototype.getStart = function (difficulty) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Stage.prototype.toJSON = function () {
  return JSON.stringify({
    skillId: this.skillId,
    type: this.type
  });
};

Stage.prototype.toPB = function () {
  return new DATA.m3.data.Stage({
    skillId: this.skillId,
    type: this.type
  });
};

/* ------------------------------------------------------------- */

module.exports = Stage;

