import React, { useContext, useState } from 'react'
import Title from '../components/Title.jsx'
import CartTotal from '../components/CartTotal.jsx'
import { ShopContext } from '../context/ShopContext.jsx'
import { FaCcStripe, FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import { SiRazorpay } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
    const { backendUrl, token, cartItems, setCartItems, getCartAmount, products, deliveryFee } = useContext(ShopContext)
    const navigate = useNavigate()
    const [method, setMethod] = useState('cod')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

    const onsubmithandler = async (event) => {
        event.preventDefault()

        // Check if user is logged in
        if (!token) {
            toast.error('Please login to place an order')
            return
        }

        // Check if cart is empty
        if (Object.keys(cartItems).length === 0) {
            toast.error('Your cart is empty')
            return
        }

        setLoading(true)
        try {
            let orderItems = []

            // Prepare order items from cart
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            // Calculate total amount (cart amount + delivery fee)
            const totalAmount = getCartAmount() + deliveryFee

            // Prepare shopping info according to backend orderModel structure
            const shoppingInfo = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNo: formData.phone,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    ZipCode: parseInt(formData.zipcode),
                    Country: formData.country
                }
            }

            // Prepare order data according to backend API requirements
            const orderData = {
                items: orderItems,
                amount: totalAmount,
                shoppingInfo: shoppingInfo
            }

            // Make API call to place order
            const response = await axios.post(
                backendUrl + '/api/order/place',
                orderData,
                { headers: { token } }
            )

            if (response.data.success) {
                // Clear cart on successful order
                setCartItems({})
                localStorage.removeItem('cartItems')
                
                // Show success message
                toast.success('Order placed successfully!')
                
                // Navigate to orders page or home
                navigate('/orders')
            } else {
                toast.error(response.data.message || 'Failed to place order')
            }

        } catch (error) {
            console.error('Error placing order:', error)
            toast.error(error.response?.data?.message || 'Failed to place order. Please try again.')
        } finally {
            setLoading(false)
        }
    }
    

    return (
        <form onSubmit={onsubmithandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left Side - Delivery Information */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className='flex gap-3'>
                    <input
                        onChange={onChangeHandler}
                        name='firstName'
                        value={formData.firstName}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='First name'
                        required
                    />
                    <input
                        onChange={onChangeHandler}
                        name='lastName'
                        value={formData.lastName}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='Last name'
                        required
                    />
                </div>
                <input
                    onChange={onChangeHandler}
                    name='email'
                    value={formData.email}
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="email"
                    placeholder='Email address'
                    required
                />
                <input
                    onChange={onChangeHandler}
                    name='street'
                    value={formData.street}
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="text"
                    placeholder='Street'
                    required
                />
                <div className='flex gap-3'>
                    <input
                        onChange={onChangeHandler}
                        name='city'
                        value={formData.city}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='City'
                        required
                    />
                    <input
                        onChange={onChangeHandler}
                        name='state'
                        value={formData.state}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='State'
                        required
                    />
                </div>
                <div className='flex gap-3'>
                    <input
                        onChange={onChangeHandler}
                        name='zipcode'
                        value={formData.zipcode}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="number"
                        placeholder='Zipcode'
                        required
                    />
                    <input
                        onChange={onChangeHandler}
                        name='country'
                        value={formData.country}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='Country'
                        required
                    />
                </div>
                <input
                    onChange={onChangeHandler}
                    name='phone'
                    value={formData.phone}
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type="number"
                    placeholder='Phone'
                    required
                />
            </div>

            {/* Right Side - Cart Total & Payment */}
            <div className='mt-8'>

                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* Payment Method Selection */}
                    <div className='flex gap-3 flex-col lg:flex-row'>


                        <div
                            onClick={() => setMethod('visa')}
                            className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-gray-400 transition-colors'
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'visa' ? 'bg-green-400' : ''}`}></p>
                            <FaCcVisa className='text-3xl text-blue-800 mx-2' />
                        </div>

                        <div
                            onClick={() => setMethod('cod')}
                            className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-gray-400 transition-colors'
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-2'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button
                            type='submit'
                            disabled={loading}
                            className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
                        >
                            {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
                        </button>
                    </div>
                </div>

            </div>
        </form>
    )
}

export default PlaceOrder

