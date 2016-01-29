'use strict'

/* ------------------------------------------------------------- */

function Hero(info) {
  this.heroId = info.HERO_ID;
  this.userId = info.USER_ID;
  this.job = info.JOB;
  this.level = info.LV;
  this.exp = info.EXP;
  this.playingTime = info.PLAYING_TIME;
  this.lastCostumeId = info.LAST_COSTUME_ID;
  this.buttonA = info.BUTTON_A;
  this.buttonB = info.BUTTON_B;
  this.buttonC = info.BUTTON_C;
  this.expandButton = info.EXPAND_BUTTON == 1 ? true : false;
  this.skillPoint = info.SKILL_POINT;
  this.unlockStageCount = info.UNLOCK_STAGE_COUNT;
}

/* ------------------------------------------------------------- */

Hero.prototype.hasCostume = function (costumeId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.addCostume = function (costume) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.costumeLevelUp = function (costumeId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.costumeLevel = function (costumeId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.getCostume = function (costumeId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.isUnlockedCostume = function (costumeId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.selectCostume = function (costumeId, select_costume) {
  this.fillHero(select_costume);
};

/* ------------------------------------------------------------- */

Hero.prototype.selectFirstCostume = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.levelUp = function (exp, response) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.updateAttributes = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.loadSkills = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.getSkills = function (skills) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.updateSkillRate = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.setSkillButton = function (buttons, update) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.hasSkill = function (skillId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.skillAutoAssign = function (skill_auto_assign) {
  // TODO: 스킬 자동 배치

  this.fillHero(skill_auto_assign);
};

/* ------------------------------------------------------------- */

Hero.prototype.getSkillLevel = function (skillId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.resetSkill = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.resetSkillPoint = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.attachEquip = function (item, update) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.detachEquip = function (item, update) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.getEquip = function (itemType) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.loadStage = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.canEnterDungeon = function (dungeonId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.isOpenStage = function (stageId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.isClearStage = function (stageId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.getStage = function (stageId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.unlockStage = function (stageId, unlock_stage) {
  unlock_stage = new gateway.Response.UnlockStage({
      cash: 10
    , stages: new common.Stages({
        dungeon_id: 1000
      , stages: []
      , event: new common.GameEvent({
            exp: 1
          , honbul: 2
          , material: 3
          , start_timestamp: 100000
          , end_timestamp: 200000
        })
      })
  });
};

/* ------------------------------------------------------------- */

Hero.prototype.resetStage = function (stageId, reset_stage) {
  reset_stage = new gateway.Response.ResetStage({
      cash: 10
    , stages: new common.Stages({
        dungeon_id: 1000
      , stages: []
      , event: new common.GameEvent({
            exp: 1
          , honbul: 2
          , material: 3
          , start_timestamp: 100000
          , end_timestamp: 200000
        })
      })
  });
};

/* ------------------------------------------------------------- */

Hero.prototype.queryStage = function (stageId, query_stage) {
  query_stage = new gateway.Response.QueryStage({
      unlock: false
    , cooltime: false
    , level: false
  });
};

/* ------------------------------------------------------------- */

Hero.prototype.openStage = function (stageId) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.stageStar = function (stageId, difficulty) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.finishGame = function (playTime, gainExp) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.clearStage = function (stageId, difficulty, start, perfect, score) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.updateEpicProgress = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.challengeBattleSkip = function (stageId, difficulty) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.spendUnlockStageCount = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.updateUnlockStageCount = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.unlockStageCount = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.loadStoryRanking = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.updateStoryRanking = function () {
  throw new NotImplementedError();
};

Hero.prototype.loadSurvivalRanking = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.updateSurvivalRanking = function (score, wave, playTime) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.survivalRanking = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.survivalResetCooltime = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.fillHero = function (hero) {
  hero = new common.Hero({
      job: this.job
    , level: this.level
    , curr_exp: this.currExp
    , next_exp: this.nextExp
    , playing_time: this.playingTime
    , epic_progress: this.epicProgress
    , skill_rate: this.skillRate
    , skill_point: this.skillPoint
    , unlock_stage_count: this.unlockStageCount
    , attributes: new common.Attributes({
          hp: this.hp
        , mp: this.mp
        , atk: this.atk
        , atr: this.atr
        , def: this.def
        , dfr: this.dfr
        , ctr: this.ctr
        , ctd: this.ctd
        , ccm: this.ccm
        , dex: this.dex
        , hpr: this.hpr
        , hpt: this.hpt
        , mpr: this.mpr
        , mpt: this.mpt
        , hb: this.hb
        , ctm: this.ctm
        , mov: this.mov
        , exp: this.exp
      })
  });
};

/* ------------------------------------------------------------- */

Hero.prototype.fillCostumes = function (costumes) {
  costumes = new gateway.Response.Costumes({
      job: this.job
    , selected_costume_id: 11000
    , costumes: [
        new gateway.Response.Costumes.Costume({
            costume_id: 11000
          , selected: true
          , reinforce: false
          , level: 1
        })
      , new gateway.Response.Costumes.Costume({
            costume_id: 12000
          , selected: false
          , reinforce: true
          , level: 2
        })
    ]
  });
};

/* ------------------------------------------------------------- */

Hero.prototype.fillCostumesToMake = function (costumes_to_make) {
  costumes_to_make = new gateway.Response.CostumesToMake({
      job: this.job
    , costumes: [
        new gateway.Response.CostumesToMake.Costume({
            part1: true
          , part2: false
          , part3: false
          , part4: false
          , part5: false
          , part6: true
          , costume_id: 12000
        })
      , new gateway.Response.CostumesToMake.Costume({
            part1: true
          , part2: false
          , part3: false
          , part4: false
          , part5: false
          , part6: true
          , costume_id: 13000
        })
    ]
  });
};

/* ------------------------------------------------------------- */

Hero.prototype.fillCostumesToReinforce = function (costumes_to_reinforce) {
  costumes_to_reinforce = new gateway.Response.CostumesToReinforce({
      job: this.job
    , costumes: [
        new gateway.Response.CostumesToReinforce.Costume({
            part1: true
          , part2: false
          , part3: false
          , part4: false
          , part5: false
          , part6: true
          , costume_id: 12000
          , level: 1
        })
      , new gateway.Response.CostumesToReinforce.Costume({
            part1: true
          , part2: false
          , part3: false
          , part4: false
          , part5: false
          , part6: true
          , costume_id: 13000
          , level: 2
        })
    ]
  });
};

/* ------------------------------------------------------------- */

Hero.prototype.fillSkills = function (skills) {
  skills = new gateway.Response.Skills({
      job: this.job
    , skills: [
        new gateway.Response.Skills.Skill({
            skill_id: 1000
          , level: 1
          , lock: false
          , max_level: false
        })
    ]
  });
};

/* ------------------------------------------------------------- */

Hero.prototype.fillAttributes = function (attribute) {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

Hero.prototype.fillDungeons = function (dungeons) {
  dungeons = new common.Dungeons({
      story: null
    , survival: null
    , daily: null
    , event: null
    , multi: new common.Dungeons.Multi({
          enable: true
        , reward: false
        , next_start_timestamp: 10000
        , next_end_timestamp: 20000
      })
  });
};

/* ------------------------------------------------------------- */

Hero.prototype.fillEpicDungeons = function (epic_dungeons) {
  epic_dungeons = new common.EpicDungeons([
      new common.EpicDungeons.Dungeon({
          dungeon_id: 1000
        , lock: false
        , new_stage: true
        , going_stage: false
      })
    , new common.EpicDungeons.Dungeon({
          dungeon_id: 2000
        , lock: true
        , new_stage: true
        , going_stage: false
      })
  ]);
};

/* ------------------------------------------------------------- */

Hero.prototype.fillStages = function (dungeonId, response) {
  response.stages = new common.Stages({
      dungeon_id: dungeonId
    , stages: []
    , event: new common.GameEvent({
          exp: 1
        , honbul: 2
        , material: 3
        , start_timestamp: 100000
        , end_timestamp: 200000
      })
  });
  return Promise.resolve(response);
};

/* ------------------------------------------------------------- */

Hero.prototype.toJSON = function () {
  throw new NotImplementedError();
};

Hero.prototype.toPB = function () {
  throw new NotImplementedError();
};

/* ------------------------------------------------------------- */

module.exports = Hero;
