import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = "LKR"
    const deliveryFee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    const addToCart = (productId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[productId]) {
            if (cartData[productId][size]) {
                cartData[productId][size] += 1;
            } else {
                cartData[productId][size] = 1;
            }
        } else {
            cartData[productId] = {};
            cartData[productId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]

                    }
                } catch (error) {

                }
            }
        }
        return totalCount
    }

    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                console.error(response.data.message)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken && !token) {
            setToken(storedToken)
        } else if (!storedToken && token) {
            setToken('')
        }
    }, [])

    // Add event listener for storage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const storedToken = localStorage.getItem('token')
            if (!storedToken && token) {
                setToken('')
            } else if (storedToken && storedToken !== token) {
                setToken(storedToken)
            }
        }

        // Check on window focus (for manual localStorage changes)
        const handleFocus = () => {
            const storedToken = localStorage.getItem('token')
            if (!storedToken && token) {
                setToken('')
            }
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('focus', handleFocus)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('focus', handleFocus)
        }
    }, [token])

    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        token,
        setToken,
        backendUrl

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider