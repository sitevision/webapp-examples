;(() => {
   const router = require('router')

   router.get('/', (req, res) => {
      res.render({
         selectValues: {
            value1: 'Value 1',
            value2: 'Value 2',
            value3: 'Value 3',
            value4: 'Value 4'
         }
      })
   })
})()
