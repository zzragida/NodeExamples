'use strict'

/* ------------------------------------------------------------- */

function Item(itemId, itemNo, level, broken, heroId, stack) {
  this.itemId = itemId;
  this.itemNo = itemNo;
  this.level = level;
  this.broken = broken;
  this.heroId = heroId;
  this.stack = stack;
}

/* ------------------------------------------------------------- */

Item.prototype.overcome = function () {
  throw new NotImplementedError();
};

Item.prototype.isOvercomeLevel = function () {
  throw new NotImplementedError();
};

Item.prototype.isMaxLevel = function () {
  throw new NotImplementedError();
};

Item.prototype.setHeroId = function (heroId, update) {
  throw new NotImplementedError();
};

Item.prototype.overcomeHonbul = function () {
  throw new NotImplementedError();
};

Item.prototype.reinforceCash = function () {
  throw new NotImplementedError();
};

Item.prototype.reinforceStone = function () {
  throw new NotImplementedError();
};

Item.prototype.reinforceProbability = function () {
  throw new NotImplementedError();
};

Item.prototype.repairCose = function () {
  throw new NotImplementedError();
};

Item.prototype.crashProbability = function () {
  throw new NotImplementedError();
};

Item.prototype.remove = function () {
  throw new NotImplementedError();
};

Item.prototype.crash = function () {
  throw new NotImplementedError();
};

Item.prototype.fix = function () {
  throw new NotImplementedError();
};

Item.prototype.levelUp = function () {
  throw new NotImplementedError();
};

Item.prototype.increaseCount = function () {
  throw new NotImplementedError();
};

Item.prototype.decreaseCount = function () {
  throw new NotImplementedError();
};

Item.prototype.changeCount = function (count) {
  throw new NotImplementedError();
};

Item.prototype.copyAttribute = function (attribute) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Item.prototype.toJSON = function () {
  return JSON.stringify({
    itemId: this.itemId,
    itemNo: this.itemNo,
    level: this.level,
    broken: this.broken,
    heroId: this.heroId,
    stack: this.stack
  });
};

Item.prototype.toPB = function () {
  return new DATA.m3.data.Item({
    itemId: this.itemId,
    itemNo: this.itemNo,
    level: this.level,
    stack: this.stack,
    broken: this.broken
  });
};

/* ------------------------------------------------------------- */

module.exports = Item;
