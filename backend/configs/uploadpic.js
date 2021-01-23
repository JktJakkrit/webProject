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

const upload = multer({storage: setting_storage})

module.exports = upload

//  https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
//  https://medium.com/pnpsolution/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3-upload-%E0%B9%81%E0%B8%A5%E0%B8%B0-resize-%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-node-js-5ebb0f18f496