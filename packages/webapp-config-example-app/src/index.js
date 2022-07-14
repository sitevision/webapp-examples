;(function () {
   'use strict'

   var router = require('router'),
      imageRenderer = require('ImageRenderer'),
      appData = require('appData'),
      globalAppData = require('globalAppData')

   router.get('/', function (req, res) {
      var data = {
         image: appData.get('image', 'URI', 'displayName', 'creationDate', 'createdBy'),
         file: appData.get('file', 'URI', 'displayName', 'description'),
         page: appData.get('page', 'URI', 'displayName', 'published', 'publishDate'),
         renderedImage: getRenderedImage(),
         text: appData.get('text'),
         email: appData.get('email'),
         globalNumber: globalAppData.get('globalNumber'),
         number: appData.get('number'),
         numberSpinner: appData.get('numberSpinner'),
         textarea: appData.get('textarea'),
         metadata: appData.get('metadata'),
         template: appData.get('template'),
         checkbox: appData.get('checkbox'),
         checkboxBoolean: appData.get('checkboxBoolean'),
         singleSelection: appData.get('single'),
         multipleSelection: appData.get('multiple'),
         customSelection: appData.get('customSelection'),
      }

      res.render('/', data)
   })

   function getRenderedImage() {
      imageRenderer.update(appData.getNode('image'))

      return imageRenderer.render()
   }
})()
