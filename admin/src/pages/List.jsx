import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { FiTrash2 } from 'react-icons/fi'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (productId) => {
    try {

      const response = await axios.delete(backendUrl + `/api/product/remove/${productId}`, {
        headers: { token }
      })


      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
        console.log('Error message:', response.data.message)
      }
    } catch (error) {
      console.log('Axios Error:', error)
      console.log('Error Response:', error.response?.data)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2 text-lg font-medium'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12 h-12 object-cover rounded' src={item.image[0]} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <FiTrash2
              onClick={() => removeProduct(item._id)}
              className='w-5 h-5 cursor-pointer text-red-500 hover:text-red-700 mx-auto'
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default List
