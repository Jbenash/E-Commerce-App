import React from 'react'

const Footer = () => {
    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <p className='text-2xl font-bold text-gray-800 mb-5'>SHOPIFY</p>
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Welcome to our e-commerce store! We are dedicated to providing you with the best online shopping experience. Our mission is to offer a wide range of high-quality products at competitive prices, along with exceptional customer service. Whether you're looking for the latest fashion trends, electronics, home essentials, or unique gifts, we've got you covered. Thank you for choosing us as your go-to shopping destination!
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+123 456 789</li>
                        <li>contactshopify@email.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr className='border-gray-300' />
                <p className='py-5 text-sm text-center text-gray-600'>Copyright 2025 © shopify.com - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer
