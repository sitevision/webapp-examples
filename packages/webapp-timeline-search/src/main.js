define(function(require) {
   'use strict';

   var
      Component  = require('Component'),
      requester  = require('requester'),
      router     = require('router'),
      store      = require('store'),
      template   = require('/template/main');

   return Component.extend({

      template: template,

      events: {
         dom: {
            'submit form': 'handleSearch'
         },
         router: {
            'query:changed:query': 'getEntries'
         },
         self: {
            'state:changed': 'render'
         },
         store: 'handleStoreChange'
      },

      getEntries: function(options) {
         var query = options.queryParams.query;

         if (!query) {
            store.dispatch({
               type: 'SET_ENTRIES',
               entries: [],
               query: ''
            });

            return;
         }

         requester.doGet({
            url: options.url,
            context: this
         }).done(function(response) {
            store.dispatch({
               type: 'SET_ENTRIES',
               entries: response.entries,
               query: query
            });
         });
      },

      handleSearch: function(e) {
         e.preventDefault();

         router.navigate(e.currentTarget.action, {
            queryParams: {
               query: this.$('input[name=query]').val()
            }
         });
      },

      handleStoreChange: function(newState) {
         this.setState(newState);
      },

      filterState: function(state) {
         return { 
            query: state.query, 
            buttonText: state.buttonText
         };
      }
   });
});
