const express = require('express')
const router = express.Router() 
const {uploadMidleware} = require('../helpers/uploadMidleware')
const {isLoggedIn, isDosen} = require('../helpers/authMidleware') 
const {uploadController}= require('../controllers/mahasiswaController')

router.route('/').post(isLoggedIn, isDosen, uploadMidleware, uploadController);

module.exports = router
