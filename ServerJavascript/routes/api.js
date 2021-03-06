'use strict'

var router = require('express').Router()
  , assert = require('assert')
  , User = require('../user')
  , monitor = require('../redis').MONITOR
  , gateway = PROTOCOL.m3.gateway
  , common = PROTOCOL.m3.common
  , room = PROTOCOL.m3.room
  , handlers = {}
  , responses = {};

/* ------------------------------------------------------------- */

function makeResponse(request) {
  var response;

  // TODO: set remove object timer
  if (responses[request.type]) {
    response = responses[request.type];
  } else {
    response = new gateway.Response();
    response.type = request.type;
    responses[request.type] = response;
  }
  
  response.sequence = request.sequence + 1;
  response.checksum = 0;
  return response;
}

function error(response, code, reason) {
  response.error = new gateway.Response.Error({code:code, reason:reason});
  return Promise.resolve(response);
}

function decode(data) {
  var encodedString = new Buffer(data, 'base64');
  return gateway.Request.decode(encodedString);
}

function encode(response) {
  return response.encode().toBuffer().toString('base64');
}

/* ------------------------------------------------------------- */

// /api request router
router.post('/', function (req, res, next) {
  logger.startProfile('handler');

  // 메모리에 캐시된 사용자 정보 확인
  let userId = req.user.userId;
  var user = Users[userId];
  if (!user) {
    user = new User(userId);
    Users[userId] = user;
  } 

  //assert(user);

  // TODO: 레디스에 캐시된 사용자 정보 확인

  // 요청정보 디코딩
  let request = decode(req.body.data);
  //logger.debug(request);

  // 요청 처리
  handlers[request.type](request, user).then(function (response) {
    logger.debug(response);
    res.send(encode(response));
  
    logger.endProfile('handler');
  }, function (err) {
    logger.error(err);
    res.send(err);

    logger.endProfile('handler');
  });
});

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.NONE] = function (request, user) {
  var response = makeResponse(request);
  return error(response, gateway.ErrorCode.EC_INTERNAL, '');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.VERSION] = function (request, user) {
  logger.debug(request.version);

  var response = makeResponse(request);

  if (request.version.service != '0.1-test') {
    return error(response, gateway.ErrorCode.EC_VERSION, '서비스 버전이 맞지 않음');
  }

  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.LOGIN] = function (request, user) {
  logger.debug(request.login);

  var response = makeResponse(request);
  response.login = new gateway.Response.Login({
      plug_ip: '127.0.0.1'
    , plug_port: 9000
    , passwd: 'password'
  });
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.LOGOUT] = function (request, user) {
  logger.debug(request.logout);

  throw new NotImplementedError('logout handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.QUIT] = function (request, user) {
  logger.debug(request.quit);

  throw new NotImplementedError('quit handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.PLUG] = function (request, user) {
  logger.debug(request.plug);

  throw new NotImplementedError('plug handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.INFO] = function (request, user) {
  logger.debug(request.info);
  var response = makeResponse(request);
  user.fillInfo(response.info);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.PROPERTIES] = function (request, user) {
  logger.debug(request.properties);
  var response = makeResponse(request);
  user.fillProperties(response.properties);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.BADGES] = function (request, user) {
  logger.debug(request.bades);
  var response = makeResponse(request);
  user.fillBadges(response.badges);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.NICKNAME] = function (request, user) {
  logger.debug(request.nickname);
  var response = makeResponse(request);
  user.setNickname(request.nickname);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.MAKE_HERO] = function (request, user) {
  logger.debug(request.make_hero);
  var response = makeResponse(request);

  let job = request.make_hero.job;
  let first = false;

  if (!user.makeHero(job, first, response.make_hero)) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '캐릭터생성실패');
  }

  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SELECT_HERO] = function (request, user) {
  logger.debug(request.select_hero);
  var response = makeResponse(request);

  let job = request.select_hero.job;

  if (!user.selectHero(job, response)) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '캐릭터선택실패');
  }

  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.HEROES] = function (request, user) {
  logger.debug(request.heroes);
  var response = makeResponse(request);
  user.fillHeroes(response.heroes);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.DUNGEONS] = function (request, user) {
  logger.debug(request.dungeons);
  var response = makeResponse(request);

  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErroCode.EC_DATABASE, '선택한 캐릭터없음');
  }

  hero.fillDungeons(response.dungeons);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.EPIC_DUNGEONS] = function (request, user) {
  logger.debug(request.epic_dungeons);
  var response = makeResponse(request);

  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택한 캐릭터없음');
  }

  hero.fillEpicDungeons(response.epic_dungeons);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.STAGES] = function (request, user) {
  logger.debug(request.stages);
  var response = makeResponse(request);

  let dungeonId = request.stages.dungeon_id;
  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택한 캐릭터없음');
  }

  hero.fillStages(dungeonId, response.stages);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.UNLOCK_STAGE] = function (request, user) {
  logger.debug(request.unlock_stage);
  var response = makeResponse(request);

  let stageId = request.unlock_stage.stage_id;
  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택한 캐릭터없음');
  }

  hero.unlockStage(stageId, response.unlock_stage);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.RESET_STAGE] = function (request, user) {
  logger.debug(request.reset_stage);
  var response = makeResponse(request);

  let stageId = request.reset_stage.stage_id;
  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택한 캐릭터없음');
  }

  hero.resetStage(stageId, response.reset_stage);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.QUERY_STAGE] = function (request, user) {
  logger.debug(request.query_stage);
  var response = makeResponse(request);
  
  let stageId = request.query_stage.stage_id;
  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택한 캐릭터없음');
  }

  hero.queryStage(stageId, respons.query_stage);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.HEART] = function (request, user) {
  logger.debug(request.heart);
  var response = makeResponse(request);
  user.fillHeart(response.heart);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.ESHOP] = function (request, user) {
  logger.debug(request.eshop);
  var response = makeResponse(request);

  let market = request.eshop.market;

  user.fillEshop(market, response.eshop);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.BUY_IN_ESHOP] = function (request, user) {
  logger.debug(request.buy_in_eshop);

  var response = makeResponse(request);
  response.buy_in_eshop = new gateway.Response.BuyInEshop({
      cash: request.buy_in_eshop.cash
    , next_event: false
  });
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.CASH_SHOP] = function (request, user) {
  logger.debug(request.cash_shop);
  var response = makeResponse(request);

  let market = request.cash_shop.market;

  return user.fillCashShop(market, response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.BUY_IN_CASH_SHOP] = function (request, user) {
  logger.debug(request.buy_in_cash_shop);

  var response = makeResponse(request);
  response.buy_in_cash_shop = new gateway.Response.BuyInCashShop({
      cash: 10
    , talisman: 10
    , stone: 10
    , coin: 10
    , heart: 10
    , honbul: 10
  });
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.ONI_SHOP] = function (request, user) {
  logger.debug(request.oni_shop);
  var response = makeResponse(request);

  let method = request.oni_shop.method;
  let category = request.oni_shop.category;

  user.fillOniShop(method, category, response.oni_shop);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.BUY_IN_ONI_SHOP] = function (request, user) {
  logger.debug(request.buy_in_oni_shop);

  var response = makeResponse(request);
  response.buy_in_oni_shop = new gateway.Response.BuyInOniShop({
      cash: 10
    , honbul: 10
    , item_no: 20000
  });
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.COSTUMES] = function (request, user) {
  logger.debug(request.costumes);
  var response = makeResponse(request);

  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택된 캐릭터없음');
  }

  hero.fillCostumes(response.costumes);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SELECT_COSTUME] = function (request, user) {
  logger.debug(request.select_costume);
  var response = makeResponse(request);

  let costumeId = request.select_costume.stage_id;
  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택한 캐릭터없음');
  }

  hero.selectCostume(costumeId, response.select_costume);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.COSTUMES_TO_MAKE] = function (request, user) {
  logger.debug(request.costumes_to_make);
  var response = makeResponse(request);

  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택한 캐릭터없음');
  }

  hero.fillCostumesToMake(response.costumes_to_make);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.MAKE_COSTUME] = function (request, user) {
  logger.debug(request.make_costume);
  var response = makeResponse(request);

  let costumeId = request.make_costume.costume_id;

  user.makeCostume(costumeId, response.make_costume);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.BUY_COSTUME] = function (request, user) {
  logger.debug(request.buy_costume);
  var response = makeResponse(request);

  let costumeId = request.buy_costume.costume_id;

  user.buyCostume(costumeId, response.buy_costume);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.COSTUMES_TO_REINFORCE] = function (request, user) {
  logger.debug(request.costumes_to_reinforce);
  var response = makeResponse(request);

  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택한 캐릭터없음');
  }

  hero.fillCostumesToReinforce(response.costumes_to_reinforce);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.REINFORCE_COSTUME] = function (request, user) {
  logger.debug(request.reinforce_costume);
  var response = makeResponse(request);

  let costumeId = request.reinforce_costume.costume_id;

  user.reinforceCostume(costumeId, response.reinforce_costume);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.INVENTORY] = function (request, user) {
  logger.debug(request.inventory);
  var response = makeResponse(request);
  user.fillInventory(response.inventory);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.EXPAND_INVENTORY] = function (request, user) {
  logger.debug(request.expand_inventory);
  var response = makeResponse(request);
  
  let count = request.expand_inventory;

  user.expandInventory(count, response.expand_inventory);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.DROP_ITEM] = function (request, user) {
  logger.debug(request.drop_item);
  var response = makeResponse(request);

  let itemId = request.drop_item.item_id;
  let count = request.drop_item.count;

  user.dropItem(itemId, count, response.drop_item);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.PUT_ON] = function (request, user) {
  logger.debug(request.put_on);
  var response = makeResponse(request);

  let itemId = request.put_on.item_id;

  user.putOn(itemId, response.put_on);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.TAKE_OFF] = function (request, user) {
  logger.debug(request.take_off);
  var response = makeResponse(request);

  let itemId = request.take_off.item_id;

  user.takeOff(itemId, response.take_off);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.REINFORCE_ITEM] = function (request, user) {
  logger.debug(request.reinforce_item);
  var response = makeResponse(request);

  let type = request.reinforce_item.type;

  user.reinforceItem(type, response.reinforce_item);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.FIX_ITEM] = function (request, user) {
  logger.debug(request.fix_item);
  var response = makeResponse(request);

  let itemId = request.fix_item.item_id;

  user.fixItem(itemId, response.fix_item);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.MAKE_ITEM] = function (request, user) {
  logger.debug(request.make_item);
  var response = makeResponse(request);

  let itemId = request.make_item.item_id;

  user.makeItem(itemId, response.make_item);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.LOTTERYS] = function (request, user) {
  logger.debug(request.lotterys);
  var response = makeResponse(request);
  user.fillLotterys(response.lotterys);

  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.TAKE_LOTTERY] = function (request, user) {
  logger.debug(request.take_lottery);
  var response = makeResponse(request);

  let type = request.take_lottery.type;
  let count = request.take_lottery.count;
  let event = request.take_lottery.event;

  user.takeLottery(type, count, event, response.take_lottery);

  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.ROOM] = function (request, user) {
  logger.debug(request.room);

  throw new NotImplementedError('room handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.RESURRECTION] = function (request, user) {
  logger.debug(request.resurrection);

  throw new NotImplementedError('resurrection handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SKILLS] = function (request, user) {
  logger.debug(request.skills);
  var response = makeResponse(request);
  
  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택된 캐릭터없음');
  }

  hero.fillSkills(response.skills);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.EXPAND_SKILL_BUTTON] = function (request, user) {
  logger.debug(request.expand_skill_button);
  var response = makeResponse(request);

  let type = request.expand_skill_button.type;
  user.expandSkillButton(type, response.expand_skill_button);
 
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SKILL_BUTTON] = function (request, user) {
  logger.debug(request.skill_button);
  var response = makeResponse(request);

  let buttons = [
      request.skill_button.button_a
    , request.skill_button.button_b
    , request.skill_button.button_c
  ];

  user.setSkillButton(buttons, response.skill_button);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.REINFORCE_SKILL] = function (request, user) {
  logger.debug(request.reinforce_skill);
  var response = makeResponse(request);

  let skillId = request.reinforce_skill.skill_id;

  user.reinforceSkill(skillId, response.reinforce_skill);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SKILL_AUTO_ASSIGN] = function (request, user) {
  logger.debug(request.skill_auto_assign);
  var response = makeResponse(request);

  let hero = user.getSelectedHero();
  if (!hero) {
    return error(response, gateway.ErrorCode.EC_DATABASE, '선택된 캐릭터없음');
  }

  hero.skillAutoAssign(response.skill_auto_assign);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.RESET_SKILL] = function (request, user) {
  logger.debug(request.reset_skill);
  var response = makeResponse(request);
  user.resetSkill(response.reset_skill);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.FIND_BUDDY] = function (request, user) {
  throw new NotImplementeError('findBuddy handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.BUDDIES] = function (request, user) {
  logger.debug(request.buddies);
  var response = makeResponse(request);
  user.buddies(response.buddies);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.ASK_FRIENDSHIPS] = function (request, user) {
  throw new NotImplementedError('askFriendships handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SEND_HEART] = function (request, user) {
  throw new NotImplementedError('sendHeart handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.RECEIVE_HEART] = function (request, user) {
  throw new NotImplementedError('receiveHeart handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.RECEIVE_HEART_ALL] = function (request, user) {
  throw new NotImplementedError('receiveHeartAll handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.ACCEPT_FRIENDSHIP] = function (request, user) {
  throw new NotImplementedError('acceptFriendship handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.REJECT_FRIENDSHIP] = function (request, user) {
  throw new NotImplementedError('rejectFriendship handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.EXFRIEND] = function (request, user) {
  throw new NotImplementedError('exfriend handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.PROPOSE_BUDDY] = function (request, user) {
  throw new NotImplementedError('proposeBuddy handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SEARCHABLE] = function (request, user) {
  throw new NotImplementedError('searchable handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.RECOMMEND_FRIENDSHIPS] = function (request, user) {
  throw new NotImplementedError('recommendFriendships handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.FRIEND_PROFILE] = function (request, user) {
  throw new NotImplementedError('friendProfile handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.BUDDIES_TO_INVITE_GAME] = function (request, user) {
  throw new NotImplementedError('buddiesToInviteGame handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.INVITE_BUDDY_TO_PLAY_GAME] = function (request, user) {
  throw new NotImplementedError('inviteBuddyToPlayGame handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.BE_INVITED_TO_PLAY_GAME] = function (request, user) {
  throw new NotImplementedError('beInvitedToPlayGame handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.ACCEPT_GAME_INVITATION] = function (request, user) {
  throw new NotImplementedError('acceptGameInvitation handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.DECLINE_GAME_INVITATION] = function (request, user) {
  throw new NotImplementedError('declineGameInvitation handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.CANCEL_GAME_INVITATION] = function (request, user) {
  throw new NotImplementedError('cancelGameInvitation handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.CHANGE_PUBLIC_ROOM] = function (request, user) {
  throw new NotImplementedError('changePublicRoom handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.START_GAME] = function (request, user) {
  throw new NotImplementedError('startGame handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.FINISH_GAME] = function (request, user) {
  throw new NotImplementedError('finishGame handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SECOND_TREASURE] = function (request, user) {
  throw new NotImplementedError('secondTreasure handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.START_SURVIVAL_GAME] = function (request, user) {
  throw new NotImplementedError('startSurvivalGame handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.FINISH_SURVIVAL_GAME] = function (request, user) {
  throw new NotImplementedError('finishSurvivalGame handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.BATTLE_SKIP] = function (request, user) {
  throw new NotImplementedError('battleSkip handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.RANKING] = function (request, user) {
  logger.debug(request.ranking);
  var response = makeResponse(request);

  let type = request.ranking.type;
  let first = request.ranking.first;
  let count = request.ranking.count;

  user.fillRanking(type, first, count, ranking);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.RANKER] = function (request, user) {
  logger.debug(request.ranker);
  var response = makeResponse(request);

  let type = request.ranker.type;
  let userId = request.ranker.user_id;

  user.fillRanker(type, userId, response.ranker);

  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.DROP_OUT] = function (request, user) {
  throw new NotImplementedError('dropOut handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.CONFIRM_TO_DROP_OUT] = function (request, user) {
  throw new NotImplementedError('confirmToDropOut handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.GIFTS] = function (request, user) {
  logger.debug(request.gifts);
  var response = makeResponse(request);
  return user.fillGifts(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.TAKE_GIFT] = function (request, user) {
  logger.debug(request.take_gift);
  var response = makeResponse(request);

  let giftId = request.take_gift.gift_id.low;

  return user.takeGift(giftId, response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.TUTORIAL] = function (request, user) {
  logger.debug(request.tutorial);
  var response = makeResponse(request);

  let step = request.tutorial.step;

  user.fillTutorial(step, response.tutorial);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.LEVEL_UP] = function (request, user) {
  logger.debug(request.level_up);
  var response = makeResponse(request);

  let hero = user.getSelectedHero();
  let exp = request.level_up.exp;

  return hero.levelUp(exp, response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.WAVE] = function (request, user) {
  throw new NotImplementedError('wave handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.DAILYSTAMP] = function (request, user) {
  logger.debug(request.dailystamp);
  var response = makeResponse(request);

  let yearMonth = request.dailystamp.year_month;

  user.fillDailystamp(yearMonth, response.dailystamp);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.EXCHANGE_HEART] = function (request, user) {
  throw new NotImplementedError('exchangeHeart handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.ACHIVEMENT] = function (request, user) {
  logger.debug(request.achivement);
  var response = makeResponse(request);
  return user.fillAchivements(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.ACHIVEMENT_REWARD] = function (request, user) {
  throw new NotImplementedError('achivementReward handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.FACEBOOK_INVITATION] = function (request, user) {
  throw new NotImplementedError('facebookInvitation handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.INVITED_FACEBOOK_FRIENDS] = function (request, user) {
  throw new NotImplementedError('invitedFacebookFriends handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.COLLECT_MATERIAL] = function (request, user) {
  throw new NotImplementedError('collectMaterial handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.MATERIAL_COOLTIME] = function (request, user) {
  throw new NotImplementedError('materialCooltime handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.RESET_MATERIAL_COOLTIME] = function (request, user) {
  throw new NotImplementedError('resetMaterialCooltime handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.QUERY_PROMOTION] = function (request, user) {
  logger.debug(request.query_promotion);
  var response = makeResponse(request);
  return user.queryPromotion(response);
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.PROMOTER] = function (request, user) {
  throw new NotImplementedError('promoter handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.PROMOTION_COUNT] = function (request, user) {
  throw new NotImplementedError('promotionCount handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.LINK_FACEBOOK_FRIENDS] = function (request, user) {
  throw new NotImplementedError('linkFacebookFriends handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.UNLINK_FACEBOOK_FRIENDS] = function (request, user) {
  throw new NotImplementedError('unlinkFacebookFriends handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.FACEBOOK_FRIENDS] = function (request, user) {
  throw new NotImplementedError('facebookFriends handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.FACEBOOK_OPTIONS] = function (request, user) {
  throw new NotImplementedError('facebookOptions handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.QUERY_FACEBOOK_OPTIONS] = function (request, user) {
  throw new NotImplementedError('queryFacebookOptions handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.COUPON] = function (request, user) {
  throw new NotImplementedError('coupon handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.KEYWORD_COUPON] = function (request, user) {
  throw new NotImplementedError('keywordCoupon handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.COUPON_HISTORY] = function (request, user) {
  throw new NotImplementedError('couponHistory handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.ACCOUNT_MERGE] = function (request, user) {
  throw new NotImplementedError('accontMerge handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.CONFIRM_TO_ACCOUNT_MERGE] = function (request, user) {
  throw new NotImplementedError('confirmToAccountMerge handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.VIP] = function (request, user) {
  throw new NotImplementedError('vip handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.SURVIVAL_BUFF] = function (request, user) {
  throw new NotImplementedError('survivalBuff handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.REFILL_SURVIVAL_CHALLENGE] = function (request, user) {
  throw new NotImplementedError('refillSurvivalChallenge handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.REVIVAL] = function (request, user) {
  throw new NotImplementedError('revival handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.PUSH] = function (request, user) {
  throw new NotImplementedError('push handler');
};

/* ------------------------------------------------------------- */

handlers[gateway.MessageType.TEST_PARAM] = function (request, user) {
  throw new NotImplementedError('testParam handler');
};

/* ------------------------------------------------------------- */

module.exports = router;
