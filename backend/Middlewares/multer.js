const multer = require('multer');

const storage = multer.diskStorage({
    destination: (res, file, cb) => cb(null, './photo'),
    filename: (res, file, cb) => cb(null, Date.now() + file.originalname)
})

module.exports = multer({storage})