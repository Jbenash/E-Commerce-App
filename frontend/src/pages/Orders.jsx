import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { FiPackage } from 'react-icons/fi'
import axios from 'axios'

const Orders = () => {
    const { backendUrl, token, products, currency } = useContext(ShopContext)

    const [orderData, setOrderData] = useState([])

    const loadOrderData = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(
                backendUrl + '/api/order/userorders',
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                setOrderData(response.data.orderData)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const trackOrder = async (orderId) => {
        try {
            await loadOrderData()
        } catch (error) {
            console.error('Error tracking order:', error)
        }
    }

    useEffect(() => {
        loadOrderData()
    }, [token])


    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {orderData.map((order, index) => (
                    <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div className='flex items-start gap-6 text-sm'>
                            <div className='w-16 sm:w-20'>
                                {order.items[0] && order.items[0].image && order.items[0].image[0] ? (
                                    <img
                                        src={order.items[0].image[0]}
                                        alt={order.items[0].name || 'Product'}
                                        className='w-16 sm:w-20'
                                    />
                                ) : (
                                    <FiPackage className='w-16 h-16 text-gray-400' />
                                )}
                            </div>
                            <div>
                                <div>
                                    {order.items.map((item, idx) => (
                                        <p key={idx} className='py-0.5'>
                                            {item.name} <span className='text-xs'>x {item.quantity}</span> <span className='text-xs text-gray-500'>Size: {item.size}</span>
                                        </p>
                                    ))}
                                </div>
                                <p className='mt-3 mb-2 font-medium'>{currency} {order.amount}</p>
                                <p>Date: <span className='text-gray-400'>{new Date(order.date).toLocaleDateString()}</span></p>
                                <p>Payment: <span className='text-gray-400'>{order.paymentMethod}</span></p>
                            </div>
                        </div>
                        <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className='text-sm md:text-base'>{order.status}</p>
                            </div>
                            <button
                                onClick={() => trackOrder(order._id)}
                                className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors'
                            >
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders

