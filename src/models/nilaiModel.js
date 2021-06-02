require('dotenv').config()
const db = require('../configs/db') 

const Insertnilai = (data) => {
    return new Promise((resolve, reject) => {
        const qry1 = `INSERT INTO kampus.nilai (nim, id_matkul, nidn, nilai, keterangan) VALUES ('${data.nim}', '${data.id_matkul}', '${data.nidn}', '${data.nilai}', '${data.keterangan}')`;

        db.query(`${qry1}`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(new Error(error))
            }
        })
    })
}

const Updatenilai = (data, params) => {
    return new Promise((resolve, reject) => {
        const qry1 = `UPDATE kampus.nilai SET nilai = '${data.nilai}' WHERE nilai.id = '${params.id}' && nilai.nidn = '${params.nidn}'`;

        db.query(`${qry1}`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(new Error(error))
            }
        })
    })
}

const Deletenilai = (params) => {
    return new Promise((resolve, reject) => {
        const qry1 = `DELETE FROM kampus.nilai WHERE nilai.id = '${params.id}' && nilai.nidn = '${params.nidn}'`;

        db.query(`${qry1}`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(new Error(error))
            }
        })
    })
}

const Getnilai = () => {
    return new Promise((resolve, reject) => {
        const qry1 = `SELECT n.nim, m.nama, m.jurusan, Date_format( From_Days( To_Days(Curdate()) - To_Days(m.tanggal_lahir) ), '%Y' ) + 0 AS umur, d.nama AS dosen, mk.nama AS nama_matkul, n.nilai, n.keterangan FROM nilai n INNER JOIN mahasiswa m ON n.nim = m.nim INNER JOIN dosen d ON d.nidn = n.nidn INNER JOIN mata_kuliah mk ON mk.id_matkul = n.id_matkul WHERE n.nilai >= '65' ORDER BY n.id_matkul, n.nim DESC`;

        db.query(`${qry1}`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(new Error(error))
            }
        })
    })
}

const AverageScoreMahasiswa = ()=>{
    return new Promise((resolve, reject)=>{
        const qry = 'SELECT n.nim, m.nama, m.jurusan, AVG(n.nilai) AS average_score FROM nilai n INNER JOIN mahasiswa m ON n.nim = m.nim GROUP BY n.nim ORDER BY n.id_matkul'
        db.query(`${qry}`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(new Error(error))
            }
        })
    })
}

const AverageScoreJurusan = ()=>{
    return new Promise((resolve, reject)=>{
        const qry = 'SELECT @no:=@no+1 AS nomor, m.jurusan AS nama_jurusan, AVG(n.nilai) AS average_score FROM nilai n INNER JOIN mahasiswa m ON n.nim = m.nim ,(SELECT @no:= 0) AS no GROUP BY m.jurusan ORDER BY m.jurusan'
        db.query(`${qry}`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(new Error(error))
            }
        })
    })
}

module.exports = {
    insertNilai: Insertnilai,
    updateNilai: Updatenilai,
    deleteNilai: Deletenilai,
    getNilai: Getnilai,
    averageScoreMahasiswa: AverageScoreMahasiswa, 
    averageScoreJurusan: AverageScoreJurusan
}