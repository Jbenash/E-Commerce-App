import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiPlusCircle, FiList, FiPackage } from 'react-icons/fi'

const SideBar = () => {
    return (
        <div className='w-[20%] sm:w-[18%] min-h-screen border-r'>
            <div className='flex flex-col gap-4 pt-6 pl-[10%] sm:pl-[20%] text-[15px]'>

                <NavLink
                    to='/add'
                    className={({ isActive }) => `flex items-center gap-3 border border-gray-300 border-r-0 px-2 sm:px-3 py-2 rounded-l ${isActive ? 'bg-gray-100 border-gray-600' : ''}`}
                >
                    <FiPlusCircle className='w-4 h-4 sm:w-5 sm:h-5' />
                    <p className='hidden sm:block text-sm sm:text-base'>Add Items</p>
                </NavLink>

                <NavLink
                    to='/list'
                    className={({ isActive }) => `flex items-center gap-3 border border-gray-300 border-r-0 px-2 sm:px-3 py-2 rounded-l ${isActive ? 'bg-gray-100 border-gray-600' : ''}`}
                >
                    <FiList className='w-4 h-4 sm:w-5 sm:h-5' />
                    <p className='hidden sm:block text-sm sm:text-base'>List Items</p>
                </NavLink>

                <NavLink
                    to='/orders'
                    className={({ isActive }) => `flex items-center gap-3 border border-gray-300 border-r-0 px-2 sm:px-3 py-2 rounded-l ${isActive ? 'bg-gray-100 border-gray-600' : ''}`}
                >
                    <FiPackage className='w-4 h-4 sm:w-5 sm:h-5' />
                    <p className='hidden sm:block text-sm sm:text-base'>Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default SideBar
