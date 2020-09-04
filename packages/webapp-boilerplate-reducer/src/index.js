(function() {
   'use strict';

   var
      router  = require('router');

   router.get('/', function(req, res) {
      res.render('/', {name: 'WebApp'});
   });
}());