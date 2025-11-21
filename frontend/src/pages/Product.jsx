import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { FiStar } from 'react-icons/fi'
import RelatedProducts from '../components/RelatedProducts'
import { toast } from 'react-toastify'

const Product = () => {

    const { productId } = useParams()
    const { products, currency, addToCart } = useContext(ShopContext)
    const [productData, setProductData] = useState(null)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')

    const handleAddToCart = () => {
        if (!size) {
            toast.error('Please select a size first!')
            return
        }
        addToCart(productData._id, size)
        toast.success('Product added to cart!')
    }

    const fetchProductData = () => {
        const product = products.find((item) => item._id === productId)
        if (product) {
            setProductData(product)
            setImage(product.image?.[0] || '')
            setSize('')
        }
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProductData()
        }
        window.scrollTo(0, 0)
    }, [productId, products])

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product Details */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

                {/* Product Images */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {
                            productData.image?.map((item, index) => (
                                <img
                                    onClick={() => setImage(item)}
                                    src={item}
                                    alt=""
                                    key={index}
                                    className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer'
                                />
                            ))
                        }
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={image} alt={productData.name} className='w-full h-auto' />
                    </div>
                </div>

                {/* Product Info */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <FiStar className='w-3.5 text-yellow-500 fill-yellow-500' />
                        <FiStar className='w-3.5 text-yellow-500 fill-yellow-500' />
                        <FiStar className='w-3.5 text-yellow-500 fill-yellow-500' />
                        <FiStar className='w-3.5 text-yellow-500 fill-yellow-500' />
                        <FiStar className='w-3.5 text-gray-300' />
                        <p className='pl-2 text-sm text-gray-600'>(122 reviews)</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
                    <p className='mt-5 text-gray-600 md:w-4/5'>{productData.description}</p>

                    {/* Size Selection */}
                    <div className='flex flex-col gap-4 my-8'>
                        <p className='font-medium'>Select Size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`border py-2 px-4 bg-gray-100 hover:bg-gray-200 transition-colors ${item === size ? 'border-orange-500 bg-orange-100' : 'border-gray-300'}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button onClick={handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-gray-800 transition-colors'>
                        ADD TO CART
                    </button>

                    <hr className='mt-8 sm:w-4/5' />

                    {/* Additional Info */}
                    <div className='text-sm text-gray-600 mt-5 flex flex-col gap-1'>
                        <p>✓ 100% Original product.</p>
                        <p>✓ Cash on delivery is available on this product.</p>
                        <p>✓ Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description & Reviews */}
            <div className='mt-20'>
                <div className='flex'>
                    <p className='border px-5 py-3 text-sm font-medium'>Description</p>
                    <p className='border px-5 py-3 text-sm text-gray-600'>Reviews (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
                    <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </div>
            </div>
            {/* Related Products Section */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='text-center'>
                <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
                <p className='mt-4 text-gray-600'>Loading product...</p>
            </div>
        </div>
    )
}

export default Product
