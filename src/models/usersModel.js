require('dotenv').config()
const db = require('../configs/db') 

const Insertuser = (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO kampus.users (user_id, email, password, role) VALUES ('${data.user_id}','${data.email}', '${data.password}', '${data.role}')`, (error, result) => {
          if (!error) {
              resolve(result)
          } else {
              reject(new Error(error))
          }
      })
    })
}

const Insertdosen = (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO kampus.dosen (nidn, nama) VALUES ('${data.user_id}', '${data.nama}')`, (error, result) => {
          if (!error) {
              resolve(result)
          } else {
              reject(new Error(error))
          }
      })
    })
}

const Insertmhs = (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO kampus.mahasiswa (nim, nama, alamat, tanggal_lahir, jurusan) VALUES ('${data.user_id}', '${data.nama}', '${data.alamat}', '${data.tanggal_lahir}', '${data.jurusan}')`, (error, result) => {
          if (!error) {
              resolve(result)
          } else {
              reject(new Error(error))
          }
      })
    })
}

const Insertuserdosen = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`BEGIN; 
        INSERT INTO kampus.users (user_id, email, password, role) VALUES ('${data.user_id}','${data.email}', '${data.password}', '${data.role}'); 
        INSERT INTO kampus.dosen (nidn, nama) VALUES ('${data.user_id}', '${data.name}'); 
        COMMIT;`, (error, result) => {
        if (!error) {
            resolve(result)
        } else {
            reject(new Error(error))
        }
    })
  })
} 

const Insertusermhs = (data) => {
    return new Promise((resolve, reject) => {
        const qry1 = 'BEGIN';
        const qry2 = ` INSERT INTO kampus.users (user_id, email, password, role) VALUES ('${data.user_id}','${data.email}', '${data.password}', '${data.role}')` 
        const qry3 = ` INSERT INTO kampus.mahasiswa (nim, nama, alamat, tanggal_lahir, jurusan) VALUES ('${data.user_id}', '${data.nama}', '${data.alamat}', '${data.tanggal_lahir}', '${data.jurusan}')`
        const qry4 = ' COMMIT';

        db.query(`${qry1} ${qry2} ${qry3} ${qry4}`, (error, result) => {
        if (!error) {
            resolve(result)
        } else {
            reject(new Error(error))
        }
      })
    })
}

const Login = (email, role) => {
    if(role === 'dosen') {
        return new Promise((resolve, reject) => {
            db.query(`Select u.user_id, u.email, u.password, u.role, d.nama, d.nidn
                from users u inner join dosen d
                on u.user_id = d.nidn
                WHERE u.email = '${email}'`, (error, result) => {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
    if (role === 'mahasiswa') {
        return new Promise((resolve, reject) => {
            db.query(`Select u.user_id, u.email, u.password, u.role, m.nama, m.alamat, m.tanggal_lahir, m.jurusan, m.nim, Date_format( From_Days( To_Days(Curdate()) - To_Days(m.tanggal_lahir) ), '%Y' ) + 0 AS umur
                from users u inner join mahasiswa m
                on u.user_id = m.nim
                WHERE u.email = '${email}'`, (error, result) => {
              if (!error) {
                resolve(result)
              } else {
                reject(new Error(error))
              }
            })
        })
    } 
}

module.exports = {
    insertuser: Insertuser,
    insertmhs: Insertmhs,
    insertdosen: Insertdosen,
    insertusermhs: Insertusermhs,
    insertuserdosen: Insertuserdosen,
    login: Login
}