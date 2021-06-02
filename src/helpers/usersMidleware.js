const response = require('./response')
const jwt = require('jsonwebtoken')
const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/
const regexField = /^\w+([ ]?\w+)+$/

const ValidateRegister = (req, res, next) => {
    const validateEmailReg = regexEmail.test(req.body.email)
    const validateStringReg = regexField.test(req.body.nama)
    const validatePasswordReg = regexPassword.test(req.body.password)
    const {password, email, nama, role, alamat, tanggal_lahir, jurusan} = req.body
   
    if (!nama || nama.length < 3 || !validateStringReg) {
        response.customErrorResponse(res, 400, 'Please enter a name with min. 3 chars without single quote')
    } else if (!email || !validateEmailReg) {
        response.customErrorResponse(res, 400, 'Please enter a valid email')
    } else if (!password || !validatePasswordReg) {
        response.customErrorResponse(res, 400, 'gunakan alpha numeric, 1 uppercase, 1 lowercase, min 6 character')
    } else if (!role) {
        response.customErrorResponse(res, 400, 'role "dosen/mahasiswa"')
    } else if (role === 'mahasiswa' && (!alamat || alamat.length < 5 || alamat.length > 255)) {
        response.customErrorResponse(res, 400, 'Please enter valid alamat')
    } else if (role === 'mahasiswa' && (!tanggal_lahir && tanggal_lahir instanceof Date && !isNaN(tanggal_lahir.valueOf()))) {
        response.customErrorResponse(res, 400, 'Please enter a valid birth date')
    } else if (role === 'mahasiswa' && (!jurusan)) {
        response.customErrorResponse(res, 400, 'this fiel is required')
    } else {
      next()
    }
};

const ValidateLogin = (req, res, next) => {
    const {email, password} = req.body
    const validateEmailReg = regexEmail.test(email)
    if (!email || !validateEmailReg) {
        response.customErrorResponse(res, 400, 'Please enter a valid email')
    }
    if (!password) {
        response.customErrorResponse(res, 400, 'Please enter a valid password')
    }
    next()
};

module.exports = {
    validateRegister: ValidateRegister,
    validateLogin: ValidateLogin
  }