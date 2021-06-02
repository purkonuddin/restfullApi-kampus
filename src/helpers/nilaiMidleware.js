const response = require('./response')

const ValidateNilai = (req, res, next) => {
    const {nim, id_matkul, nilai, keterangan} = req.body
    if (!nilai || isNaN(nilai)) {
        response.customErrorResponse(res, 400, 'Please enter a nilai')
    }
    if (!nim || isNaN(nim)) {
        response.customErrorResponse(res, 400, 'Please enter a nim')
    }
    if (!id_matkul) {
        response.customErrorResponse(res, 400, 'Please enter a id_matkul')
    }
    if (!keterangan || (keterangan !== "lulus" && keterangan !== "belum lulus")) {
        response.customErrorResponse(res, 400, 'Please enter a valid keterangan (belum lulus, lulus)')
    }
    next()
};

const ValidateUpdtNilai = (req, res, next) => {
    const {nilai} = req.body
    const {id} = req.query
    if (!nilai || isNaN(nilai)) {
        response.customErrorResponse(res, 400, 'Please enter a nilai')
    } 
    if (!id) {
        response.customErrorResponse(res, 400, 'Please enter a id')
    } 
    next()
};


module.exports = { 
    validateNilai: ValidateNilai,
    validateUpdtNilai: ValidateUpdtNilai
}