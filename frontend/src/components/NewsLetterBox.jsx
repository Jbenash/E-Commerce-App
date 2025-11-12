import React from 'react'

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center my-10 py-10'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off your first order!</p>
      <p className='text-gray-400 mt-3'>
        Sign up to our newsletter to receive updates on new arrivals, special offers, and exclusive discounts.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' >
        <input type="email" placeholder="Enter your email" className="w-full sm:flex-1 outline-none" required />
        <button type="submit" className="bg-black text-white text-xs px-10 py-4 hover:bg-gray-800 transition-colors">SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
