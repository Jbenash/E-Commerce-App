import React, { useEffect, useState } from "react";
import axios from 'axios'
import { ShopContext } from './ShopContext'

const ShopContextProvider = (props) => {
    const currency = "LKR"
    const deliveryFee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems')
        return saved ? JSON.parse(saved) : {}
    })
    // Persist cartItems to localStorage on change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])
    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    const addToCart = async (productId, size) => {
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

        // Sync with backend if user is authenticated
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add',
                    { itemId: productId, size },
                    { headers: { token } }
                );
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch {
                    // Handle error silently
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if (quantity > 0) {
            cartData[itemId][size] = quantity;
        } else {
            delete cartData[itemId][size]
            if (Object.keys(cartData[itemId]).length == 0) {
                delete cartData[itemId]
            }
        }
        setCartItems(cartData);
        // Sync with backend if user is authenticated
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.error('Error updating cart:', error);
            }
        }
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
                } catch {
                    // Handle error silently
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

    const getUserCart = async (authToken) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {
                headers: { token: authToken }
            })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.error('Error fetching cart:', error)
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

    useEffect(() => {
        const handleStorageChange = () => {
            const storedToken = localStorage.getItem('token')
            if (!storedToken && token) {
                setToken('')
            } else if (storedToken && storedToken !== token) {
                setToken(storedToken)
            }
        }

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
        getUserCart,
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
