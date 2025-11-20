import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Login from './components/login'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Order'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')


  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    }
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          fontSize: '14px',
          borderRadius: '8px'
        }}
      />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <NavBar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <SideBar />
            <div className='w-full sm:w-[80%] lg:w-[70%] mx-auto ml-2 sm:ml-[max(5vw,25px)] my-4 sm:my-8 text-gray-600 text-sm sm:text-base px-2 sm:px-0'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>

        </>}
    </div>
  )
}

export default App
