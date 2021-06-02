const multer = require('multer');
const response = require('./response');

const SingleFile = (req, res, next) => {
    global.__basedir = __dirname;
    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, 'src/assets')
        },
        filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
        }
    });

    const multerFilter = (req, file, cb) => {
        let allowedExtensions = new RegExp(/.(xlsx|xls|csv)$/gi)
        const ext = allowedExtensions.test(file.originalname)
        console.log('ext ***',ext);
        if (ext===false) {
            response.customErrorResponse(res, 400, `only xlsx|xls|csv are alowed`)
        } else {
          cb(null, true)
        }
    }

    const upload = multer({storage: storage, fileFilter: multerFilter});
    try {
        const uploadXls= upload.single("uploadfile");
        uploadXls(req, res, err => {
            if (err) {
            return res.send(err)
            }
            let xlsFile = ''
            if (req.file === undefined) {
                xlsFile = ""
            } else {
                xlsFile = `${req.file.filename}`
            }
            req.body.file = xlsFile 
    
            next()
        }) 
    } catch (error) {
        throw error
    }
    
}


module.exports = {
    uploadMidleware: SingleFile 
}