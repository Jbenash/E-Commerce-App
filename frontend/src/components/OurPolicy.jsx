import React from 'react'
import { LuRefreshCw } from 'react-icons/lu'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'

const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base'>
            <div>
                <LuRefreshCw className='w-12 h-12 m-auto mb-5 text-gray-700' />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We offer hassle-free exchanges within 30 days of purchase.</p>
            </div>
            <div>
                <MdOutlineVerifiedUser className='w-12 h-12 m-auto mb-5 text-gray-700' />
                <p className='font-semibold'>7 Days Return Policy</p>
                <p className='text-gray-400'>We provide 7 days return policy</p>
            </div>
            <div>
                <BiSupport className='w-12 h-12 m-auto mb-5 text-gray-700' />
                <p className='font-semibold'>Best Customer Support</p>
                <p className='text-gray-400'>We provide 24/7 customer support to assist you with any queries or issues.</p>
            </div>
        </div>
    )
}

export default OurPolicy
