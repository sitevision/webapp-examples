define(function(require) {
   'use strict';
   
   var
      ListComponent = require('ListComponent');

   return ListComponent.extend({

      tagName: 'ul',

      className: 'env-list env-list-dividers--bottom',

      childProperty: 'entries',

      childComponentPath: 'Entry',

      filterState: function(state) {
         return { entries: state.entries };
      }
   });
});
