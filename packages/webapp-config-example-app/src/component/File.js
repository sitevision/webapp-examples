define(function(require) {
   'use strict';

   var
      Component     = require('Component'),
      template      = require('/template/file');

   return Component.extend({

      template: template,

      filterState: function(state) {
         return { file: state.file };
      }
   });
});
