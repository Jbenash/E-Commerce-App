import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'
import { FiSearch, FiX } from 'react-icons/fi'


const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const location = useLocation()
    const searchRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false)
            }
        }

        if (showSearch) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showSearch, setShowSearch])

    // Only show on collection page
    const shouldShow = showSearch && location.pathname.includes('collection')

    return shouldShow ? (
        <div className='border-t border-b text-center py-8'>
            <div
                ref={searchRef}
                className='inline-flex items-center justify-center gap-3 border-2 border-gray-300 px-6 py-3 my-2 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white shadow-md hover:shadow-lg hover:border-gray-400 transition-all duration-300'
            >
                <FiSearch className='w-5 h-5 text-gray-500' />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400'
                    type="text"
                    placeholder='Search for products, brands, and more...'
                    autoFocus
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className='text-gray-400 hover:text-gray-600 transition-colors'
                    >
                        <FiX className='w-4 h-4' />
                    </button>
                )}
            </div>
            <button
                onClick={() => setShowSearch(false)}
                className='inline-flex items-center gap-2 mt-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-all duration-200'
            >
                <FiX className='w-4 h-4' />
                <span>Close</span>
            </button>
        </div>
    ) : null
}

export default SearchBar
