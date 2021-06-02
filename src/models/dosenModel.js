require('dotenv').config()
const db = require('../configs/db') 

const GetProfile = (data) => {
    return new Promise((resolve, reject) => {
        const qry1 = `SELECT * FROM kampus.dosen WHERE nidn = '${data}'`;

        db.query(`${qry1}`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(new Error(error))
            }
        })
    })
}

module.exports = {
    getProfile: GetProfile 
}