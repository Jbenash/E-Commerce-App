import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            {/*Hero left Side*/}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-gradient-to-br from-gray-50 to-white'>
                <div className='text-[#414141] px-8 sm:px-12'>
                    <div className='flex items-center gap-2 animate-fadeIn'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base tracking-wider'>OUR BEST SELLERS</p>
                    </div>
                    <h1 className='prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight my-4 sm:my-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>Latest Arrivals</h1>
                    <p className='text-gray-600 text-sm md:text-base mb-6 max-w-md'>Discover our exclusive collection of premium quality products curated just for you.</p>
                    <Link to='/collection'>
                        <div className='inline-flex items-center gap-2 bg-black text-white px-8 py-3 hover:bg-gray-800 transition-all duration-300 hover:gap-4 cursor-pointer group'>
                            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                            <p className='w-8 md:w-11 h-[2px] bg-white group-hover:w-14 transition-all duration-300'></p>
                        </div>
                    </Link>
                </div>
            </div>
            {/*Hero Right Side*/}
            <img className='w-full sm:w-1/2 object-cover hover:scale-105 transition-transform duration-500' src={assets.hero_img} alt="" />
        </div>

    )
}

export default Hero
