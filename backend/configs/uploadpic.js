const path = require('path');
const multer = require('multer')

let path_pic = process.cwd() + path.sep + 'public' + path.sep;
const setting_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_pic)
    },
    filename: function (req, file, cb) {
        let lastNameFile = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, lastNameFile) + '-' + Date.now() + lastNameFile)
    }
})
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({storage: setting_storage, fileFilter: imageFilter})

module.exports = upload

//  https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/