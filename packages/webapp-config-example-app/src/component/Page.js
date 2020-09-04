define(function(require) {
   'use strict';

   var
      _             = require('underscore'),
      Component     = require('Component'),
      template      = require('/template/page');

   return Component.extend({

      template: template,

      filterState: function(state) {
         return _.extend({}, {page: state.page});
      }
   });
});