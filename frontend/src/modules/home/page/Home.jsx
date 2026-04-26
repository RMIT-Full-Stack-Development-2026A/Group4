import React from 'react'
import Hero from '../component/Hero'
import Features from '../component/Features'

const Home = () => {
  return (
    <div className='flex flex-col align-center'>
        <Hero />
        <Features />
    </div>
  )
}

export default Home