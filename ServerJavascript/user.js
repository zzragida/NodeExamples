'use strict'

var models = require('./models')
  , Hero = require('./hero')
  , Buddy = require('./buddy')
  , Item = require('./item')
  , Costume = require('./costume')
  , Skill = require('./skill')
  , Stage = require('./stage')
  , gateway = PROTOCOL.m3.gateway
  , common = PROTOCOL.m3.common
  , room = PROTOCOL.m3.room;

/* ------------------------------------------------------------- */

function User(userId) {
  this.userId = userId;
  this.heroes = [];
  this.costumes = [];
  this.stages = [];
  this.skills = [];
  this.items = [];
  this.events = [];
  this.gifts = [];
  this.payments = [];
  this.achivements = [];

  // load information async
  load(this);
}

/* ------------------------------------------------------------- */

function load(self) {
  loadInfo(self);
  loadHeroes(self);
  loadCostumes(self);
  loadStages(self);
  loadGifts(self);
  loadPayments(self);
  loadAchivements(self);
}

/* ------------------------------------------------------------- */

function loadInfo(self) {
  models.loadUserInfo(self.userid, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let info = results;

      self.status = info.O_STATUS;
      self.nickname = info.O_NICKNAME;
      self.honbul = info.O_HONBUL;
      self.cash = info.O_CASH;
      self.talisman = info.O_TALISMAN;
      self.stone = info.O_STONE;
      self.coin = info.O_COIN;
      self.heart = info.O_HEART;
      self.selectedHeroId = info.O_SELECTED_HERO;
      self.inventorySize = info.O_INVENTORY_SIZE;
      self.searchable = info.O_SEARCHABLE == 1 ? true : false;
      self.vipLevel = info.O_VIP_LEVEL;
      self.noFacebookMessage = info.O_NO_FACEBOOK_MESSAGE == 1 ? true : false;
      self.noFacebookProfile = info.O_NO_FACEBOOK_PROFILE == 1 ? true : false;
      self.review = info.O_REVIEW == 1 ? true : false;
      self.mycard = false;
    }
  });
}

/* ------------------------------------------------------------- */

function loadHeroes(self) {
  models.loadHeroes(self.userId, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let infos = results;
      self.heroes = infos.map(function (info) {
        return new Hero(info);
      });
    }
  });
}

/* ------------------------------------------------------------- */

function loadCostumes(self) {
  models.loadCostumes(self.userId, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let infos = results;
      self.costumes = infos.map(function (info) {
        return new Costume(info);
      });
    }
  });
}

/* ------------------------------------------------------------- */

function loadStages(self) {
  models.loadStages(self.userId, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let infos = results;
      self.stages = infos.map(function (info) {
        return new Stage(info);
      });
    }
  });
}

/* ------------------------------------------------------------- */

function loadSkills(self) {
  models.loadSkills(self.userId, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let infos = results;
      self.skills = infos.map(function (info) {
        return new Skill(info);
      });
    }
  });
}

/* ------------------------------------------------------------- */

function loadItems(self) {
  models.loadItems(self.userId, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let infos = results;
      self.items = infos.map(function (info) {
        return new Item(info);
      });
    }
  });
}

/* ------------------------------------------------------------- */

function loadRankings(self) {
}

/* ------------------------------------------------------------- */

function loadEvents(self) {
  models.loadEvents(self.userId, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let infos = results;
      self.events = infos.map(function (info) {
        return info;
      });
    }
  });
}

/* ------------------------------------------------------------- */

function loadCoupons(self) {
}

/* ------------------------------------------------------------- */

function loadGifts(self) {
  models.loadGifts(self.userId, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let infos = results;
      self.gifts = infos.map(function (info) {
        return info;
      });
    }
  });
}

/* ------------------------------------------------------------- */

function loadPayments(self) {
  models.loadPayments(self.userId, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let infos = results;
      self.payments = infos.map(function (info) {
        return info;
      });
    }
  });
}

/* ------------------------------------------------------------- */

function loadAchivements(self) {
  models.loadAchivements(self.userId, function (err, results) {
    if (err) {
      logger.error(err);
    } else {
      let infos = results;
      self.achivements = infos.map(function (info) {
        return info;
      });
    }
  });
}

/* ------------------------------------------------------------- */

function loadFriends(self) {
}

/* ------------------------------------------------------------- */

function loadFacebookFriends(self) {
}

/* ------------------------------------------------------------- */

