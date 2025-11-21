import { v2 as cloudinary } from 'cloudinary'
import productModel from '../model/productModel.js'

// function to add products
const addProducts = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
        const uploadToCloudinary = (file, uniqueSuffix) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'image',
                        public_id: `${uniqueSuffix}-${file.originalname.split('.')[0]}` //custom name 
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                stream.end(file.buffer);
            });
        };

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const result = await uploadToCloudinary(item, uniqueSuffix);
                return result.secure_url;
            })
        )

        // Parse sizes safely


        const productData = await new productModel({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: sizes ? JSON.parse(sizes) : [],
            bestSeller: bestSeller == 'true' ? true : false,
            image: imagesUrl,
            date: Date.now()
        }).save()

        res.json({ success: true, message: "Product succesfully added" })


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }

}

//function to list products and display those in the front end 
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.status(200).json({ success: true, products })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}


//function to remove products 
const removeProducts = async (req, res) => {
    try {


        const product = await productModel.findByIdAndDelete(req.params.productId)

        console.log('Product found:', product ? 'Yes' : 'No')
        if (product) {
            console.log('Deleted product:', product.name)
        }

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        return res.status(200).json({ success: true, message: "Product successfully removed" })

    } catch (error) {
        console.log('Remove Error:', error.name, '-', error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

//function to select a product using its id 
const singleProducts = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await productModel.findById(productId)

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })

        }
        return res.status(200).json({ success: true, product })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }

}
export { listProducts, addProducts, singleProducts, removeProducts }

