require('dotenv').config()
const usersModel = require('../models/usersModel') 
const jwt = require('jsonwebtoken') 
const async = require('async')  
const helpers = require('../helpers/response')

const PostRegister = async(req, res)=>{
    try {
        let insertuser;
        let insertrole;
        const date = new Date();
        const seconds = date.getTime() / 1000; //1440516958
        const {nama, email, password, role} = req.body;
        const userid = role === 'dosen' ? `1${seconds.toString().slice(0,10)}` : `2${seconds.toString().slice(0,10)}`
        const datauser = {
            user_id: userid,
            email: email,
            password: password,
            role: role, 
            nama: nama
        }
        const [resUser] = await Promise.all([
            usersModel.insertuser(datauser) 
        ])
        if (resUser.affectedRows === 1) {
            if (role === "dosen") {
                const datadosen = {
                    user_id: userid,
                    email: email,
                    password: password,
                    role: role, 
                    nama: nama
                }
                const resDosen = usersModel.insertdosen(datadosen)
                resDosen.then((response)=>{
                    // console.log('dosen',response);
                    if (response.affectedRows === 1) {
                        const responData = {
                            object:'users',
                            action: 'insert',
                            message: `data berhasil di tambahkan`,
                            data: response,
                            id: response.insertId,
                            user_id: userid,
                        }
                        helpers.response(res, 200, responData)
                    } else { 
                        helpers.customErrorResponse(res, 400, 'gagal meyipan user')
                    }
                }).catch(err => new Error(err))  
            } else {
                const {alamat, tanggal_lahir, jurusan} = req.body;
                const datamahasiswa = {
                    user_id: userid,
                    email: email,
                    password: password,
                    role: role, 
                    nama: nama,
                    alamat: alamat,
                    tanggal_lahir: tanggal_lahir,
                    jurusan: jurusan
                }
                const resMhs =  usersModel.insertmhs(datamahasiswa)
                resMhs.then((response)=>{
                    // console.log(response);
                    if (response.affectedRows === 1) {
                        const respData = {
                            object: 'users',
                            action: 'insert',
                            message:`data berhasil di tambahkan`,
                            data: response,
                            id: response.insertId,
                            user_id: userid 
                        } 
                        helpers.response(res, 200, respData)
                    }else{
                        helpers.customErrorResponse(res, 400, 'gagal meyipan user')
                    }
                }).catch(err => new Error(err)) 
            }
        } else {
            helpers.customErrorResponse(res, 400, 'gagal meyipan user')
        } 
    } catch (error) {
        helpers.customErrorResponse(res, 305, 'gunakan email yang lain')
    }
}

const PostLogin = async(req, res, next)=>{
    try {
        const {email, password, role} = req.body; 
        const [results] = await Promise.all([
            usersModel.login(email, role)
        ])
        // console.log(email, password, role, results);
        if (results.length <= 0) {
            helpers.customErrorResponse(res, 400, `Email ${email} belum terdaftar!`)
        } else {
            if (results[0].password !== password) {
                helpers.customErrorResponse(res, 400, 'Password is incorrect!')
            } else {
                let userData;
                if (results[0].role === 'dosen') {
                    userData = {
                        user_id: results[0].user_id,
                        nidn: results[0].nidn,
                        nama: results[0].nama,
                        email: results[0].email 
                    }
                }
                if(results[0].role === 'mahasiswa'){
                    userData = {
                        user_id: results[0].user_id,
                        nim: results[0].nim,
                        nama: results[0].nama,
                        email: results[0].email,
                        alamat: results[0].alamat,
                        tanggal_lahir:results[0].tanggal_lahir,
                        jurusan: results[0].jurusan,
                        umur: results[0].umur
                    }
                } 
                const token = jwt.sign({password, email, role, user_id:userData.user_id}, `${process.env.JWT_KEY}`, { expiresIn: '7d' }) 
                delete req.body.password 
                delete req.body.role
                delete req.body.email
                // next()
                const respData = {
                    object: 'users',
                    action: 'login',
                    message:`login success`,
                    token:token,
                    data: userData
                } 
                helpers.response(res, 200, respData)
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    postRegister: PostRegister, 
    postLogin: PostLogin
}