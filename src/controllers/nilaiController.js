const nilaiModel = require('../models/nilaiModel') 
const jwt = require('jsonwebtoken') 
const async = require('async')  
const helpers = require('../helpers/response')

const GetArgJurusan = async(req, res)=>{
    try {
        const avrgJurusan = nilaiModel.averageScoreJurusan()
        avrgJurusan.then((respon)=>{
            if (respon.length >= 0) {
                const data = {
                    object: 'nilai',
                    action: 'get average mahasiswa perjurusan ',
                    message:`success`, 
                    result:respon
                }
                helpers.response(res, 200, data)
            } 
            helpers.customErrorResponse(res, 400, 'gagal delete')
        }).catch(err=> new Error(err))
    } catch (error) {
        throw error
    }
}
const GetArgMhsiswa = async(req, res)=>{
    try { 
        const avrgMhs = nilaiModel.averageScoreMahasiswa()
        avrgMhs.then((respon)=>{
            if (respon.length >= 0) {
                const data = {
                    object: 'nilai',
                    action: 'get average mahasiswa perjurusan ',
                    message:`success`, 
                    result:respon
                }
                helpers.response(res, 200, data)
            } 
            helpers.customErrorResponse(res, 400, 'gagal delete')
        }).catch(err=> new Error(err))
    } catch (error) {
        throw error
    }
}
const InsertNilai = async(req, res)=>{
    try {
        const dataNilai = {
            nim: req.body.nim, 
            id_matkul: req.body.id_matkul, 
            nidn: req.userData.user_id, 
            nilai: req.body.nilai,
            keterangan: req.body.keterangan 
        }
        const simpan = nilaiModel.insertNilai(dataNilai)
        simpan.then((respon)=>{
            if (respon.affectedRows === 1) {
                const data = {
                    object: 'nilai',
                    action: 'insert',
                    message:`success`, 
                    result:respon
                }
                helpers.response(res, 200, data)
            }
            helpers.customErrorResponse(res, 400, 'gagal menyimpan')
        }).catch(err=> new Error(err))
    } catch (error) {
        throw error
    }
}
const UpdateNilai = async(req, res)=>{
    try {
        const paramsSet = {
            id: req.query.id,
            nidn: req.userData.user_id
        }
        const dataNilai = { 
            nilai: req.body.nilai 
        }
        const simpan = nilaiModel.updateNilai(dataNilai, paramsSet)
        simpan.then((respon)=>{
            if (respon.affectedRows === 1 && respon.changedRows === 1) {
                const data = {
                    object: 'nilai',
                    action: 'update',
                    message:`success`, 
                    result:respon
                }
                helpers.response(res, 200, data)
            }
            helpers.customErrorResponse(res, 400, 'gagal update')
        }).catch(err=> new Error(err))
    } catch (error) {
        throw error
    }
}
const DeleteNilai = async(req, res)=>{
    try {
        const paramsSet = {
            id: req.query.id,
            nidn: req.userData.user_id
        } 
        const simpan = nilaiModel.deleteNilai(paramsSet)
        simpan.then((respon)=>{
            if (respon.affectedRows === 1) {
                const data = {
                    object: 'nilai',
                    action: 'delete',
                    message:`success`, 
                    result:respon
                }
                helpers.response(res, 200, data)
            }
            helpers.customErrorResponse(res, 400, 'gagal delete')
        }).catch(err=> new Error(err))
    } catch (error) {
        throw error
    }
}
const GetNilai = async(req, res)=>{
    try { 
        const simpan = nilaiModel.getNilai()
        simpan.then((respon)=>{
            // console.log(respon);
            if (respon.length >= 1) {
                const data = {
                    object: 'nilai',
                    action: 'get nilai ',
                    message:`success`, 
                    result:respon
                }
                helpers.response(res, 200, data)
            }
            helpers.customErrorResponse(res, 400, 'gagal delete')
        }).catch(err=> new Error(err))
    } catch (error) {
        throw error
    }
}

module.exports = {
    getArgJurusan: GetArgJurusan, 
    getArgMhsiswa: GetArgMhsiswa, 
    insertNilai: InsertNilai, 
    updateNilai: UpdateNilai, 
    deleteNilai: DeleteNilai, 
    getNilai: GetNilai
}