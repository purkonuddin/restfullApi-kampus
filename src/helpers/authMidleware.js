require('dotenv').config()
const response = require('./response')
const jwt = require('jsonwebtoken')

const IsLoggedIn = (req, res, next) => { 
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(
      token,
      `${process.env.JWT_KEY}`
    )
    req.userData = decoded
    // console.log('asdsad',token, decoded,`${process.env.JWT_KEY}` );
    next()
  } catch (err) {
    response.customErrorResponse(res, 400, `Your session is not valid!${''}`)
  }
}

const IsDosen = (req, res, next) => {
  // console.log(req.userData);
  if (req.userData.role !== 'dosen') {
    helpers.customErrorResponse(res, 400, 'hanya dosen')
  }

  next()
}
  
module.exports = { 
    isLoggedIn: IsLoggedIn, 
    isDosen: IsDosen
}
  