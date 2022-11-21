;(() => {
   const router = require('router')

   router.get('/', (req, res) => {
      res.render({
         selectValues: ['value1', 'value2', 'value3', 'value4']
      })
   })
})()
