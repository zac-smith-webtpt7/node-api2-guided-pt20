const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to our API',
    time: new Date(),
  })
})

module.exports = router
