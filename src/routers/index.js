const express = require('express')
const router = express.Router()

const users = require('./users') 
const nilai = require('./nilai')
const mahasiswa = require('./mahasiswa') 

router.get('/', function (req, res) {
  res.json({
    status: 'API its works',
    message: 'Welcome ...!'
  })
})
router.use('/users', users) 
router.use('/nilai', nilai)
router.use('/mahasiswa', mahasiswa) 
module.exports = router
