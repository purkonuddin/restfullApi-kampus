// uploadController
require('dotenv').config()
const dosenModel = require('../models/dosenModel') 
const jwt = require('jsonwebtoken') 
const async = require('async')  
const helpers = require('../helpers/response')

const UploadController = async (req, res, next) => {
    try { 
        const respData = {
            object: 'mahasiswa',
            action: 'upload file',
            message:`upload success`, 
            result: req.body,
            file: req.body.file
        } 
        helpers.response(res, 200, respData)
    } catch (error) {
      console.log(error)
    }
}

module.exports = {
    uploadController: UploadController 
}