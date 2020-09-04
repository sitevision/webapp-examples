if (typeof define !== 'function') {
  var define = require('../../define-shim').define(module);
}
define(function (require) {
  'use strict';

  return {
    add: (a, b) => a + b,
  };
});
