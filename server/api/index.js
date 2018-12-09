const { Router } = require('express')
const router = Router()

const riddles = require('./riddles')

router.use('/riddles', riddles)

module.exports = router
