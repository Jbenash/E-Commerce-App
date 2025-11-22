import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const [currentState, setCurrentState] = useState('Sign Up')
    const { token, setToken, backendUrl } = useContext(ShopContext)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (token && token.length > 0) {
            navigate('/')
        }
    }, [token, navigate])


    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (currentState === 'Sign Up') {
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    toast.success('Account created successfully!')
                    navigate('/')
                } else {
                    toast.error(response.data.message)
                }
            } else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password })
                console.log(response.data);

                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    toast.success('Login successful!')
                    navigate('/')
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'An error occurred')
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
            {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
            <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
            <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
            <div className='w-full flex justify-between text-sm -mt-2'>
                <p className='cursor-pointer hover:underline'>Forgot your password?</p>
                {
                    currentState === 'Login'
                        ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:underline'>Create account</p>
                        : <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:underline'>Login Here</p>
                }
            </div>
            <button className='bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 transition-colors'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
        </form>
    )
}

export default Login
