import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { FiTrash2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const { products, currency, cartItems, updateQuantity } = useContext(ShopContext)
    const [cartData, setCartData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const tempData = []
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        id: items,
                        size: item,
                        quantity: cartItems[items][item],
                    })
                }
            }
        }
        setCartData(tempData)
    }, [cartItems])
    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />

            </div>
            <div>
                {
                    cartData.map((item, index) => {
                        const productData = products.find((prod) => prod._id === item.id)
                        return (
                            <div className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4' key={index}>
                                <div className='flex items-start gap-6'>
                                    <img className='w-16 sm:w-20' src={productData.images[0]} alt="" />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                        <div className='flex items-center gap-5 mt-2'>
                                            <p>{currency} {productData.price}</p>
                                            <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.size, Number(e.target.value))}
                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center'
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />
                                <FiTrash2
                                    onClick={() => updateQuantity(item.id, item.size, 0)}
                                    className='w-4 mr-4 sm:w-5 cursor-pointer hover:text-red-500 transition-colors'
                                />
                            </div>
                        )
                    })
                }
            </div>

            {/* Cart Total Section */}
            {cartData.length > 0 && (
                <div className='flex justify-end my-20'>
                    <div className='w-full sm:w-[450px]'>
                        <CartTotal />
                        <div className='w-full text-end'>
                            <button
                                onClick={() => navigate('/place-order')}
                                className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 transition-colors'
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
