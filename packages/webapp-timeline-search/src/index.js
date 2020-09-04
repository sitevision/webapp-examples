(function() {
   'use strict';

   var 
      router               = require('router'),
      appData              = require('appData'),
      searchModule         = require('/module/server/searchModule');

   router.get('/', function(req, res) {
      var data = {
         entries: [],
         buttonText: appData.get('buttonText'),
         query: ''
      };

      res.render('/', data);
   });

   router.get('/search', function(req, res) {
      var query = req.params.query,
         entries = searchModule.getEntries(query);

      if (req.xhr) {
         res.json({entries: entries});
      } else {
         res.render('/search', {
            entries: entries,
            buttonText: appData.get('buttonText'),
            query: query
         });
      }
   });
}());