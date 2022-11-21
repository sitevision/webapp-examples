;(function () {
   'use strict'

   const _ = require('underscore'),
      router = require('router'),
      properties = require('Properties'),
      appData = require('appData'),
      globalAppData = require('globalAppData')

   router.get('/', function (req, res) {
      res.render('/', {
         globalNumber: globalAppData.get('globalSetting'),

         text: appData.get('text'),
         email: appData.get('email'),
         textarea: appData.get('textarea'),
         radio: appData.get('radio'),
         checkbox: appData.get('checkbox'),
         single: appData.get('single'),
         multiple: appData.get('multiple'),

         styledRadio: appData.get('styled-radio'),
         styledCheckbox: appData.get('styled-checkbox'),
         checkboxBoolean: appData.get('checkboxBoolean'),
         numberSpinner: appData.get('numberSpinner'),
         customSelect: appData.get('customSelect'),

         page: appData.get('page', 'displayName', 'published', 'publishDate', 'URI'),
         content: appData.get('content', 'displayName'),
         link: appData.get('link', 'displayName', 'URI'),
         metadata: appData.get('metadata', 'displayName'),
         template: appData.get('template', 'displayName'),

         pages: _.map(appData.getArray('pages'), (page) => {
            return properties.get(page, 'displayName', 'URI')
         }),
         images: _.map(appData.getArray('images'), (image) => {
            return properties.get(image, 'displayName', 'creationDate', 'URL')
         })
      })
   })
})()
