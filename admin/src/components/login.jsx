import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })

            if (response.data.success) {
                setToken(response.data.token)
                toast.success('Login successful!')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='bg-white shadow-lg rounded-lg px-8 py-10 max-w-md w-full'>
                <div className='mb-8 text-center'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>SHOPIFY</h1>
                    <p className='text-sm text-gray-500 tracking-wider'>ADMIN PANEL</p>
                </div>

                <form onSubmit={onSubmitHandler}>
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email Address
                        </label>
                        <input
                            type='email'
                            placeholder='admin@email.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Password
                        </label>
                        <input
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login


