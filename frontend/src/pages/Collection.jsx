import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext)
    const [showFilters, setShowFilters] = React.useState(false)
    const [filteredProducts, setFilteredProducts] = React.useState([])
    const [category, setCategory] = React.useState([])
    const [subCategory, setSubCategory] = React.useState([])
    const [sortType, setSortType] = React.useState('relevant')

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(category.filter(cat => cat !== e.target.value))
        } else {
            setCategory([...category, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(subCategory.filter(subCat => subCat !== e.target.value))
        } else {
            setSubCategory([...subCategory, e.target.value])
        }
    }

    const applyFilter = () => {
        let productCopy = products.slice()

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilteredProducts(productCopy)
    }

    const sortProduct = () => {
        let fpCopy = filteredProducts.slice()
        switch (sortType) {
            case 'low-high':
                setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price))
                break
            case 'high-low':
                setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price))
                break
            default:
                applyFilter()
                break
        }
    }

    useEffect(() => {
        setFilteredProducts(products)
    }, [])

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch])

    useEffect(() => {
        sortProduct()
    }, [sortType])

    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
                {/* Filter Options */}
                <div className='min-w-60'>
                    <p onClick={() => setShowFilters(!showFilters)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-medium text-gray-800'>
                        FILTERS
                        <img className={`h-3 sm:hidden transition-transform ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                    </p>
                    {/* Category Filter */}
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded ${showFilters ? '' : 'hidden'} sm:block`}>
                        <p className='mb-3 text-sm font-medium text-gray-800'>CATEGORIES</p>
                        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                            <label className='flex gap-2 items-center cursor-pointer hover:text-gray-900'>
                                <input className='w-3 h-3 cursor-pointer' type="checkbox" value={'Men'} onChange={toggleCategory} />
                                <span>Men</span>
                            </label>
                            <label className='flex gap-2 items-center cursor-pointer hover:text-gray-900'>
                                <input className='w-3 h-3 cursor-pointer' type="checkbox" value={'Women'} onChange={toggleCategory} />
                                <span>Women</span>
                            </label>
                            <label className='flex gap-2 items-center cursor-pointer hover:text-gray-900'>
                                <input className='w-3 h-3 cursor-pointer' type="checkbox" value={'Kids'} onChange={toggleCategory} />
                                <span>Kids</span>
                            </label>
                        </div>
                    </div>
                    {/* SubCategory Filter */}
                    <div className={`border border-gray-300 pl-5 py-3 my-5 rounded ${showFilters ? '' : 'hidden'} sm:block`}>
                        <p className='mb-3 text-sm font-medium text-gray-800'>TYPE</p>
                        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                            <label className='flex gap-2 items-center cursor-pointer hover:text-gray-900'>
                                <input className='w-3 h-3 cursor-pointer' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />
                                <span>Topwear</span>
                            </label>
                            <label className='flex gap-2 items-center cursor-pointer hover:text-gray-900'>
                                <input className='w-3 h-3 cursor-pointer' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />
                                <span>Bottomwear</span>
                            </label>
                            <label className='flex gap-2 items-center cursor-pointer hover:text-gray-900'>
                                <input className='w-3 h-3 cursor-pointer' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />
                                <span>Winterwear</span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* Right Side */}
                <div className='flex-1'>
                    <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
                        <Title text1={'ALL'} text2={'COLLECTIONS'} />
                        {/* Product Sort */}
                        <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 py-2 rounded cursor-pointer hover:border-gray-400 transition-colors'>
                            <option value="relevant">Sort by: Relevant</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>
                    {/* Map Products */}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                        {
                            filteredProducts.map((item, index) => (
                                <ProductItem key={index} name={item.name} price={item.price} image={item.images} id={item.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection
