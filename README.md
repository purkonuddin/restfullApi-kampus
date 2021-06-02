# restfullApi-kampus

# postman collection
https://www.getpostman.com/collections/46decaf5fd16f1be11a7
 

# end point
## register http://localhost:8000/api/v1/users/register
  
<code>
  {
    "role": "mahasiswa",
    "nama": "abdul",
    "email": "abd99@gmail.com",
    "password": "Pass12345",
    "alamat": "bogor, leuwiliang, cibeber 2", 
    "tanggal_lahir": "2011-06-05", 
    "jurusan": "Ipa"
}
</code>

## Post Login http://localhost:8000/api/v1/users/login
  
<code>
  {
    "email": "purkonud12119617@gmail.com",
    "password": "Pass123",
    "role": "dosen"
}
</code>

## Post Nilai http://localhost:8000/api/v1/nilai
  
<code>
  headers: {
    Authorization: Bearer Token
  }
  body:{
    "nim": "21622666873",
    "id_matkul": "Bad",
    "nilai": "79",
    "keterangan": "lulus" 
}
</code>


## Patch Nilai http://localhost:8000/api/v1/nilai?id=9
  
<code>
  headers: {
    Authorization: Bearer Token
  }
  body:{
    "nilai": "100"
  }
</code>

## Delete Nilai http://localhost:8000/api/v1/nilai?id=8
  
<code>
  headers: {
    Authorization: Bearer Token
  }
</code>


## Get Nilai http://localhost:8000/api/v1/nilai
  
<code><div>
  response status 200: {
    {
    "status": 200,
    "result": {
        "object": "nilai",
        "action": "get nilai ",
        "message": "success",
        "result": [
            {
                "nim": "12119617",
                "nama": "Mita",
                "jurusan": "IPA",
                "umur": 9,
                "dosen": "purkon",
                "nama_matkul": "Agama",
                "nilai": 76,
                "keterangan": "lulus"
            },
            {
                "nim": "12119617",
                "nama": "Mita",
                "jurusan": "IPA",
                "umur": 9,
                "dosen": "purkon",
                "nama_matkul": "Agama",
                "nilai": 76,
                "keterangan": "lulus"
            },
            {
                "nim": "12119617",
                "nama": "Mita",
                "jurusan": "IPA",
                "umur": 9,
                "dosen": "purkon",
                "nama_matkul": "Agama",
                "nilai": 76,
                "keterangan": "lulus"
            },
      dll...
 }</div>
</code>


## Get Average  http://localhost:8000/api/v1/nilai/average-mahasiswa
  
<code>
  response status 200: {
    {
    "status": 200,
    "result": {
        "object": "nilai",
        "action": "get average mahasiswa perjurusan ",
        "message": "success",
        "result": [
            {
                "nim": "21622666873",
                "nama": "abdul",
                "jurusan": "Ipa",
                "average_score": 64.2
            },
            {
                "nim": "21622666788",
                "nama": "alex",
                "jurusan": "Komputer",
                "average_score": 71.6
            },
            {
                "nim": "21622666818",
                "nama": "rahmat",
                "jurusan": "Komputer",
                "average_score": 66.2
            },
            {
                "nim": "21622666844",
                "nama": "rahma",
                "jurusan": "Ipa",
                "average_score": 86.6
            },
            {
                "nim": "12119617",
                "nama": "Mita",
                "jurusan": "Ipa",
                "average_score": 84.8
            },
            {
                "nim": "21622651591",
                "nama": "jklm",
                "jurusan": "Komputer",
                "average_score": 82.25
            }
        ]
    }
}
  }
</code>

## Get Average http://localhost:8000/api/v1/nilai/average-jurusan
  
<code>
  response 200: {
    {
    "status": 200,
    "result": {
        "object": "nilai",
        "action": "get average mahasiswa perjurusan ",
        "message": "success",
        "result": [
            {
                "nomor": 1,
                "nama_jurusan": "Ipa",
                "average_score": 78.5333
            },
            {
                "nomor": 2,
                "nama_jurusan": "Komputer",
                "average_score": 72.7143
            }
        ]
    }
}
  }
</code>

## post Upload file http://localhost:8000/api/v1/mahasiswa
  
<code>
  response 200: {
    "status": 200,
    "result": {
        "object": "mahasiswa",
        "action": "upload file",
        "message": "upload success",
        "result": {
            "file": "uploadfile-1622676709544-penutup_final.xls"
        },
        "file": "uploadfile-1622676709544-penutup_final.xls"
    }
}
</code>
<br/>
<code>
  response 400: {
    "status": 400,
    "message": "only xlsx|xls|csv are alowed"
}
</code>