User.prototype.login = function(gameId, userId, platform, ip) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.logout = function(gameId, facebookId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.setNickname = function (name) {
  this.nickname = name;
};

/* ------------------------------------------------------------- */

User.prototype.maxHeroLevel = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.challengeStage = function (stageId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.updateWave = function (honbul, exp) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.spendSurvivalTry = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.resetSurvivalTry = function (useCash) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.updateSurvivalWaveRecord = function (wave) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.startGame = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.endGame = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.finishGame = function (playTime, exp, honbul) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.finishSurvivalGame = function (wave, score, honbul, playTime, exp) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.spendHeart = function (heart) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.findBuddy = function (name) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.buddies = function (buddies) {
  buddies = new gateway.Response.Buddies({
      buddies: []
    , heart: 100
    , story_score: 10000
  });
};

/* ------------------------------------------------------------- */

User.prototype.askFriendships = function (buddies) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.proposeBuddies = function (buddies) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.heartsToReceive = function (hearts) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillBuddies = function (response) {

};

/* ------------------------------------------------------------- */

User.prototype.sendHearts = function (hearts) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.sendHeart = function (receiverId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.restrictSendHearts = function (hearts) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.updateRestrictSendHearts = function (receiverId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.receiveHeart = function (senderId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.exfriend = function (friendId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.askFriendship = function (targetId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.acceptFriendship = function (targetId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.rejectFriendship = function (targetId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.sendProfileToBuddy = function (online) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.toggleSearchable = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.isBreakUpFriendLimit = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.isFacebookFriend = function (facebookId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.isFacebookFriendByUserId = function (userId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.isFacebookInvited = function (facebookId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.isFacebookInvitationLimit = function() {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.facebookInvitationCount = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.inviteFacebookFriend = function (facebookId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.isFacebookHeartDayLimit = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.linkFacebookFriend = function (friends) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.unlinkFacebookFriend = function (friends) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.appendFacebookFriends = function (friends) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.changeFacebookOptions = function (noMessage, noProfile) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.materialCooltime = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.resetMaterialCooltime = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.collectMaterial = function (materialId, price) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.queryPromotion = function (response) {
  response.query_promotion = new gateway.Response.QueryPromotion({
      onoff: false
    , promoted: true
  });
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

User.prototype.addInventorySlot = function (count) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.emptySlotInInventory = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.excessSlotInInventory = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.putOn = function (itemId, put_on) {
  let hero = this.getSelectedHero();

  // TODO: 아이템 장착처리

  put_on = hero.fillHero();
};

/* ------------------------------------------------------------- */

User.prototype.takeOff = function (itemId, take_off) {
  let hero = this.getSelectedHero();

  // TODO: 아이템 해제처리
  
  take_off = hero.fillHero();
};

/* ------------------------------------------------------------- */

User.prototype.reinforceItem = function (type, reinforce_item) {
  reinforce_item = new gateway.Response.ReinforceItem({
      success: true
    , broken: false
    , item_id: 11000
    , stone: this.stone
    , honbul: this.honbul
    , cash: this.cash
  });
};

/* ------------------------------------------------------------- */

User.prototype.fixItem = function (itemId, fix_item) {
  fix_item = new gateway.Response.FixItem({
      item_id: itemId
    , cost: 1000
    , cash: this.cash 
  });
};

/* ------------------------------------------------------------- */

User.prototype.getItemById = function (itemId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.getItemByNo = function (itemNo) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.getItemCount = function (itemNo) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.hasItem = function (itemNo, count) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.dropItem = function (itemId, count, drop_item) {
  drop_item = new gateway.Response.DropItem({
      total: 10
    , drop: 9
    , remain: 1
    , gain_honbul: 1000
    , gain_stone: 10
    , honbul: this.honbul
    , stone: this.stone
  });
};

/* ------------------------------------------------------------- */

User.prototype.removeItem = function (item) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.makeItem = function (itemId, make_item) {
  make_item = new gateway.Response.MakeItem({
      blueprint_no: 10000
    , item_id: 10000
    , item_no: 20000
  });
};

/* ------------------------------------------------------------- */

User.prototype.addItem = function (itemNo) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.addMaterial = function (materialId, count) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.makeHero = function (job, first, make_hero) {
  // TODO: 캐릭터 생성
  let hero = new Hero(1000, 1);

  make_hero = hero.fillHero();
  return true;
};

/* ------------------------------------------------------------- */

User.prototype.selectHero = function (job, response) {
  let hero = this.heroes[job];
  if (!hero) {
    return false;
  }

  response.select_hero = hero.fillHero();
  return true;
};

/* ------------------------------------------------------------- */

User.prototype.getHeroByJob = function (job) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.getHeroById = function (heroId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.getSelectedHero = function () {
  return this.heroes.find(function (hero) {
    if (hero.heroId == this.selectedHeroId) {
      return true;
    }
    return false;
  });
};

/* ------------------------------------------------------------- */

User.prototype.hasCostume = function (costumeId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.addCostume = function (costume) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.buyCostume = function (costumeId, buy_costume) {
  let hero = this.getSelectedHero();

  response.buy_costume = new gateway.Response.BuyCostume({
      cash: this.cash
  });
  hero.fillCostumesToMake(buy_costume.costumes);
};

/* ------------------------------------------------------------- */

User.prototype.makeCostume = function (costumeId, make_costume) {
  let hero = this.getSelectedHero();

  make_costume = new gateway.Response.MakeCostume({
      honbul: this.honbul
  });
  hero.fillCostumesToMake(make_costume.costumes);
};

/* ------------------------------------------------------------- */

User.prototype.reinforceCostume = function (costumeId, reinforce_costume) {
  let hero = this.getSelectedHero();

  reinforce_costume = new gateway.Response.ReinforceCostume({
      cash: this.cash
    , honbul: this.honbul
  });
  hero.fillCostumesToReinforce(reinforce_costume.costumes);
};

/* ------------------------------------------------------------- */

User.prototype.fetchCostume = function (hero) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.expandSkillButton = function (type, expand_skill_button) {
  let hero = this.getSelectedHero();

  expand_skill_button = new gateway.Response.ExpandSkillButton({
      cash: this.cash
    , honbul: this.honbul
  });
  hero.fillHero(expand_skill_button.hero);
};

/* ------------------------------------------------------------- */

User.prototype.setSkillButton = function (buttons, skill_button) {
  let hero = this.getSelectedHero();
  
  // TODO: 스킬버튼 설정

  hero.fillHero(skill_button);
};

/* ------------------------------------------------------------- */

User.prototype.reinforceSkill = function (skillId, reinforce_skill) {
  let hero = this.getSelectedHero();

  reinforce_skill = new gateway.Response.ReinforceSkill({
      honbul: this.honbul
  });

  hero.fillSkills(reinforce_skill.skills);
  hero.fillHero(reinforce_skill.hero);
};

/* ------------------------------------------------------------- */

User.prototype.resetSkill = function (reset_skill) {
  let hero = this.getSelectedHero();

  reset_skill = new gateway.Response.ResetSkill({
      honbul: this.honbul
    , skill_point: hero.skillPoint
    , button_a: hero.buttonA
    , button_b: hero.buttonB
    , button_c: hero.buttonC
  });

  hero.fillSkills(reset_skill.skills);
};

/* ------------------------------------------------------------- */

User.prototype.buyInEshop = function (paymentId, payment) {
  throw new NotImplementedError();
};

User.prototype.hasEshopEvent = function () {
  throw new NotImplementedError();
};

User.prototype.buyInCashShop = function (cash, good) {
  throw new NotImplementedError();
};

User.prototype.buyInOniShop = function (price, discount) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.updateStoryRanking = function (difficulty) {
  throw new NotImplementedError();
};

User.prototype.updateSurvivalRanking = function (score, wave, playTime) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.addGift = function (giftId) {
  throw new NotImplementedError();
};

User.prototype.deleteGift = function (giftId) {
  throw new NotImplementedError();
};

User.prototype.makeRewardMaterial = function (stage, difficulty) {
  throw new NotImplementedError();
};

User.prototype.makeTreasures = function (treasures, stage, difficulty) {
  throw new NotImplementedError();
};

User.prototype.makeSurvivalTreasures = function (treasures, wave) {
  throw new NotImplementedError();
};

User.prototype.giveTreasure = function (treasureId, type, itemId) {
  throw new NotImplementedError();
};

User.prototype.makeGift = function (giftId) {
  throw new NotImplementedError();
};

User.prototype.takeGift = function (giftId) {
  throw new NotImplementedError();
};

User.prototype.giveLevelUpGift = function () {
  throw new NotImplementedError();
};

User.prototype.giveCostumeGift = function () {
  throw new NotImplementedError();
};

User.prototype.giveMultiGift = function () {
  throw new NotImplementedError();
};

User.prototype.giveReviewGift = function (presentId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.achivement = function (type, count) {
  throw new NotImplementedError();
};

User.prototype.itemAchivement = function (rank) {
  throw new NotImplementedError();
};

User.prototype.stageClearAchievment = function (stageId) {
  throw new NotImplementedError();
};

User.prototype.todayQuestReward = function () {
  throw new NotImplementedError();
};

User.prototype.rewardQuest = function (rewardType, express) {
  throw new NotImplementedError();
};

User.prototype.rewardAchivement = function (type, rewardType, express) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillInfo = function(info) {
  info = new common.GameInfo({
      honbul: this.honbul
    , cash: this.cash
    , talisman: this.talisman
    , stone: this.stone
    , coin: this.coin
    , heart: this.heart
    , inventory_size: this.inventorySize
    , searchable: this.searchable
    , vip_level: this.vipLevel
    , no_facebook_message: this.noFacebookMessage
    , no_facebook_profile: this.noFacebookProfile
    , review: this.review
    , mycard: this.mycard
    });
};

/* ------------------------------------------------------------- */

User.prototype.fillProperties = function (properties) {
  properties = new common.Properties({
      honbul_for_expand_skill_button: 0
    , cash_for_expand_skill_button: 0
    , reset_cash_for_material_cooltime: 0
    , collect_material_multiplier: 0
    , max_reset_material_cooltime: 0
    , cash_for_resurrection: 0
    , coin_for_resurrection: 0
    , needs_resurrection_by_cash: 0
    , needs_resurrection_by_coin: 0
    , hero_level_for_multiplay: 0
    , level_for_new_archer: 0
    , honbul_for_new_hero: 0
    , cash_for_inventory_slot: 0
    , max_hero_level: 80
    , send_heart_amount: 10
    , reward_of_send_heart: 0
    , max_friend_count: 10
    , reward_of_facebook_invitation: 0
    , battle_skip_star1: 0
    , battle_skip_star2: 0
    , battle_skip_star3: 0
    , battle_skip_star4: 0
    , battle_skip_star5: 0
    , honbul_for_battle_skip: 10
    , battle_skip_exp: 0
    , battle_skip_probability: 0
    , discount_for_oni_shop_honbul: 0
    , discount_for_oni_shop_cash: 0
    , discount_for_reset_skill: 0
    , survival_exp_factor: 1.0
    , survival_honbul_factor: 1.0
    , survival_max_resurrection: 1
    , survival_ingame_heal: 0
    , survival_refill_price: 0
    , promotion_onoff: false
    , coupon_onoff: false
    , cafe_onoff: false
    , guest_login_onoff: false
    , community_url: ''
    , closing_dungeon_timeout: 0
    , select_stage_timeout: 0
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillBadges = function (badges) {
  badges = new common.Badges({
      gift_count: 0
    , blueprint: 0
    , costume_event: 0
    , hearts_to_receive: 0
    , ask_friendships: 0
    , achivement: 0
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillHeroes = function (heroes) {
  this.heroes.forEach(function (hero) {
    heroes.push(new gateway.Response.Hero({
        job: hero.job
      , level: hero.level
    }));
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillPlayer = function (player) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillInventory = function (inventory) {
  inventory = new common.Inventory({
      limit: 100
    , honbul: this.honbul
    , cash: this.cash
    , entries: []
  });

  this.items.forEach(function (item) {
    inventory.entries.push(new common.Inventory.Entry({
          item_id: item.itemId
        , type: item.type
        , equip: new common.Inventory.Equip({
              level: item.level
            , limited: item.limited
            , broken: item.broken
            , overcom: item.overcome
          })
        , item: new common.Inventory.Item({
              count: item.count
          })
    }));
  });
};

/* ------------------------------------------------------------- */

User.prototype.expandInventory = function (count, expand_inventory) {
  // TODO: 인벤토리 확장 비용 계산
  let spendCash = 10;


  expand_inventory = new gateway.Response.ExpandInventory({
      spend_cash: spendCash
    , inventory_size: this.inventorySize
    , cash: this.cash
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillHeart = function (heart) {
  heart = new gateway.Response.Heart({
      heart_count: 100
    , max_heart: 100
    , next_time: 20
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillEshop = function (market, eshop) {
  eshop = new common.Eshop({
      market: common.MarketType.MARKET_PLAYSTORE
    , event: common.EshopEventType.ESHOP_EVENT_NONE
    , cooltime: 2
    , goods: []
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillCashShop = function (market, cash_shop) {
  cash_shop = new gateway.Response.CashShop({
      cash_shop: new common.CashShop({
          goods: []
      })
    , discount_vip: 10
  });
  this.fillEshop(cash_shop.eshop);
};

/* ------------------------------------------------------------- */

User.prototype.fillOniShop = function (method, category, oni_shop) {
  oni_shop = new gateway.Response.OniShop({
      goods: []
    , reset_skill: null
    , discount_vip: null
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillGifts = function (response) {
  response.gifts = new gateway.Response.Gifts([
      new gateway.Response.Gifts.Gift({
          gift_id: 1
        , gift_pid: 2
        , count: 1
        , item_id: 2
        , title: 'Gift'
        , message: 'Gift Message'
        , cooltime: 100
      })
    , new gateway.Response.Gifts.Gift({
          gift_id: 1
        , gift_pid: 2
        , count: 1
        , item_id: 2
        , title: 'Gift'
        , message: 'Gift Message'
        , cooltime: 100
      })
  ]);
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

User.prototype.takeGift = function (giftId, response) {
  response.take_gift = new gateway.Response.TakeGift({
      gift_pid: 2
    , count: 2
    , item_id: 1000
    , gift_type: common.GiftType.GIFT_CASH
  });
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

User.prototype.fillTutorial = function (step, tutorial) {
  tutorial = new gateway.Response.Tutorial({
      step1: true
    , step2: true
    , step3: true
    , step4: true
    , step5: true
    , step6: true
    , step7: true
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillAchivements = function (response) {
  response.achivement = new gateway.Response.Achivement({
      today: null
    , achivements: [
        new gateway.Response.Achivement.Entry({
          type: common.AchivementType.ACHIVEMENT_NONE
        , level: 1
        , progress: 10
      })
    ]
  });
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

User.prototype.fillInvitedFacebookFriends = function (friends) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillCouponGift = function (couponId, couponCode) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillKeywordCouponGift = function (keyword) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillCouponHistory = function (history) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillLotterys = function (lotterys) {
  lotterys = new gateway.Response.Lotterys({
      lotterys: null
    , events: []
  });
};

/* ------------------------------------------------------------- */

User.prototype.takeLottery = function (type, count, event, take_lottery) {
  take_lottery = new gateway.Response.TakeLottery({
      cash: 100
    , talisman: 10
    , gifts: []
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillRanking = function (type, first, count, ranking) {
  ranking = new gateway.Response.Ranking({
      type: type
    , me: null
    , rankers: []
    , reset_cooltime: 10
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillRanker = function (type, userId, ranker) {
  ranker = new common.Ranker({
      user_id: userId
    , nickname: 'user nickname'
    , heroes: []
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillSurvivalBuff = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillVip = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillDailystamp = function (yearMonth, dailystamp) {
  dailystamp = new gateway.Response.DailyStamp({
      days: this.days
    , stamps: []
    , vip_reward: false
  });
};

/* ------------------------------------------------------------- */

User.prototype.fillAccountMerge = function (facebookId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.fillNotifyMessage = function (notifyMessage) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

User.prototype.toJSON = function () {
  throw new NotImplementedError();
};

User.prototype.serialize = function () {
  var user = new DATA.m3.data.User();
  user.userId = this.userId;
  user.gameId = this.gameId;
  user.facebookId = this.facebookId;

  // heroes
  //user.setHeroes(this.heroes.map(function (hero) { return hero.toPB(); }));

  // items
  //user.setItems(this.items.map(function (item) { return item.toPB(); }));

  // gifts
  //user.setGifts(this.gifts.map(function (gift) { return gift.toPB(); }));

  // buddies
  //user.setBuddies(this.buddies.map(function (buddy) { return buddy.toPB(); }));

  // facebookBuddies
  return user;
};

/* ------------------------------------------------------------- */

module.exports = User;

module.exports.getUserId = function (gameId, facebookId, callback) {
  var inventorySize = 10;
  var maxHeart = 10;
  var status = 1;

  models.makeUser([gameId, facebookId, inventorySize, maxHeart, status], callback);
};

module.exports.deserialize = function (data) {
  return DATA.m3.data.User.decode(new Buffer(data, 'base64'));
};

/* ------------------------------------------------------------- */
