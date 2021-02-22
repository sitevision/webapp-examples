define(function(require) {
   'use strict';

   var
      Component     = require('Component'),
      template      = require('/template/page');

   return Component.extend({

      template: template,

      filterState: function(state) {
         return { page: state.page };
      }
   });
});
