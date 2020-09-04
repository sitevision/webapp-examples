define(function(require) {
   'use strict';

   var
      searcherBuilder     = require('SearcherBuilder'),
      UGC_INDEX           = require('IndexUtil.IndexType.UGC'), 
      indexUtil           = require('IndexUtil'),
      resourceLocatorUtil = require('ResourceLocatorUtil'),
      buddyIconRenderer   = require('BuddyIconRenderer'),
      properties          = require('Properties');

   return {
      getEntries: function(query) {
         var entries = [],
            searchResult = searcherBuilder
               .setIndex(indexUtil.getDefaultIndex(UGC_INDEX))
               .build()
               .search(query + '*', 10);
         
         if (searchResult.hasHits()) {
            var hits = searchResult.getHits(), 
               hit;

            while (hits.hasNext()) {
               hit = hits.next();

               var authorId = hit.getField('author'),
                  author = resourceLocatorUtil.getNodeByIdentifier(authorId);

               buddyIconRenderer.update(author);

               entries.push({
                  author: properties.get(author, 'displayName'),
                  entryText: hit.getField('summary'),
                  buddyIcon: buddyIconRenderer.render()
               });
            }
         }

         return entries;
      }
   };
});