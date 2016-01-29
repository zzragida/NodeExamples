'use strict'

/* ------------------------------------------------------------- */

function Skill(skillId, level) {
  this.skillId = skillId;
  this.level = level;
}

/* ------------------------------------------------------------- */

Skill.prototype.toJSON = function () {
  return JSON.stringify({
    skillId: this.skillId,
    level: this.level
  });
};

Skill.prototype.toPB = function () {
  return new DATA.m3.data.Skill({
    skillId: this.skillId,
    level: this.level
  });
};

/* ------------------------------------------------------------- */

module.exports = Skill;
