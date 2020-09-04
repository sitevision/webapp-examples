(function () {
  'use strict';

  const router = require('router');
  const appData = require('appData');
  const { add } = require('/module/server/add');

  router.get('/', (req, res) => {
    const message = 'Hello, world!';
    const name = appData.get('name');

    res.render('/', {
      message,
      name,
      result: add(3, 7),
    });
  });
})();
