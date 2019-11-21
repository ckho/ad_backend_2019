import multer from 'multer';

var storage = multer.memoryStorage();

var upload = multer({storage: storage, fileSize: 20000000, files: 1});

export default upload;
