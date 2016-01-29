'use strict'

/* ------------------------------------------------------------- */

function Costume(info) {
  this.costumeId = info.COSTUME_ID;
  this.baseCostumeId = info.BASE_COSTUME_ID;
  this.userId = info.USER_ID;
  this.job = info.JOB;
  this.level = info.LV;
}

/* ------------------------------------------------------------- */

Costume.prototype.upgradeHonbul = function () {
  throw new NotImplementedError();
};

Costume.prototype.levelUp = function (userId) {
  throw new NotImplementedError();
};

Costume.prototype.copyAttribute = function (attribute) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Costume.prototype.toJSON = function () {
  return JSON.stringify({
    costumeId: this.costumeId,
    level: this.level
  });
};

Costume.prototype.toPB = function () {
  return new DATA.m3.data.Costume({
    costumeId: this.costumeId,
    level: this.level
  });
};

/* ------------------------------------------------------------- */

module.exports = Costume;
