define(function(require) {
   'use strict';

   var
      _          = require('underscore'),
      Component  = require('Component'),
      store      = require('store'),
      template   = require('/template/main');

   return Component.extend({

      template: template,

      events: {
         dom: {
            'click [data-update-name]': 'handleUpdateName'
         },
         self: {
            'state:changed': 'render'
         },
         store: 'handleStoreChange'
      },

      handleUpdateName: function() {
         store.dispatch({
            type: 'SET_NAME',
            name: this.$('[data-name]').val()
         });
      },

      handleStoreChange: function(newState) {
         this.setState(newState);
      },

      filterState: function(state) {
         return { name: state.name };
      }
   });
});
