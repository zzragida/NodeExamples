'use strict';

var ProtoBuf = require('protobufjs')
  , protocol = ProtoBuf.loadProtoFile('./protocol/gateway.proto').build()
  , jwt = require('jsonwebtoken')
  , gateway = protocol.m3.gateway
  , common = protocol.m3.common
  , room = protocol.m3.room;

module.exports.gateway = gateway;
module.exports.common = common;
module.exports.room = room;

/* ------------------------------------------------------------- */

module.exports.version = function (proto, service, platform, validation) {
  var request = makeRequest(gateway.MessageType.VERSION);
  request.version = new gateway.Request.Version({
      protocol: proto || 11111
    , service: service || '0.1-test'
    , platform: platform || common.PlatformType.PLATFORM_ANDROID
    , validation: validation || null
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.login = function (game_id, access_token, udid, platform, facebook_id) {
  var request = makeRequest(gateway.MessageType.LOGIN);
  request.login = new gateway.Request.Login({
      game_id: game_id || 2000
    , udid: udid || 'udid'
    , platform: platform || common.PlatformType.PLATFORM_ANDROID
    , access_token: access_token || null
    , facebook_id: facebook_id || null
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.logout = function (game_id, facebook_id) {
  var request = makeRequest(gateway.MessageType.LOGOUT);
  request.logout = new gateway.Request.Logout({
      game_id: game_id
    , facebook_id: facebook_id
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.plug = function () {
  var request = makeRequest(gateway.MessageType.PLUG);
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.info = function () {
  return encode(makeRequest(gateway.MessageType.INFO));
};

/* ------------------------------------------------------------- */

module.exports.properties = function () {
  return encode(makeRequest(gateway.MessageType.PROPERTIES));
};

/* ------------------------------------------------------------- */

module.exports.badges = function () {
  return encode(makeRequest(gateway.MessageType.BADGES));
};

/* ------------------------------------------------------------- */

module.exports.nickname = function (nickname) {
  var request = makeRequest(gateway.MessageType.NICKNAME);
  request.nickname = nickname;
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.makeHero = function (job) {
  var request = makeRequest(gateway.MessageType.MAKE_HERO);
  request.make_hero = new gateway.Request.MakeHero();
  request.make_hero.job = job || common.JobType.JOB_SWORD;
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.selectHero = function (job) {
  var request = makeRequest(gateway.MessageType.SELECT_HERO);
  request.select_hero = new gateway.Request.SelectHero();
  request.select_hero.job = job;
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.heroes = function () {
  return encode(makeRequest(gateway.MessageType.HEROES));
};

/* ------------------------------------------------------------- */

module.exports.costumes = function () {
  return encode(makeRequest(gateway.MessageType.COSTUMES));
};

/* ------------------------------------------------------------- */

module.exports.selectCostume = function (costumeId) {
  var request = makeRequest(gateway.MessageType.SELECT_COSTUME);
  request.select_costume = new gateway.Request.SelectCostume({
      costume_id: costumeId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.costumesToMake = function () {
  return encode(makeRequest(gateway.MessageType.COSTUMES_TO_MAKE));
};

/* ------------------------------------------------------------- */

module.exports.makeCostume = function (costumeId) {
  var request = makeRequest(gateway.MessageType.MAKE_COSTUME);
  request.make_costume = new gateway.Request.SelectCostume({
      costume_id: costumeId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.buyCostume = function (costumeId) {
  var request = makeRequest(gateway.MessageType.BUY_COSTUME);
  request.buy_costume = new gateway.Request.SelectCostume({
      costume_id: costumeId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.costumesToReinforce = function () {
  return encode(makeRequest(gateway.MessageType.COSTUMES_TO_REINFORCE));
};

/* ------------------------------------------------------------- */

module.exports.reinforceCostume = function (costumeId) {
  var request = makeRequest(gateway.MessageType.REINFORCE_COSTUME);
  request.reinforce_costume = new gateway.Request.SelectCostume({
      costume_id: costumeId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.unlockCostume = function (costumeId) {
  var request = makeRequest(gateway.MessageType.UNLOCK_COSTUME);
  request.unlock_costume = new gateway.Request.SelectCostume({
      costume_id: costumeId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.dungeons = function () {
  return encode(makeRequest(gateway.MessageType.DUNGEONS));
};

/* ------------------------------------------------------------- */

module.exports.epicDungeons = function () {
  return encode(makeRequest(gateway.MessageType.EPIC_DUNGEONS));
};

/* ------------------------------------------------------------- */

module.exports.stages = function (dungeonId) {
  var request = makeRequest(gateway.MessageType.STAGES);
  request.stages = new gateway.Request.Stages({
      dungeon_id: dungeonId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.unlockStage = function (stageId) {
  var request = makeRequest(gateway.MessageType.UNLOCK_STAGE);
  request.unlock_stage = new gateway.Request.SelectStage({
      stage_id: stageId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.resetStage = function (stageId) {
  var request = makeRequest(gateway.MessageType.RESET_STAGE);
  request.reset_stage = new gateway.Request.SelectStage({
      stage_id: stageId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.queryStage = function (stageId) {
  var request = makeRequest(gateway.MessageType.QUERY_STAGE);
  request.query_stage = new gateway.Request.SelectStage({
      stage_id: stageId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.heart = function () {
  return encode(makeRequest(gateway.MessageType.HEART));
};

/* ------------------------------------------------------------- */

module.exports.gifts = function () {
  return encode(makeRequest(gateway.MessageType.GIFTS));
};

/* ------------------------------------------------------------- */

module.exports.takeGift = function (giftId) {
  var request = makeRequest(gateway.MessageType.TAKE_GIFT);
  request.take_gift = new gateway.Request.TakeGift({
      gift_id: giftId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.tutorial = function (step) {
  var request = makeRequest(gateway.MessageType.TUTORIAL);
  request.tutorial = new gateway.Request.Tutorial({
      step: step
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.eshop = function (market) {
  var request = makeRequest(gateway.MessageType.ESHOP);
  request.eshop = new gateway.Request.Eshop({
      market: market
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.buyInEshop = function (cash, productId, market, event) {
  var request = makeRequest(gateway.MessageType.BUY_IN_ESHOP);
  request.buy_in_eshop = new gateway.Request.BuyInEshop({
      event_type: event
    , market: market
    , cash: cash
    , product_id: productId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.cashShop = function (market) {
  var request = makeRequest(gateway.MessageType.CASH_SHOP);
  request.cash_shop = new gateway.Request.CashShop({
      market: market
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.buyInCashShop = function (category, cash, amount, discount) {
  var request = makeRequest(gateway.MessageType.BUY_IN_CASH_SHOP);
  request.buy_in_cash_shop = new gateway.Request.BuyInCashShop({
      category: category
    , cash: cash
    , amount: amount
    , discount_vip: discount
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.oniShop = function (method, category) {
  var request = makeRequest(gateway.MessageType.ONI_SHOP);
  request.oni_shop = new gateway.Request.OniShop({
      method: method
    , category: category
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.buyInOniShop = function (goodId, price, discount) {
  var request = makeRequest(gateway.MessageType.BUY_IN_ONI_SHOP);
  request.buy_in_oni_shop = new gateway.Request.BuyInOniShop({
      goods_id: goodId
    , price: price
    , discount_vip: discount
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.inventory = function () {
  return encode(makeRequest(gateway.MessageType.INVENTORY));
};

/* ------------------------------------------------------------- */

module.exports.expandInventory = function (count) {
  var request = makeRequest(gateway.MessageType.EXPAND_INVENTORY);
  request.expand_inventory = count;
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.dropItem = function (itemId, count) {
  var request = makeRequest(gateway.MessageType.DROP_ITEM);
  request.drop_item = new gateway.Request.DropItem({
      item_id: itemId
    , count: count
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.putOn = function (itemId) {
  var request = makeRequest(gateway.MessageType.PUT_ON);
  request.put_on = new gateway.Request.SelectItem({
      item_id: itemId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.takeOff = function (type) {
  var request = makeRequest(gateway.MessageType.TAKE_OFF);
  request.take_off = new gateway.Request.SelectItem({
      type: type
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.reinforceItem = function (type, cash, overcomeId) {
  var request = makeRequest(gateway.MessageType.REINFORCE_ITEM);
  request.reinforce_item = new gateway.Request.ReinforceItem({
      type: type
    , use_cash: cash
    , overcome_item_id: overcomeId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.fixItem = function (itemId) {
  var request = makeRequest(gateway.MessageType.FIX_ITEM);
  request.fix_item = new gateway.Request.FixItem({
      item_id: itemId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.makeItem = function (itemId, type) {
  var request = makeRequest(gateway.MessageType.MAKE_ITEM);
  request.make_item = new gateway.Request.SelectItem({
      item_id: itemId
    , type: type
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.lotterys = function () {
  return encode(makeRequest(gateway.MessageType.LOTTERYS));
};

/* ------------------------------------------------------------- */

module.exports.takeLottery = function (type, count, event) {
  var request = makeRequest(gateway.MessageType.TAKE_LOTTERY);
  request.take_lottery = new gateway.Request.TakeLottery({
      type: type
    , count: count
    , event: event
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.skills = function () {
  return encode(makeRequest(gateway.MessageType.SKILLS));
};

/* ------------------------------------------------------------- */

module.exports.expandSkillButton = function (type) {
  var request = makeRequest(gateway.MessageType.EXPAND_SKILL_BUTTON);
  request.expand_skill_button = new gateway.Request.ExpandSkillButton({
      type: type
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.skillButton = function (buttonA, buttonB, buttonC) {
  var request = makeRequest(gateway.MessageType.SKILL_BUTTON);
  request.skill_button = new gateway.Request.SkillButton({
      button_a: buttonA
    , button_b: buttonB
    , button_c: buttonC
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.reinforceSkill = function (skillId) {
  var request = makeRequest(gateway.MessageType.REINFORCE_SKILL);
  request.reinforce_skill = new gateway.Request.ReinforceSkill({
      skill_id: skillId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.skillAutoAssign = function () {
  return encode(makeRequest(gateway.MessageType.SKILL_AUTO_ASSIGN));
};

/* ------------------------------------------------------------- */

module.exports.resetSkill = function () {
  return encode(makeRequest(gateway.MessageType.RESET_SKILL));
};

/* ------------------------------------------------------------- */

module.exports.buddies = function () {
  return encode(makeRequest(gateway.MessageType.BUDDIES));
};

/* ------------------------------------------------------------- */

module.exports.exfriend = function (buddyId) {
  var request = makeRequest(gateway.MessageType.EXFEIEND);
  request.exfriend = new gateway.Request.Buddy({
      buddy_id: buddyId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.sendHeart = function (buddyId) {
  var request = makeRequest(gateway.MessageType.SEND_HEART);
  request.send_heart = new gateway.Request.Buddy({
      buddy_id: buddyId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.receiveHeart = function (buddyId) {
  var request = makeRequest(gateway.MessageType.RECEIVE_HEART);
  request.receive_heart = new gateway.Request.Buddy({
      buddy_id: buddyId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.receiveHeartAll = function () {
  return encode(makeRequest(gateway.MessageType.RECEIVE_HEART_ALL));
};

/* ------------------------------------------------------------- */

module.exports.askFriendships = function () {
};

/* ------------------------------------------------------------- */

module.exports.proposeBuddy = function () {
};

/* ------------------------------------------------------------- */

module.exports.acceptFriendship = function () {
};

/* ------------------------------------------------------------- */

module.exports.rejectFriendship = function () {
};

/* ------------------------------------------------------------- */

module.exports.findBuddy = function () {
};

/* ------------------------------------------------------------- */

module.exports.searchable = function () {
};

/* ------------------------------------------------------------- */

module.exports.recommendFriendships = function () {
};

/* ------------------------------------------------------------- */

module.exports.friendProfile = function () {
};

/* ------------------------------------------------------------- */

module.exports.facebookInvitation = function () {
};

/* ------------------------------------------------------------- */

module.exports.invitedFacebookFriends = function () {
};

/* ------------------------------------------------------------- */

module.exports.facebookFriends = function () {
};

/* ------------------------------------------------------------- */

module.exports.linkFacebookFriends = function () {
};

/* ------------------------------------------------------------- */

module.exports.unlinkFacebookFriends = function () {
};

/* ------------------------------------------------------------- */

module.exports.facebookOptions = function () {
};

/* ------------------------------------------------------------- */

module.exports.queryFacebookOptions = function () {
};

/* ------------------------------------------------------------- */

module.exports.buddiesToInviteGame = function () {
};

/* ------------------------------------------------------------- */

module.exports.inviteBuddyToPlayGame = function () {
};

/* ------------------------------------------------------------- */

module.exports.beInvitedToPlayGame = function () {
};

/* ------------------------------------------------------------- */

module.exports.acceptGameInvitation = function () {
};

/* ------------------------------------------------------------- */

module.exports.declineGameInvitation = function () {
};

/* ------------------------------------------------------------- */

module.exports.cancelGameInvitation = function () {
};

/* ------------------------------------------------------------- */

module.exports.changePublicRoom = function () {
};

/* ------------------------------------------------------------- */

module.exports.askExchangeHeart = function () {
};

/* ------------------------------------------------------------- */

module.exports.exchangeHeart = function () {
};

/* ------------------------------------------------------------- */

module.exports.ranking = function (type, start, count) {
  var request = makeRequest(gateway.MessageType.RANKING);
  request.ranking = new gateway.Request.Ranking({
      type: type
    , first_ranker: start
    , count: count
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.ranker = function (type, userId) {
  var request = makeRequest(gateway.MessageType.RANKER);
  request.ranker = new gateway.Request.Ranker({
      type: type
    , user_id: userId
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.dailystamp = function (yearMonth) {
  var request = makeRequest(gateway.MessageType.DAILYSTAMP);
  request.dailystamp = new gateway.Request.DailyStamp({
      year_month: yearMonth
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.achivement = function () {
  return encode(makeRequest(gateway.MessageType.ACHIVEMENT));
};

/* ------------------------------------------------------------- */

module.exports.achivementReward = function (today, type) {
  var request = makeRequest(gateway.MessageType.ACHIVEMENT_REWARD);
  request.achivement_reward = new gateway.Request.AchivementReward({
      today: today
    , type: type
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.materialCooltime = function () {
};

/* ------------------------------------------------------------- */

module.exports.collectMaterial = function () {
};

/* ------------------------------------------------------------- */

module.exports.resetMaterialCooltime = function () {
};

/* ------------------------------------------------------------- */

module.exports.queryPromotion = function (platform) {
  var request = makeRequest(gateway.MessageType.QUERY_PROMOTION);
  request.query_promotion = new gateway.Request.QueryPromotion({
      platform: platform
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.promoter = function (name) {
  var request = makeRequest(gateway.MessageType.PROMOTER);
  request.promoter = new gateway.Request.Promoter({
      name: name
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.promotionCount = function () {
  return encode(makeRequest(gateway.MessageType.PROMOTION_COUNT));
};

/* ------------------------------------------------------------- */

module.exports.coupon = function () {
};

/* ------------------------------------------------------------- */

module.exports.keywordCoupon = function () {
};

/* ------------------------------------------------------------- */

module.exports.couponHistory = function () {
};

/* ------------------------------------------------------------- */

module.exports.accountMerge = function () {
};

/* ------------------------------------------------------------- */

module.exports.confirmToAccountMerge = function () {
};

/* ------------------------------------------------------------- */

module.exports.review = function () {
};

/* ------------------------------------------------------------- */

module.exports.vip = function () {
};

/* ------------------------------------------------------------- */

module.exports.push = function () {
};

/* ------------------------------------------------------------- */

module.exports.survivalBuff = function () {
};

/* ------------------------------------------------------------- */

module.exports.refillSurvivalChallenge = function () {
};

/* ------------------------------------------------------------- */

module.exports.revival = function () {
};

/* ------------------------------------------------------------- */

module.exports.dropOut = function () {
};

/* ------------------------------------------------------------- */

module.exports.confirmToDropOut = function () {
};

/* ------------------------------------------------------------- */

module.exports.levelUp = function (levelUp) {
  var request = makeRequest(gateway.MessageType.LEVEL_UP);
  request.level_up = new gateway.Request.LevelUp({
      secure_data: null
    , plain_data: levelUp
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.wave = function (wave) {
  var request = makeRequest(gateway.MessageType.WAVE);
  request.wave = new gateway.Request.Wave({
      secure_data: null
    , plain_data: wave
  });
  return encode(request);
};

/* ------------------------------------------------------------- */

module.exports.startGame = function () {
};

/* ------------------------------------------------------------- */

module.exports.startSurvivalGame = function () {
};

/* ------------------------------------------------------------- */

module.exports.finishGame = function () {
};

/* ------------------------------------------------------------- */

module.exports.finishSurvivalGame = function () {
};

/* ------------------------------------------------------------- */

module.exports.setCash = function (cash) {
  return encode(makeTestParam(gateway.Request.TestParam.ParamType.SET_CASH, cash));
};

/* ------------------------------------------------------------- */

module.exports.setHonbul = function (honbul) {
  return encode(makeTestParam(gateway.Request.TestParam.ParamType.SET_HONBUL, honbul));
};

/* ------------------------------------------------------------- */

function makeTestParam(type, data) {
  var request = makeRequest(gateway.MessageType.TEST_PARAM);
  request.test_param = new gateway.Request.TestParam({
    params: [
      new gateway.Request.TestParam.Param({
          type: type
        , int_data: data
      })
    ]
  });
  return request;
}

function makeRequest (type) {
  var request = new gateway.Request();
  request.type = type;
  request.sequence = 0;
  request.checksum = 0;
  return request;
}
module.exports.makeRequest = makeRequest;

function encode (request) {
  return {
      access_token: jwt.sign({userId: 2277}, 'secret_key')
    , data: request.encode().toBuffer().toString('base64')
  };
}
module.exports.encode = encode;

function decode (data) {
  var encodedString = new Buffer(data, 'base64');
  return gateway.Response.decode(encodedString);
}
module.exports.decode = decode;

/* ------------------------------------------------------------- */
