define(function(require) {
   'use strict';

   var
      Component     = require('Component'),
      template      = require('/template/image');

   return Component.extend({

      template: template,

      filterState: function(state) {
         return { image: state.image };
      }
   });
});
