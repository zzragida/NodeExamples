'use strict'

var SETTINGS = (function () {
  var config = require('config')
    , instance = {};

  // 프로파일러
  instance['PROFILER_ENABLE'] = config.profiler.enable;
  instance['PROFILER_INTERVAL'] = config.profiler.interval;

  // 네트워크 덤프
  instance['NETWORK_DUMP_PACKET'] = config.network.dump_packet;
  instance['NETWORK_DUMP_TRAFFIC'] = config.network.dump_traffic;

  // 데이터베이스
  instance['DB_DEBUG'] = config.database.debug;

  // 로깅
  instance['LOGGING'] = config.logging;

  // 프리젠스 레디스
  instance['REDIS_PRESENCES'] = config.redis_presences;

  // 모니터 레디스
  instance['REDIS_MONITOR'] = config.redis_monitor;

  // 대기방 레디스
  instance['REDIS_READY'] = config.redis_ready;

  // 친구 레디스
  instance['REDIS_BUDDIES'] = config.redis_buddies;

  // 랭킹 레디스
  instance['REDIS_RANKING'] = config.redis_ranking;

  // 랭커 프로필 레디스
  instance['REDIS_RANK_PROFILES'] = config.redis_rank_profiles;

  // 추천 레디스
  instance['REDIS_RECOMMEND'] = config.redis_recommend;

  // 매칭 레디스
  instance['REDIS_MATCH'] = config.redis_match;

  // 금칙어

  // 멤버쉽

  return instance;
})();

module.exports.SETTINGS = SETTINGS;
