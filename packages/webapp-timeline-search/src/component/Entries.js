define(function(require) {
   'use strict';
   
   var
      _             = require('underscore'), 
      ListComponent = require('ListComponent');

   return ListComponent.extend({

      tagName: 'ul',

      className: 'env-list env-list-dividers--bottom',

      childProperty: 'entries',

      childComponentPath: 'Entry',

      filterState: function(state) {
         return _.extend({}, {entries: state.entries});
      }
   });
});