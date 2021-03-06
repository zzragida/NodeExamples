'use strict'

var pool = require('./db').pool
  , redis = require('./redis');

/* ------------------------------------------------------------- */

function execute(query, params, callback) {
  logger.debug('QUERY: ' + query);

  pool.getConnection(function (err, connection) {
    // connection error
    if (err) {
      return callback(err, null);
    }

    // query by connection
    connection.query(query, params, function (err, rows) {
      // connection release
      connection.release();

      if (err) {
        logger.error(err);
      } else {
        logger.debug(rows);
      }
      callback(err, rows);
    });
  });
}

/* ------------------------------------------------------------- */

module.exports.makeUser = function (params, callback) {
  let query = 'CALL MAKE_USER(?,?,?,?,?)';
  execute(query, params, function (err, rows) {
    let userId = rows[0][0].O_USER_ID || 0;
    callback(err, userId);
  });
};

/* ------------------------------------------------------------- */

module.exports.loadUserInfo = function (userId, callback) {
  let query = 'CALL USER_INFO(?)';
  //let query = 'SELECT * FROM ARPG_GT_USER WHERE USER_ID = ?';
  let params = [userId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadHeroes = function (userId, callback) {
  let query = 'SELECT * FROM ARPG_GT_HERO WHERE USER_ID = ? ORDER BY JOB';
  let params = [userId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadStages = function (heroId, callback) {
  let query = 'SELECT * FROM ARPG_GT_STAGE '
              'WHERE HERO_ID = ?';
  let params = [heroId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadSkills = function (heroId, callback) {
  let query = 'SELECT SKILL_ID, LV FROM ARPG_GT_SKILL '
              'WHERE HERO_ID = ?';
  let params = [heroId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadCostumes = function (userId, callback) {
  let query = 'SELECT * FROM ARPG_GT_COSTUME a, ARPG_BT_COSTUME b '
              'WHERE a.BASE_COSTUME_ID = b.COSTUME_ID '
                'AND a.USER_ID = ? '
              'ORDER BY b.JOB';
  let params = [userId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadItems = function (userId, callback) {
  let query = 'SELECT * FROM ARPG_GT_INVENTORY '
              'WHERE USER_ID = ? '
              'ORDER BY SORT_ORDER';
  let params = [userId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadRankings = function (userId, callback) {
  // TODO: load story ranking
  // TODO: load survival ranking
  // TODO: load pvp ranking
}

/* ------------------------------------------------------------- */

module.exports.loadStoryRanking = function (userId, callback) {
}

/* ------------------------------------------------------------- */

module.exports.loadSurvivalRanking = function (heroId, callback) {
}

/* ------------------------------------------------------------- */

module.exports.loadPvpRanking = function (userId) {
}

/* ------------------------------------------------------------- */

module.exports.loadEvents = function (userId, callback) {
  let query = 'SELECT E_ID, DATE_FORMAT(ON_DATE, \'%Y/%m/%d %H:%i:%s\') '
              'FROM ARPG_GT_EVENT '
              'WHERE USER_ID = ?';
  let params = [userId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadCoupons = function (userId, callback) {
  let query = 'SELECT COUPON_ID, UPD_DATE FROM ARPG_GT_COUPON '
              'WHERE USER_ID = ?';
  let params = [userId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadGifts = function (userId, callback) {
  let query = 'SELECT PRESENT_ID, P_ID, ON_RECEIVE FROM ARPG_GT_PRESENT '
              'FROM USER_ID = ? '
              'ORDER BY ON_RECEIVE DESC';
  let params = [userId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadPayments = function (userId, callback) {
  let query = 'SELECT PAY_ID, CASH, ON_DATE FROM ARPG_GT_PAYMENT '
              'WHERE USER_ID = ? '
              'ORDER BY ON_DATE';
  let params = [userId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadAchivements = function (userId, callback) {
  let query = 'SELECT A_ID, `REPEAT`, REWARD_REPEAT FROM ARPG_GT_ACHIVEMENT '
              'WHERE USER_ID = ? '
              'ORDER BY A_ID';
  let params = [userId];
  execute(query, params, callback);
}

/* ------------------------------------------------------------- */

module.exports.loadFriends = function (userId, callback) {
}

/* ------------------------------------------------------------- */

module.exports.loadFacebookFriends = function (userId, callback) {
}

/* ------------------------------------------------------------- */

module.exports.properties = function (callback) {
  let query = 'SELECT NAME, VALUE FROM ARPG_BT_PROPERTIES';
  execute(query, null, callback);
};

/* ------------------------------------------------------------- */

