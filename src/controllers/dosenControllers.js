require('dotenv').config()
const dosenModel = require('../models/dosenModel') 
const jwt = require('jsonwebtoken') 
const async = require('async')  
const helpers = require('../helpers/response')

const GetDataDosen = async (req, res, next) => {
    try { 
      const userId = req.userData.user_id
      const [results] = await Promise.all([
        dosenModel.getProfile(userId)
      ])
      console.log('GetDataDosen',results[0]);
      req.body.object = 'user'
      req.body.action = 'get my profile data'
      req.dosenProfile = results[0]
  
      next()
    } catch (error) {
      console.log(error)
    }
}

module.exports = {
    getDataDosen: GetDataDosen 
}