import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { FiUpload } from 'react-icons/fi'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()


    try {


      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestSeller', bestSeller)
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setSizes([])
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4 sm:gap-5 p-4 sm:p-0'>
      <div className='w-full'>
        <p className='mb-3 text-base font-medium'>Upload Image</p>
        <div className='flex flex-wrap gap-3 sm:gap-4'>
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <div className='w-24 h-24 sm:w-20 sm:h-20 cursor-pointer border-2 border-gray-300 hover:border-gray-400 rounded flex items-center justify-center transition-colors'>
                {img ? (
                  <img className='w-full h-full object-cover rounded' src={URL.createObjectURL(img)} alt='' />
                ) : (
                  <FiUpload className='w-7 h-7 sm:w-6 sm:h-6 text-gray-400' />
                )}
              </div>
              <input
                onChange={(e) => {
                  const setters = [setImage1, setImage2, setImage3, setImage4]
                  setters[index](e.target.files[0])
                }}
                type='file'
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2 text-sm sm:text-base font-medium'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full sm:max-w-[500px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500' type='text' placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2 text-sm sm:text-base font-medium'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full sm:max-w-[500px] px-3 py-2 border border-gray-300 rounded min-h-[100px] focus:outline-none focus:border-gray-500' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full'>
        <div className='w-full sm:w-auto flex-1 sm:flex-initial'>
          <p className='mb-2 text-sm sm:text-base font-medium'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full sm:w-[150px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500'>
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>
        </div>

        <div className='w-full sm:w-auto flex-1 sm:flex-initial'>
          <p className='mb-2 text-sm sm:text-base font-medium'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full sm:w-[150px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500'>
            <option value='Topwear'>Topwear</option>
            <option value='Bottomwear'>Bottomwear</option>
            <option value='Winterwear'>Winterwear</option>
          </select>
        </div>

        <div className='w-full sm:w-auto flex-1 sm:flex-initial'>
          <p className='mb-2 text-sm sm:text-base font-medium'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full sm:w-[120px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500' type='number' placeholder='25' required />
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-3 text-sm sm:text-base font-medium'>Product Sizes</p>
        <div className='flex flex-wrap gap-2 sm:gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? 'bg-gray-800 text-white' : 'bg-slate-200'} px-4 py-2 sm:px-3 sm:py-1 cursor-pointer rounded hover:opacity-80 transition-opacity text-sm sm:text-base`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-1'>
        <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type='checkbox' id='bestseller' className='w-4 h-4 sm:w-auto sm:h-auto' />
        <label className='cursor-pointer text-sm sm:text-base' htmlFor='bestseller'>Add to bestseller</label>
      </div>

      <button type='submit' className='w-full sm:w-32 py-3 mt-2 sm:mt-4 bg-black text-white rounded hover:bg-gray-800 transition-colors font-medium'>
        ADD
      </button>
    </form>
  )
}

export default Add
