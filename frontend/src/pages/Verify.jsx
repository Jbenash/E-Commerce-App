import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const { token, backendUrl, setCartItems } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [isVerifying, setIsVerifying] = useState(true)

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                navigate('/login')
                return
            }

            if (!orderId) {
                toast.error('Invalid order')
                navigate('/orders')
                return
            }

            const response = await axios.post(
                backendUrl + '/api/order/verify',
                { orderId, success: success === 'true' },
                { headers: { token } }
            )

            if (response.data.success) {
                // Clear cart on successful payment
                setCartItems({})
                localStorage.removeItem('cartItems')
                toast.success('Payment verified successfully!')
                navigate('/orders')
            } else {
                toast.error(response.data.message || 'Payment verification failed')
                navigate('/cart')
            }
        } catch (error) {
            console.error('Error verifying payment:', error)
            toast.error('Payment verification failed')
            navigate('/cart')
        } finally {
            setIsVerifying(false)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className='text-center'>
                {isVerifying ? (
                    <>
                        <div className='w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4'></div>
                        <p className='text-xl font-medium text-gray-700'>Verifying your payment...</p>
                        <p className='text-sm text-gray-500 mt-2'>Please wait while we confirm your transaction</p>
                    </>
                ) : (
                    <>
                        {success === 'true' ? (
                            <>
                                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                                    </svg>
                                </div>
                                <p className='text-xl font-medium text-gray-700'>Payment Successful!</p>
                            </>
                        ) : (
                            <>
                                <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                                    </svg>
                                </div>
                                <p className='text-xl font-medium text-gray-700'>Payment Failed</p>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Verify
