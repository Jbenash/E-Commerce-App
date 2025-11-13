import React from 'react'
import Hero from '../components/Hero.jsx'
import LatestCollection from '../components/LatestCollection.jsx'
import BestSeller from '../components/BestSeller.jsx'
import OurPolicy from '../components/OurPolicy.jsx'
import NewsLetterBox from '../components/NewsLetterBox.jsx'

const Home = () => {
    return (
        <div className='max-w-[1440px] mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <Hero />
            <div className='my-16 sm:my-20'>
                <LatestCollection />
            </div>
            <div className='my-16 sm:my-20'>
                <BestSeller />
            </div>
            <div className='my-16 sm:my-20'>
                <OurPolicy />
            </div>
            <div className='my-16 sm:my-20'>
                <NewsLetterBox />
            </div>
        </div>
    )
}

export default Home
