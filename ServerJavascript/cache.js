'use strict'

var common = PROTOCOL.m3.common;

/* ------------------------------------------------------------- */

var items = {};

/* ------------------------------------------------------------- */

module.exports.reset = function (type) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 아이템
function clearItems() {
  throw new NotImplementedError();
}

function loadItems() {
  if (!items) {
    logger.debug('Already load items');
    return;
  }
}

function loadCombinations() {
  throw new NotImplementedError();
}

function loadBlueprints() {
  throw new NotImplementedError();
}

module.exports.item = function (itemNo) {
  throw new NotImplementedError();
};

module.exports.combination = function (type) {
  throw new NotImplementedError();
};

module.exports.blueprint = function (type) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 레벨
function clearLevels() {
  throw new NotImplementedError();
}

function loadLevels() {
  throw new NotImplementedError();
}

module.exports.level = function (job, level) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 뽑기
function clearLotterys() {
  throw new NotImplementedError();
}

function loadLotterys() {
  throw new NotImplementedError();
}

function loadLotteryItems() {
  throw new NotImplementedError();
}

function loadLotteryTiers() {
  throw new NotImplementedError();
}

module.exports.lotterys = function () {
  throw new NotImplementedError();
};

module.exports.takeLottery = function (type, tier) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 스킬
function clearSkills() {
  throw new NotImplementedError();
}

function loadSkills() {
  throw new NotImplementedError();
}

function loadSkillCosts() {
  throw new NotImplementedError();
}

module.exports.skills = function (job) {
  throw new NotImplementedError();
};

module.exports.skilRate = function (job, levelCount) {
  throw new NotImplementedError();
};

module.exports.skill = function (job, skillId) {
  throw new NotImplementedError();
};

module.exports.skillCosts = function (skillId) {
  throw new NotImplementedError();
};

module.exports.reinforceSkillCost = function (job, skillId, level) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 의상
function clearCostumes() {
  throw new NotImplementedError();
}

function loadCostumes() {
  throw new NotImplementedError();
}

module.exports.costumes = function () {
  throw new NotImplementedError();
};

module.exports.costume = function (costumeId) {
  throw new NotImplementedError();
};

module.exports.costumesToMake = function (job) {
  throw new NotImplementedError();
};

module.exports.costumesToReinforce = function (job) {
  throw new NotImplementedError();
};

module.exports.defaultCostumeId = function (job) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 던전
function clearDungeons() {
  throw new NotImplementedError();
}

function loadDungeons() {
  throw new NotImplementedError();
}

function loadStages() {
  throw new NotImplementedError();
}

function loadStageWaves() {
  throw new NotImplementedError();
}

function loadMonsters() {
  throw new NotImplementedError();
}

function loadSurvivalWaves() {
  throw new NotImplementedError();
}

function loadEventDungeons() {
  throw new NotImplementedError();
}

module.exports.stage = function (stageId) {
  throw new NotImplementedError();
};

module.exports.unlockedStages = function () {
  throw new NotImplementedError();
};

module.exports.dungeon = function (dungeonId) {
  throw new NotImplementedError();
};

module.exports.dungeonByStageId = function (stageId) {
  throw new NotImplementedError();
};

module.exports.epicDungeons = function () {
  throw new NotImplementedError();
};

module.exports.epicProgress = function (epicCount) {
  throw new NotImplementedError();
};

module.exports.dailyDungeonId = function () {
  throw new NotImplementedError();
};

module.exports.eventDungeonId = function () {
  throw new NotImplementedError();
};

module.exports.survivalDungeonId = function () {
  throw new NotImplementedError();
};

module.exports.multiDungeon = function () {
  throw new NotImplementedError();
};

module.exports.canEnterMultiDungeon = function () {
  throw new NotImplementedError();
};

module.exports.monster = function (monsterId, level) {
  throw new NotImplementedError();
};

module.exports.totalSurvivalWave = function () {
  throw new NotImplementedError();
};

module.exports.survivalWaves = function () {
  throw new NotImplementedError();
};

module.exports.survivalWaveReward = function (wave) {
  throw new NotImplementedError();
};

