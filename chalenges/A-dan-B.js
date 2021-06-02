function convertInt(params) {
    // return 9 jam 60 menit 60 detik
    const date = new Date(null);
    date.setSeconds(params);
    const arrWaktu = date.toISOString().substr(11, 8);
    const convert = arrWaktu.split(":"); 
    return `${convert[0]} jam ${convert[1]} menit ${convert[2]} detik`
}

/**
 * A. convert int to time
 */
const data = convertInt(10000);
console.log(data); //02 jam 46 menit 40 detik

/**
 * B. database mysql, 
 * buat database 
 * 
 * */
 const qryB1 = 'CREATE DATABASE kampus';
 /** 
 * buat tabel serta ERD (type data, key, relasi one to many, relasi many to many, dsb)
 * 
 * tabel {
 *      users {id, email, password, role(mahasiswa/dosen)}
 *      mahasiswa {nim, nama, alamat, tanggal_lahir, jurusan}
 *      dosen {nidn, nama}
 *      mata_kuliah {id, nama}
 *      nilai {id, nim, id_matkul, nidn, nilai, keterangan(lulus/belum lulus)}
 * } 
 * 
 * b.1. buat syntax sql create database,  dan table
 * */
  const qryB11 = "CREATE TABLE `kampus`.`users` ( `id` INT NOT NULL AUTO_INCREMENT , `user_id` VARCHAR(255), `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `role` ENUM('mahasiswa','dosen','','') NOT NULL , PRIMARY KEY (`id`), UNIQUE (`email`))";
  const qryB12 = "CREATE TABLE `kampus`.`mahasiswa` ( `id` INT NOT NULL AUTO_INCREMENT , `nim` VARCHAR(255) NOT NULL , `nama` VARCHAR(255) NOT NULL , `alamat` TEXT NOT NULL , `tanggal_lahir` DATE NOT NULL , `jurusan` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`nim`))";  
  const qryB13 = "CREATE TABLE `kampus`.`dosen` ( `id` INT NOT NULL AUTO_INCREMENT , `nidn` VARCHAR(255) NOT NULL , `nama` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`nidn`))";
  const qryB14 = "CREATE TABLE `kampus`.`mata_kuliah` ( `id` INT NOT NULL AUTO_INCREMENT , `id_matkul` VARCHAR(255) NOT NULL , `nama` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`nama`))";
  const qryB15 = "CREATE TABLE `kampus`.`nilai` ( `id` INT NOT NULL AUTO_INCREMENT , `nim` VARCHAR(255) NOT NULL , `id_matkul` INT NOT NULL , `nidn` VARCHAR(255) NOT NULL , `nilai` INT NOT NULL , `keterangan` ENUM('lulus','belum lulus','','') NOT NULL , PRIMARY KEY (`id`))";
  
/** b.2. buat syntax sql insert */
const b21 = "dibawah ini sintak untuk insert data user dan dosen";
/*
    BEGIN;
    INSERT INTO `users` (`user_id`, `email`, `password`, `role`) VALUES ('20210601','purkonud12119617@gmail.com', 'Pass123', 'dosen');
    INSERT INTO `dosen` (`nidn`, `nama`) VALUES ('20210601', 'purkon');
    COMMIT;
*/
const b22 = "dibawah ini sintak untuk insert data user dan mahasiswa";
/*
    BEGIN;
    INSERT INTO `users` (`user_id`, `email`, `password`, `role`) VALUES ('12119617','purkonud12119618@gmail.com', 'Pass123', 'mahasiswa');
    INSERT INTO `mahasiswa` (`nim`, `nama`, `alamat`, `tanggal_lahir`, `jurusan`) VALUES ('12119617', 'Mita', 'Kp. pasir desa konoha', '2011-06-05', 'IPA');
    COMMIT;
*/

const b23 = "INSERT INTO `mata_kuliah` (`id_matkul`,`nama`) VALUES ('Aga', 'Agama'), ('Bad', 'Basis Data')";

const b24 = "INSERT INTO `nilai` (`nim`, `id_matkul`, `nidn`, `nilai`, `keterangan`) VALUES ('12119617', 'Aga', '20210601', '75', 'lulus')";

 /** b.3.1 buat syntaq sql select {*, umur*} data mahasiswa (*umur dari tanggal_lahir) */

const b31 = "SELECT `nim`,`nama`,`alamat`,`tanggal_lahir`,`jurusan`, Date_format( From_Days( To_Days(Curdate()) - To_Days(tanggal_lahir) ), '%Y' ) + 0 AS umur FROM `mahasiswa`";
 
 /** b.3.3 buat syntaq sql select {*} data dosen*/
const b33 = "SELECT * FROM `dosen`"
 
 /**  b.3.4 buat syntaq sql select {*} data matakuliah*/
const b34 = "SELECT * FROM `mahasiswa`";
 
/** b.3.5 buat syntaq sql select {*} data nilai (dengan filter nilai >= 75,  sort besar ke kecil)*/
const b35 = "SELECT * FROM `nilai` WHERE `nilai` >= 65 ORDER BY id_matkul, nim DESC";



/**
 * C. rest API
 * 1.1. register/, post(, ()=>{
 *      if email tdk terdaftar
 *          data di input ke tbl user dan mahasiswa/dosen
 *          return success
 *      return denied
 * })
 * 
 * 1.2. login/, post(, ()=>{
 *      return token JWT
 * })
 * 
 * 2.1.1 nilai/, .post((if users.role === dosen ? next), validasi body, req,res)=>{
 *              data = {
 *                  nilai: req.body.nilai
 *                  mahasiswa: req.body.mahasiswa
 *                  dosen: req.body.dosen
 *                  matakuliah: req.body.matakuliah
 *              }
 *              insert data nilai
 *              if(insert)  return 200 : return 
 * 2.1.2 nilai/, .patch((if users.role === dosen ? next), validasi body, req,res)=>{
 *              idnilai = req.query.idnilai
 *              data = {
 *                  nilai: req.body.nilai 
 *              }
 *              update nilai
 *              if(update)  return 200 : return 
 *                  
 * 2.1.3 nilai/,.delete( (if users.role === dosen ? next), validasi body, (req,res)=>{
 *              idnilai = req.query.idnilai
 *              delete nilai
 *              if(delete)  return 200 : return 
 * 
 * 3.1. nilai/,.get(()=>{
 *              return {nim, nama, jurusan, umur, dosen, nama_matkul, nlai, keterangan}
 *         })
 * 
 * 4.1. nilai_rata_rata_tiap_mahasiswa/, .get(()=>{
 *              return {nim, nama, jurusan, average_score}
 *          })
 * 
 * 5.1. nilai rata-rata tiap jurusan/, .get(()=>{
 *          return {id, nama_jurusan, average_score}
 * })
 * 
 * 6.1. mahasiswa/, .post((if users.role === dosen ? next), upload file xlsx/xls/csv, ()=>{
 *              simpan file
 * })
 * 
 */