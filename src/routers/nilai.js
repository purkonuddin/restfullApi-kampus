const express = require('express');
const router = express.Router();
const {getArgJurusan, getArgMhsiswa, insertNilai, updateNilai, deleteNilai, getNilai} = require('../controllers/nilaiController');
const {validateNilai, validateUpdtNilai} = require('../helpers/nilaiMidleware');
const {isLoggedIn, isDosen} = require('../helpers/authMidleware');
const {getDataDosen} = require('../controllers/dosenControllers');

router.route('/')
    .post(isLoggedIn, isDosen, getDataDosen, validateNilai, insertNilai)
    .patch(isLoggedIn, isDosen, validateUpdtNilai, updateNilai)
    .delete(isLoggedIn, isDosen, deleteNilai)
    .get(getNilai);
router.route('/average-mahasiswa').get(getArgMhsiswa);
router.route('/average-jurusan').get(getArgJurusan);

module.exports = router