module.exports.multiStageSpendHeart = function (stageId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 외부상점
function clearEshop() {
  throw new NotImplementedError();
}

function loadEshop() {
  throw new NotImplementedError();
}

module.exports.eshop = function (market, lastPayment) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 충전소
function clearCashShop() {
  throw new NotImplementedError();
}

function loadCashShop() {
  throw new NotImplementedError();
}

module.exports.cashShop = function () {
  throw new NotImplementedError();
};

module.exports.cashShopGoods = function (category, amount, discount) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 도깨비상점
function clearOniShop() {
  throw new NotImplementedError();
}

function loadOniShop() {
  throw new NotImplementedError();
}

module.exports.oniShopGood = function (goodId) {
  throw new NotImplementedError();
};

module.exports.oniShopGoods = function (method, category, job, level) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 보물상자
function clearTreasures() {
  throw new NotImplementedError();
}

function loadTreasures() {
  throw new NotImplementedError();
}

module.exports.treasure = function (group) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 선물함
function clearGifts() {
  throw new NotImplementedError();
}

function loadGifts() {
  throw new NotImplementedError();
}

function loadLevelUpGifts() {
  throw new NotImplementedError();
}

function loadRecommendGifts() {
  throw new NotImplementedError();
}

function loadMultiGifts() {
  throw new NotImplementedError();
}

module.exports.gift = function (giftId) {
  throw new NotImplementedError();
};

module.exports.levelUpGift = function (level, job) {
  throw new NotImplementedError();
};

module.exports.recommendGift = function (recommendCount) {
  throw new NotImplementedError();
};

module.exports.multiGift = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 이벤트
function clearEvents() {
  throw new NotImplementedError();
}

function loadLoginEvents() {
  throw new NotImplementedError();
}

function loadPeriodicEvents() {
  throw new NotImplementedError();
}

function loadEshopEvents() {
  throw new NotImplementedError();
}

function loadCostumeEvents() {
  throw new NotImplementedError();
}

function loadGameEvents() {
  throw new NotImplementedError();
}

function loadLotteryEvents() {
  throw new NotImplementedError();
}

module.exports.loginEvent = function () {
  throw new NotImplementedError();
};

module.exports.periodicEvent = function () {
  throw new NotImplementedError();
};

module.exports.eshopEvent = function (lastPayment) {
  throw new NotImplementedError();
};

module.exports.costumeEvent = function (job) {
  throw new NotImplementedError();
};

module.exports.gameEvent = function (dungeonType) {
  throw new NotImplementedError();
};

module.exports.lotteryEvents = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 업적
function clearAchivements() {
  throw new NotImplementedError();
}

function loadAchivements() {
  throw new NotImplementedError();
}

function loadTodayQuest() {
  throw new NotImplementedError();
}

module.exports.achivement = function (type) {
  throw new NotImplementedError();
};

module.exports.dailyQuest = function (type) {
  throw new NotImplementedError();
};

module.exports.achivements = function () {
  throw new NotImplementedError();
};

module.exports.dailyQuests = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 재료수집
function clearMaterials() {
  throw new NotImplementedError();
}

function loadMaterials() {
  throw new NotImplementedError();
}

module.exports.materialPrice = function (materialId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 키워드쿠폰
function clearKeywordCoupons() {
  throw new NotImplementedError();
}

function loadKeywordcoupons() {
  throw new NotImplementedError();
}

module.exports.keywordCoupon = function (keyword) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// 서바이벌버프
function clearSurvivalBuffs() {
  throw new NotImplementedError();
}

function loadSurvivalBuffs() {
  throw new NotImplementedError();
}

module.exports.survivalBuff = function (buffId) {
  throw new NotImplementedError();
};

module.exports.survivalBuffs = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

// VIP보상
function clearVips() {
  throw new NotImplementedError();
}

function loadVips() {
  throw new NotImplementedError();
}

module.exports.vips = function () {
  throw new NotImplementedError();
};

module.exports.vip = function (vipLevel) { 
  throw new NotImplementedError();
};

module.exports.vipLevel = function (totalPurchase) {
  throw new NotImplementedError();
};

module.exports.vipMaxHeart = function (vipLevel) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */


