define(function(require) {
   'use strict';

   var _ = require('underscore');

   var reducer = function(state, action) {
      switch (action.type) {
         case 'SET_NAME':
            return _.extend({}, state, {name: action.name});
         default:
            return state;
      }
   }

   return reducer;
});