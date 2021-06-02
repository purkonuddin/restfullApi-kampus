const express = require('express')
const router = express.Router()
const {postRegister, postLogin} = require('../controllers/userController')
const {validateRegister, validateLogin} = require('../helpers/usersMidleware')

router.route('/register').post(validateRegister, postRegister)
router.route('/login').post(validateLogin, postLogin)

module.exports = router
