import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext)
    return (
        <Link className='text-green-700 cursor-pointer' to={`/products/${id}`}>
            <div className='overflow-hidden'>
                <img src={image[0]} alt={name} className='hover:scale-110 transition ease-in-out' />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{price} {currency}</p>
        </Link>
    )
}

export default ProductItem
