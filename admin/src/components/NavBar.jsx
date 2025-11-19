import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ setToken }) => {

    const handleLogout = () => {
        setToken('')
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between py-5 px-[4%] font-medium border-b'>
            {/* Logo with Admin Label */}
            <Link to='/' className='flex flex-col cursor-pointer'>
                <p className='text-2xl font-bold text-gray-800'>SHOPIFY</p>
                <p className='text-xs text-gray-500 tracking-wider'>ADMIN PANEL</p>
            </Link>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition-colors'
            >
                Logout
            </button>
        </div>
    )
}

export default NavBar
