import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { FiPackage } from 'react-icons/fi'

const Orders = () => {
    const { products, currency } = useContext(ShopContext)

    // Sample order data - in a real app, this would come from an API or state
    const orderData = [
        {
            id: '001',
            items: [
                { productId: 'aaaaa', size: 'M', quantity: 2 },
                { productId: 'aaaab', size: 'L', quantity: 1 }
            ],
            amount: 1697,
            status: 'Order Placed',
            payment: 'COD',
            date: '14 Nov, 2025'
        },
        {
            id: '002',
            items: [
                { productId: 'aaaac', size: 'S', quantity: 1 }
            ],
            amount: 609,
            status: 'Shipped',
            payment: 'Visa',
            date: '10 Nov, 2025'
        },
        {
            id: '003',
            items: [
                { productId: 'aaaab', size: 'XL', quantity: 1 },
                { productId: 'aaaaa', size: 'L', quantity: 1 }
            ],
            amount: 1208,
            status: 'Delivered',
            payment: 'Mastercard',
            date: '5 Nov, 2025'
        }
    ]

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {orderData.map((order, index) => (
                    <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div className='flex items-start gap-6 text-sm'>
                            <FiPackage className='w-16 h-16 text-gray-400' />
                            <div>
                                <div>
                                    {order.items.map((item, idx) => {
                                        const productData = products.find((product) => product.id === item.productId)
                                        return productData ? (
                                            <p key={idx} className='py-0.5'>
                                                {productData.name} <span className='text-xs'>x {item.quantity}</span> <span className='text-xs text-gray-500'>Size: {item.size}</span>
                                            </p>
                                        ) : null
                                    })}
                                </div>
                                <p className='mt-3 mb-2 font-medium'>{currency} {order.amount}</p>
                                <p>Date: <span className='text-gray-400'>{order.date}</span></p>
                                <p>Payment: <span className='text-gray-400'>{order.payment}</span></p>
                            </div>
                        </div>
                        <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className='text-sm md:text-base'>{order.status}</p>
                            </div>
                            <button className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors'>
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

