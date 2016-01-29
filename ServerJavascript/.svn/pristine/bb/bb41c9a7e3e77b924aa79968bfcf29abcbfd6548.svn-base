'use strict'

var pool = require('./db').pool
  , redis = require('./redis');

loadEvents(726).then(function (rows) {
  console.log(rows);
}).catch(function (err) {
  console.log(err);
});

/* ------------------------------------------------------------- */

function execute(query, params) {
  return new Promise(function (resolve, reject) {
    pool.query(query, params, function (err, rows, fields) {
      if (err) {
        console.log(query, err);
        reject(err);
      } else {
        console.log(query, rows);
        resolve(rows);
      }
    });
  });
}

/* ------------------------------------------------------------- */

module.exports.makeUser = function (gameId, facebookId, inventorySize, maxHeart, status) {
  var query = 'CALL MAKE_USER(?,?,?,?,?)';
  var params = [gameId, facebookId, inventorySize, maxHeart, status];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      var userId = rows[0][0].O_USER_ID;
      resolve(userId);
    }).catch(function (err) {
      reject(err);
    });
  });
};

/* ------------------------------------------------------------- */

module.exports.loadUser = function (userId) {
  var tasks = [loadUserInfo(userId),
               loadHeroes(userId),
               loadCostumes(userId),
               loadItems(userId)];

  return Promise.all(tasks);
};

/* ------------------------------------------------------------- */

function loadUserInfo(userId) {
  var query = 'CALL USER_INFO(?)';
  var params = [userId];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      // TODO: validation check for user
      resolve(rows);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/* ------------------------------------------------------------- */

function loadHeroes(userId) {
  var query = 'SELECT * FROM ARPG_GT_HERO WHERE USER_ID = ? ORDER BY JOB';
  var params = [userId];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      // TODO: validation for heroes
      resolve(rows);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/* ------------------------------------------------------------- */

function loadStages(heroId) {
  var query = 'SELECT * FROM ARPG_GT_STAGE '
              'WHERE HERO_ID = ?';
  var params = [heroId];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      // TODO: validation for hero stage
      resolve(rows);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/* ------------------------------------------------------------- */

function loadSkills(heroId) {
  var query = 'SELECT SKILL_ID, LV FROM ARPG_GT_SKILL '
              'WHERE HERO_ID = ?';
  var params = [heroId];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      // TODO: validation for hero skill
      resolve(rows);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/* ------------------------------------------------------------- */

function loadCostumes(userId) {
  var query = 'SELECT * FROM ARPG_GT_COSTUME a, ARPG_BT_COSTUME b '
              'WHERE a.BASE_COSTUME_ID = b.COSTUME_ID '
                'AND a.USER_ID = ? '
              'ORDER BY b.JOB';
  var params = [userId];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      // TODO: validation for costumes
      resolve(rows);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/* ------------------------------------------------------------- */

function loadItems(userId) {
  var query = 'SELECT * FROM ARPG_GT_INVENTORY '
              'WHERE USER_ID = ? '
              'ORDER BY SORT_ORDER';
  var params = [userId];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      // TODO: validation for items
      resolve(rows);
    }).catch(function (err) {
      reject(err);
    });
  });
}


/* ------------------------------------------------------------- */

function loadRankings(userId) {
  // TODO: load story ranking
  // TODO: load survival ranking
  // TODO: load pvp ranking
}

/* ------------------------------------------------------------- */

function loadStoryRanking(userId) {
}

/* ------------------------------------------------------------- */

function loadSurvivalRanking(heroId) {
}

/* ------------------------------------------------------------- */

function loadPvpRanking(userId) {
}

/* ------------------------------------------------------------- */

function loadEvents(userId) {
  var query = 'SELECT E_ID, DATE_FORMAT(ON_DATE, \'%Y/%m/%d %H:%i:%s\') FROM ARPG_GT_EVENT '
              'WHERE USER_ID = ?';
  var params = [userId];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      // TODO: validation for events
      resolve(rows);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/* ------------------------------------------------------------- */

function loadCoupons(userId) {
  var query = 'SELECT COUPON_ID, UPD_DATE FROM ARPG_GT_COUPON '
              'WHERE USER_ID = ?';
  var params = [userId];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      // TODO: validation for coupons
      resolve(rows);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/* ------------------------------------------------------------- */

function loadGifts(userId) {
  var query = 'SELECT PRESENT_ID, P_ID, ON_RECEIVE FROM ARPG_GT_PRESENT '
              'FROM USER_ID = ? '
              'ORDER BY ON_RECEIVE DESC';
  var params = [userId];

  return new Promise(function (resolve, reject) {
    execute(query, params).then(function (rows) {
      // TODO: validation for presents
      resolve(rows);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/* ------------------------------------------------------------- */

function loadPayments(userId) {
}

/* ------------------------------------------------------------- */

function loadAchivements(userId) {
}

/* ------------------------------------------------------------- */

function loadFriends(userId) {
}

/* ------------------------------------------------------------- */

function loadFacebookFriends(userId) {
}

/* ------------------------------------------------------------- */

module.exports.properties = function (callback) {
  var query = 'SELECT NAME, VALUE FROM ARPG_BT_PROPERTIES';
  execute(query, null, callback).then(function (rows) {
    callback(rows);
  }).catch(function (err) {
    console.log(err);
    console.trace();
  });
};

/* ------------------------------------------------------------- */
