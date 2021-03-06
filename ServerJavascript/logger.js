'use strict'

/* ------------------------------------------------------------- */

var winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ 
        level: SETTINGS.LOGGING[0].level,
        colorize: true,
        timestamp: true,
        prettyPrint: true
    }),
    new (winston.transports.File)({ 
        level: SETTINGS.LOGGING[1].level,
        filename: SETTINGS.LOGGING[1].filename,
        json: false,
        timestamp: function () {
          return new Date().toJSON();
        },
        formatter: function (options) {
          let fileno = new Error().stack.split('\n');
          fileno = '(' + fileno[fileno.length-1].split('(')[1];

          return JSON.stringify({
              time: options.timestamp(),
              level: options.level.toUpperCase(),
              fileno: fileno,
              message: options.message
          });
        }
    })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ 
        level: SETTINGS.LOGGING[0].level,
        colorize: true,
        timestamp: true
    }),
    new (winston.transports.File)({ 
        filename: SETTINGS.LOGGING[1].filename
    })
  ]
});

/* ------------------------------------------------------------- */

logger.exitOnError = false;

module.exports.debug = logger.debug;
module.exports.verbose = logger.verbose;
module.exports.info = logger.info;
module.exports.warn = logger.warn;
module.exports.error = logger.error;

var memwatch;
var profiler;
var heapDiff;

if (SETTINGS.PROFILER_ENABLE) {
  memwatch = require('memwatch-next');
  profiler = require('strong-cpu-profiler');
}

module.exports.startProfile = function (name) {
  if (memwatch) {
    logger.profile(name);
    profiler.startProfiling(name);
    heapDiff = new memwatch.HeapDiff();
  }
};

module.exports.endProfile = function (name) {
  if (memwatch && heapDiff) {
    logger.profile(name);
    logger.debug('CPU profile: ', profiler.stopProfiling(name));

    let diff = heapDiff.end();
    logger.info(diff);
  }
};

/* ------------------------------------------------------------- */
