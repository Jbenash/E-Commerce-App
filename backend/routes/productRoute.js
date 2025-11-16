import express from 'express'
import { listProducts, addProducts, singleProducts, removeProducts } from '../controller/productController.js'
import upload from '../middleware/multer.js'


const productRouter = express.Router()

productRouter.post('/add', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProducts)
//The current setup says: “Every product gets exactly 4 slots — front, back, side, detail.”
//thats why i have deifined exctly 4 slots of images 

productRouter.get('/list', listProducts)
productRouter.post('/remove', removeProducts)
productRouter.get('/single/:productId', singleProducts)

export default productRouter