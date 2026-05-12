import React from 'react'
import Hero from '../component/Hero'
import Features from '../component/Features'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-50 px-6 md:px-16 py-10 flex flex-col gap-20'>
        <Hero />
        <Features />
    </div>
  )
}

export default Home