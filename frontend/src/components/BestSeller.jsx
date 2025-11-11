import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';




const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    useEffect(() => {
        const bestProducts = products.filter((item) => item.bestseller);
        setBestSellerProducts(bestProducts.slice(0, 5));
    }, []);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST '} text2={'SELLER'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600'>
                    Explore our best-selling products that customers love the most  </p>

            </div>
            <div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {
                        bestSellerProducts.map((item, index) => (<ProductItem
                            key={index}
                            id={item.id}
                            image={item.images}
                            name={item.name}
                            price={item.price}
                        />))
                    }
                </div>
            </div>
        </div>
    )
}

export default BestSeller
