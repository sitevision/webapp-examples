if (typeof define !== 'function') {
  var define = require('../../define-shim').define(module);
}
define(function (require) {
  'use strict';

  return {
    subtract: (a, b) => a - b,
  };
});
