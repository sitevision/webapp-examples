define(function(require) {
   'use strict';

   var
      Component      = require('Component'),
      entryTemplate  = require('/template/entry');

   return Component.extend({

      template: entryTemplate,

      tagName: 'li',

      className: 'env-list__item env-p-around--small'
   });
});
