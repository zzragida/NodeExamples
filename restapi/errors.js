'use strict'

/* ------------------------------------------------------------- */

function NotImplementedError(message) {
  var error = new Error(message);
  this.name = 'NotImplementedError';
  error.name = this.name;
  this.message = message || '';
  this.stack = error.stack;
}

NotImplementedError.prototype = Object.create(Error.prototype);

module.exports.NotImplementedError = NotImplementedError;

/* ------------------------------------------------------------- */

/* ------------------------------------------------------------- */
