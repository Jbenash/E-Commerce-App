import multer from 'multer'

const storage = multer.memoryStorage() // this will keep the files at buffer and helps to upload the files to the cloudinary 

const upload = multer({ storage })


export default upload