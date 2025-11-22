import React, { useContext } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Product from './pages/Product.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Contact from './pages/Contact.jsx'
import Collection from './pages/Collection.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ShopContext } from './context/ShopContext.jsx'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext)
  
  if (!token) {
    return <Navigate to='/login' replace />
  }
  
  return children
}

const App = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
      <ToastContainer />
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <SearchBar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path='/product/:productId' element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path='/place-order' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path='/collection' element={<ProtectedRoute><Collection /></ProtectedRoute>} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  )
}

export default App
