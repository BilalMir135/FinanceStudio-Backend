const multer = require('multer');
const upload = multer({ dest: __dirname + '/../../thinkfeeds/' }); //setting the default folder for multer

module.exports = upload;
