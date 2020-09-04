define(function(require) {
   'use strict';

   var _ = require('underscore');

   var reducer = function(state, action) {
      switch (action.type) {
         case 'SET_ENTRIES':
            return _.extend({}, state, {query: action.query, entries: action.entries});
         default:
            return state;
      }
   }

   return reducer;
});