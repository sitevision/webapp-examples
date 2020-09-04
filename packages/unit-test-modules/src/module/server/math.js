if (typeof define !== 'function') {
  var define = require('../../define-shim').define(module);
}
define(function (require) {
  'use strict';

  const { add } = require('/module/server/add');
  const { subtract } = require('/module/server/subtract');

  return {
    add,
    subtract,
  };
});
