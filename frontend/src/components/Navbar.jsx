import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiChevronLeft } from 'react-icons/fi'

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    return (
        <div className='flex items-center justify-between py-5 font-medium '>
            {/* Logo Text */}
            <Link to='/' className='text-2xl font-bold text-gray-800'>
                SHOPIFY
            </Link>

            {/* Navigation Links */}
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            {/* Icons */}
            <div className='flex items-center gap-6'>
                <FiSearch className='w-5 h-5 cursor-pointer hover:text-gray-900' />

                <div className='group relative'>
                    <FiUser className='w-5 h-5 cursor-pointer hover:text-gray-900' />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>

                <Link to='/cart' className='relative'>
                    <FiShoppingCart className='w-5 h-5 hover:text-gray-900' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 bg-black text-white aspect-square rounded-full text-[8px] text-center leading-4'>0</p>
                </Link>

                <FiMenu onClick={() => setVisible(true)} className='w-5 h-5 cursor-pointer sm:hidden hover:text-gray-900' />
            </div>

            {/* Sidebar Menu */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <FiChevronLeft className='h-5 w-5' />
                        <p>Back</p>
                    </div>
                    <NavLink to='/' className='py-2 pl-6 border' onClick={() => setVisible(false)}>HOME</NavLink>
                    <NavLink to='/collection' className='py-2 pl-6 border' onClick={() => setVisible(false)}>COLLECTION</NavLink>
                    <NavLink to='/about' className='py-2 pl-6 border' onClick={() => setVisible(false)}>ABOUT</NavLink>
                    <NavLink to='/contact' className='py-2 pl-6 border' onClick={() => setVisible(false)}>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
