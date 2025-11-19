import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Login from './components/login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    }
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <NavBar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <SideBar />
            <div className='w-full sm:w-[80%] lg:w-[70%] mx-auto ml-2 sm:ml-[max(5vw,25px)] my-4 sm:my-8 text-gray-600 text-sm sm:text-base px-2 sm:px-0'>
              {/* Content will go here */}
            </div>
          </div>

        </>}
    </div>
  )
}

export default App
